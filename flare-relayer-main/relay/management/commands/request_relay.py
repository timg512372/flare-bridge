import asyncio
import json
import logging
import random

from django.conf import settings
from django.core.management import BaseCommand
from django.core.management.base import CommandParser
from eth_account import Account
from eth_account.signers.local import LocalAccount
from web3.middleware.signing import async_construct_sign_and_send_raw_middleware

from geth.client import GEthClient

# Start logger
logger = logging.getLogger(__name__)

# Define and read constant information
relayAbi = json.load(open("abis/RelayABI.json"))
erc20Abi = json.load(open("abis/ERC20ABI.json"))


async def txSpammer(chain: str):
    # Create the web client and read the contract addresses
    gethClient = await GEthClient.__async_init__(chain)
    relayAddr = settings.SEPOLIA_RELAY if chain == "sepolia" else settings.COSTON_RELAY
    account: LocalAccount = Account.from_key(settings.PRIVATE_KEY)
    gethClient.geth.middleware_onion.add(await async_construct_sign_and_send_raw_middleware(account))
    transaction = {
        "from": account.address,
    }

    # The token selection is made randomly
    tokenId = random.randint(0, 10)

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

    # Call the RequestRelay function with empty calldata
    request_tx_hash = await relayer_contract.functions.requestRelay(
        account.address,  # Target is me on the other side - to make it easier to return the transaction
        "0x",  # Empty calldata for now
        token_address,  # Token address the source token - the other side is calculated on contract
        amount_to_send,  # Amount of tokens that is sent to the counter contract
    ).transact(transaction)
    print("Request relay hash: ", request_tx_hash.hex())


class Command(BaseCommand):
    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument("chain", nargs=1, type=str)

    def handle(self, *args, **options):
        # We make a relayer request with empty additionalCalldata
        assert options["chain"][0] in ["sepolia", "coston"], "Chain name is incorrect"
        asyncio.run(txSpammer(options["chain"][0]))
