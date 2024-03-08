import asyncio
import json
import logging
import random

from django.conf import settings
from django.core.management import BaseCommand
from django.core.management.base import CommandParser
from eth_abi import encode
from eth_account import Account
from eth_account.signers.local import LocalAccount
from sha3 import keccak_256
from web3.middleware.signing import async_construct_sign_and_send_raw_middleware

from geth.client import GEthClient

# Start logger
logger = logging.getLogger(__name__)

# Define and read constant information
relayAbi = json.load(open("abis/RelayABI.json"))
erc20Abi = json.load(open("abis/ERC20ABI.json"))
counterAbi = json.load(open("abis/CounterABI.json"))

setCounter = filter(lambda f: ("name" in f) and (f["name"] == "setCounter"), counterAbi)
setCounterTypes = [val["type"] for val in next(iter(setCounter))["inputs"]]
setCounterCode = b"setCounter(uint256,address,uint256,address)"


async def txSpammerData(chain: str):
    # Create the web client and read the contract addresses
    gethClient = await GEthClient.__async_init__(chain)
    relayAddr = settings.SEPOLIA_RELAY if chain == "sepolia" else settings.COSTON_RELAY
    otherCounterAddr = settings.COSTON_COUNTER if chain == "sepolia" else settings.SEPOLIA_COUNTER
    account: LocalAccount = Account.from_key(settings.PRIVATE_KEY)
    gethClient.geth.middleware_onion.add(await async_construct_sign_and_send_raw_middleware(account))
    transaction = {
        "from": account.address,
    }

    # The token selection is made randomly
    # tokenId = random.randint(0, 10)
    tokenId = 0
    # Access the Relayer contract and call it, just to get the result
    relayer_contract = gethClient.geth.eth.contract(relayAddr, abi=relayAbi)  # type: ignore
    token_address: str = await relayer_contract.functions.availableTokens(tokenId).call()
    print("Token address: ", token_address)

    # Allow the contract to later take our tokens
    amount_to_send = 1234
    erc20contract = gethClient.geth.eth.contract(token_address, abi=erc20Abi)  # type: ignore
    tx = await erc20contract.functions.approve(relayAddr, amount_to_send).transact(transaction)
    # Wait for some time
    await gethClient.geth.eth.wait_for_transaction_receipt(tx)
    print("Allowance tx_hash:", tx.hex())

    # Constuct call data that will call setCounter on the counter contract
    # [I don't think you can do "web3.eth.abi.encodeFunctionCall" with an async client]
    # We first encode function call
    keccak = keccak_256()
    keccak.update(setCounterCode)
    setCounterKeccak = keccak.hexdigest()

    # And the also the arguments
    newCounter = 123454321
    other_token_address = await relayer_contract.functions.tokenPair(token_address).call()
    amount = 123
    callData = encode(setCounterTypes, [newCounter, other_token_address, amount, account.address])

    # Put encodings together
    callData = "0x" + setCounterKeccak[:8] + callData.hex()
    print("Call data: ", callData)
    print("Other token", other_token_address)
    # Call the RequestRelay function on the Relayer with the correct arguments

    print(otherCounterAddr,  # Counter contract on the other side
        callData,  # callData for the "setCounter(...)" function on the Counter contract
        token_address,  # Token address the source token - the other side is calculated on contract
        amount_to_send,)

    request_tx_hash = await relayer_contract.functions.requestRelay(
        otherCounterAddr,  # Counter contract on the other side
        callData,  # callData for the "setCounter(...)" function on the Counter contract
        token_address,  # Token address the source token - the other side is calculated on contract
        amount_to_send,  # Amount of tokens that is sent to the counter contract
    ).transact(transaction)
    print("Request relay hash: ", request_tx_hash.hex())


class Command(BaseCommand):
    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument("chain", nargs=1, type=str)

    def handle(self, *args, **options):

        # We make a relayer request with a call inside the additionalCalldata
        assert options["chain"][0] in ["sepolia", "coston"], "Chain name is incorrect"
        asyncio.run(txSpammerData(options["chain"][0]))
