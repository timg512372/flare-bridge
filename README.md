# Flare Bridge

## Try it out!

[https://flare-bridge.vercel.app/](https://flare-bridge.vercel.app/)

[Presentation](https://drive.google.com/file/d/1CVKSxHV66vWXSm7s7R0KU7ZJ7rHrQQwo/view?usp=drive_link)

## Contract Addresses

Coin on Sepolia: 0x5187763e09a672eda81F27e622129Ac28393ca53

Coin on Coston: 0x8c49e01E86d9ef98eA963Be48B1E41297E06F817

Relay on Coston: 0x9b4e6a477EC865551ca4f5558420C908482F6073

Relay on Sepolia: 0x2cD3CbcC13e5b165b6b43708788B4477778bC171

Gatway on Coston: 0x8b1274d063593F0973afF1710EA4490BE67AE9f2

Gateway on Sepolia: 0x0c2eFE1D385151870B3fFb9901B7a0FB1C5a1314

## Technical Implementation

- Relayer
  - Rewritten in Node.js
  - Previous relayer was busy waiting / querying every individual block
  - New relayer simply adds listeners on the relevant contract events
  - Generates proofs on both Sepolia and Coston for events
  - Submits proofs along with the relevant calldata to the other network
- Gateway Contract
  - Supports thorough access controll
    - Owners set who are the allowed relayers
  - Allows the user to send tokens
    - Burns the tokens
    - Calls the relay contract
  - Verifies proofs before minting tokens
    - Verifies the Merkle root of the proof using Flare's contracts
    - Verifies that there is a burn event
    - Verifies that the user that submitted the request is the same as the user who burned
    - Verifies the user is redeeming tokens in the same contract pair as they burned
    - Verifies the user is redeeming exactly as many tokens as they burned
    - Verifies the user has not previously tried to attest this burn event
    - Verifies that a valid relayer is calling with the burn
- Relay Contract
  - Generic on-chain message sending contract
  - Application agnostic
  - Supports arbitrary calldata message calls
  - Not responsible for verifying proofs

## Examples of Working Tx

Sepolia to Coston:
[https://sepolia.etherscan.io/tx/0x5cce8a8a2bb96565b84c69868862666d031790a74d16d8ff912dfe2dd27e4ca6](https://sepolia.etherscan.io/tx/0x5cce8a8a2bb96565b84c69868862666d031790a74d16d8ff912dfe2dd27e4ca6)
[https://coston-explorer.flare.network/tx/0xe90b75906822ea047351bad6a455ba731522cec8dd211810c6dc19554ed5f75e](https://coston-explorer.flare.network/tx/0xe90b75906822ea047351bad6a455ba731522cec8dd211810c6dc19554ed5f75e)

Coston to Sepolia:

[https://coston-explorer.flare.network/tx/0xf0b6ac54f080496fbf0e0ad70cc36998fa9a46abc00abd5144aa8d043d20f15f](https://coston-explorer.flare.network/tx/0xf0b6ac54f080496fbf0e0ad70cc36998fa9a46abc00abd5144aa8d043d20f15f)

[https://sepolia.etherscan.io/tx/0x543ea3543b99f824dad6d64c143ca52644ad1304df159587830afb86a940dff0](https://sepolia.etherscan.io/tx/0x543ea3543b99f824dad6d64c143ca52644ad1304df159587830afb86a940dff0)

## Deployment

```bash

cd gateway-contracts

npx hardhat run scripts/deployCoin.js --network sepolia

npx hardhat run scripts/deployCoin.js --network coston


etc...

```

## AWS

```bash
pm2 report

pm2 start "node src/server.js sepolia" -n sepolia

pm2 start "node src/server.js coston" -n coston

pm2 start
```
