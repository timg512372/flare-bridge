import asyncio
import json
import logging
from typing import Any

from django.conf import settings
from django.core.management import BaseCommand
from django.core.management.base import CommandParser
from eth_abi import decode
from eth_account import Account
from eth_account.signers.local import LocalAccount
from sha3 import keccak_256
from web3 import AsyncWeb3
from web3.middleware.signing import async_construct_sign_and_send_raw_middleware

from geth.client import GEthClient
from relay.models import Block, RelayCall

# Start logger
logger = logging.getLogger(__name__)

# Define and read constant information
relayAbi = json.load(open("abis/RelayABI.json"))
erc20Abi = json.load(open("abis/ERC20ABI.json"))
counterAbi = json.load(open("abis/CounterABI.json"))

relExe = filter(lambda f: ("name" in f) and (f["name"] == "RelayExecuted"), relayAbi)
relExeTypes = [val["type"] for val in next(iter(relExe))["inputs"]]
relExeCode = b"RelayExecuted(uint256,address,address,bytes,address,address,uint256)"

setCounter = filter(lambda f: ("name" in f) and (f["name"] == "setCounter"), counterAbi)
setCounterTypes = [val["type"] for val in next(iter(setCounter))["inputs"]]

relReqCode = b"RelayRequested(uint256,address,address,bytes,address,address,uint256)"


async def callOtherSide(
    callData: tuple,
    chain: str,
    from_chain: str,
    blockNumber: int,
    timestamp: int,
    main_tx_hash: str,
):
    # Read the contract addresses depending on their network
    relayAddr = settings.SEPOLIA_RELAY if chain == "sepolia" else settings.COSTON_RELAY

    # Break down the decoded data and create the required dictionary from it
    uid, relayInitiator, relayTarget, additionalCalldata, sourceToken, targetToken, amount = callData
    EMPTY_BYTES = "0x" + "0" * 64
    callDataDict = {
        "uid": uid,
        "relayInitiator": AsyncWeb3.to_checksum_address(relayInitiator),
        "relayTarget": AsyncWeb3.to_checksum_address(relayTarget),
        "additionalCalldata": additionalCalldata,
        "sourceToken": AsyncWeb3.to_checksum_address(sourceToken),
        "targetToken": AsyncWeb3.to_checksum_address(targetToken),
        "amount": amount,
        "executionResult": 0,
        "relayDataHash": EMPTY_BYTES,
    }

    # Create the web client and set the account
    gethClient = await GEthClient.__async_init__(chain)
    account: LocalAccount = Account.from_key(settings.PRIVATE_KEY)
    gethClient.geth.middleware_onion.add(await async_construct_sign_and_send_raw_middleware(account))
    transaction = {
        "from": account.address,
    }

    # Access the Token contract, so that we can call functions on it
    erc20contract = gethClient.geth.eth.contract(callDataDict["targetToken"], abi=erc20Abi)
    tx_hash = await erc20contract.functions.transfer(relayAddr, amount).transact(transaction)
    await gethClient.geth.eth.wait_for_transaction_receipt(tx_hash)
    print("Allowance tx hash: ", tx_hash.hex())

    # transaction = {
    #     "from": account.address,
    # }

    # Access the Counter contract, so that we can check, if the counter was updated correctly
    # counterContract = gethClient.geth.eth.contract(counterAddr, abi=counterAbi)
    # counter = await counterContract.functions.getCounter().call()
    # print("Counter at the start : ", counter)

    # Access the Relayer contract and call executeRelay function
    relayerContract = gethClient.geth.eth.contract(relayAddr, abi=relayAbi)  # type: ignore
    ex = await relayerContract.functions.executeRelay(callDataDict).transact(transaction)
    await gethClient.geth.eth.wait_for_transaction_receipt(ex)
    print("Execute relay hash: ", ex.hex())

    # Check if the counter was updated
    # counter = await counterContract.functions.getCounter().call()
    # print("Updated counter : ", counter)

    # If everything was successfuly completed, we create and save a database object
    relayCall = RelayCall(
        chain=from_chain,
        timestamp=timestamp,
        blockNumber=blockNumber,
        tx_hash=main_tx_hash,
        uid=callDataDict["uid"],
        relayInitiator=callDataDict["relayInitiator"],
        relayTarget=callDataDict["relayTarget"],
        additionalCalldata=callDataDict["additionalCalldata"],
        sourceToken=callDataDict["sourceToken"],
        targetToken=callDataDict["targetToken"],
        amount=callDataDict["amount"],
    )
    await relayCall.asave()


async def listener(chain: str):
    # Create the web client and find the last block
    gethClient = await GEthClient.__async_init__(chain)
    last_block, created = await Block.objects.aget_or_create(chain=chain, defaults={"number": 0, "timestamp": 0})
    if created:
        last_block.number = await gethClient.geth.eth.block_number
    relayAddr = settings.SEPOLIA_RELAY if chain == "sepolia" else settings.COSTON_RELAY
    to_chain = "coston" if chain == "sepolia" else "sepolia"

    # Prepare encoding of the RelayRequested function, that is stored in the first Topics field of the call log
    keccak = keccak_256()
    keccak.update(relReqCode)
    relayReqTopic = "0x" + keccak.hexdigest()

    # Start the listening loop
    while True:
        current_block_n = await gethClient.geth.eth.block_number

        # Check each block
        while last_block.number < current_block_n:
            block = await gethClient.geth.eth.get_block(last_block.number, full_transactions=True)
            logger.info(f"Checking block: {last_block.number}")

            assert "transactions" in block
            for tx in block["transactions"]:
                # The correct transaction goes to the Relayer contract...
                if tx["to"] == relayAddr:  # type: ignore
                    tx_rec = await gethClient.geth.eth.get_transaction_receipt(tx["hash"])  # type: ignore
                    logs = tx_rec["logs"]
                    for log in logs:

                        # ...and has a correct call log
                        if log["topics"][0].hex() == relayReqTopic:
                            logger.info("Found new relay")
                            data = log["data"]

                            # Decode the received calldata
                            callData = decode(relExeTypes, data)
                            try:
                                # Call the function that sends the data to the relayer on the other network
                                await callOtherSide(
                                    callData,
                                    to_chain,
                                    chain,
                                    block["number"],  # type: ignore
                                    block["timestamp"],  # type: ignore
                                    tx_rec["transactionHash"].hex(),
                                )
                            except Exception as e:
                                logger.error(f"Error: {e}")

            last_block.number += 1
            await last_block.asave()
        await asyncio.sleep(1)


class Command(BaseCommand):
    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument("chain", nargs=1, type=str)

    def handle(self, *args: Any, **options: Any) -> str | None:
        logger.info("Starting listener")

        # We start the listener on a chain, that is defined by the command argument
        assert options["chain"][0] in ["sepolia", "coston"], "Chain name is incorrect"
        asyncio.run(listener(options["chain"][0]))
