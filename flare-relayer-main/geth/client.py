import logging
from typing import Sequence, TypedDict

from django.conf import settings
from eth_typing import ChecksumAddress
from web3 import AsyncHTTPProvider, AsyncWeb3
from web3.middleware.geth_poa import async_geth_poa_middleware
from web3.providers.websocket.websocket_v2 import WebsocketProviderV2
from web3.types import RPCEndpoint

logger = logging.getLogger(__name__)

# syntax b/c "from" keyword not allowed w/ class construction

_RequiredCallTrace = TypedDict(
    "_RequiredCallTrace",
    {
        "from": ChecksumAddress,
        "to": ChecksumAddress,
        "type": str,
        "input": str,
    },
)


class CallTrace(_RequiredCallTrace, total=False):
    calls: Sequence["CallTrace"]
    error: str


class GEthClient:
    def __init__(self, w3_provider) -> None:
        self.geth: AsyncWeb3 = w3_provider

    @classmethod
    async def __async_init__(cls, network: str):
        if network == "coston":
            cls._rpc_url = settings.COSTON_NODE_RPC_URL
            cls._ws_url = settings.COSTON_NODE_WS_URL
        elif network == "sepolia":
            cls._rpc_url = settings.SEPOLIA_NODE_RPC_URL
            cls._ws_url = settings.SEPOLIA_NODE_WS_URL
        else:
            raise NameError

        return cls(await cls.init_provider())

    @classmethod
    async def init_provider(cls) -> AsyncWeb3:
        if cls._ws_url:
            connection = await AsyncWeb3.persistent_websocket(
                WebsocketProviderV2(cls._ws_url, request_timeout=120),
                middlewares=[async_geth_poa_middleware],
            ).__aenter__()
        elif cls._rpc_url:
            connection = AsyncWeb3(
                AsyncHTTPProvider(cls._rpc_url, request_kwargs={"timeout": 120}),
                middlewares=[async_geth_poa_middleware],
            )

        return connection

    @classmethod
    def log_provider(cls):
        if cls._ws_url is not None:
            logger.info("WEBSOCKET PROVIDER")
        elif cls._rpc_url is not None:
            logger.info("HTTP PROVIDER")

    async def debug_traceTransaction(self, tx_hash: str) -> CallTrace:
        exceptions = []

        for _ in range(2):
            try:
                call_trace = self.geth.manager.coro_request(
                    RPCEndpoint("debug_traceTransaction"),
                    [tx_hash, {"tracer": "callTracer"}],
                )
                return await call_trace
            except Exception as e:
                exceptions.append(e)

        logger.warning("FAILED 2 TIMES WHILE TRACING: %s", tx_hash)

        for _ in range(2):
            try:
                call_trace = self.geth.manager.coro_request(
                    RPCEndpoint("debug_traceTransaction"),
                    [tx_hash, {"tracer": "callTracer", "timeout": "60s"}],
                )
                return await call_trace
            except Exception as e:
                exceptions.append(e)

        logger.error("FAILED 4 TIMES WHILE TRACING: %s", tx_hash)

        raise Exception(exceptions)
