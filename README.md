# Flare Bridge

## Contract Addresses

Coin on Sepolia: 0x5187763e09a672eda81F27e622129Ac28393ca53
Coin on Coston: 0x8c49e01E86d9ef98eA963Be48B1E41297E06F817

COSTON_RELAY=0x9b4e6a477EC865551ca4f5558420C908482F6073
SEPOLIA_RELAY=0x2cD3CbcC13e5b165b6b43708788B4477778bC171

COSTON_GATEWAY=0x8b1274d063593F0973afF1710EA4490BE67AE9f2
SEPOLIA_GATEWAY=0x0c2eFE1D385151870B3fFb9901B7a0FB1C5a1314

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
