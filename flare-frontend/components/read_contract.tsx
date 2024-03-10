import { abi } from '@/config/abi';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName, useReadContract } from 'wagmi'
import { mainnet, songbirdTestnet } from 'wagmi/chains';

export function ReadContract() {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  const { data: balance } = useReadContract({
    abi,
    functionName: 'balanceOf',
    address: '0x5187763e09a672eda81F27e622129Ac28393ca53',
    args: address ? [address] : undefined,

  })

  return (
    <div>
      <div>Balance: {balance?.toString()}</div>
<div>
        {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
        x
        {address && <div>{ensName ? `${ensName} (${address} $)` : address}</div>}    
          </div>
    </div>

  )
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
