import { abi } from '@/config/abi';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName, useReadContract } from 'wagmi'
import { mainnet, sepolia, songbirdTestnet } from 'wagmi/chains';

export function ReadContract() {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

    const { data: balance } = (useReadContract as any)({
        abi,
        functionName: 'balanceOf',
        address: '0x5187763e09a672eda81F27e622129Ac28393ca53',
        args: address ? [address] : undefined,
    })
    if (address) {
        return ((balance ?? 0n) / 10n ** 18n).toString()
        
    } else {
        return (
            0
  )
    }
}
export function Account() {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

    return (
        <div>
            {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
            {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
            <button onClick={() => disconnect()}>Disconnect</button>
        </div>
    )
}

export default ReadContract;
