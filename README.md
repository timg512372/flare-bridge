# Flare Bridge

## Contract Address

Coin on Sepolia: 0x5187763e09a672eda81F27e622129Ac28393ca53
Coin on Coston: 0x8c49e01E86d9ef98eA963Be48B1E41297E06F817

COSTON_RELAY=0x9b4e6a477EC865551ca4f5558420C908482F6073
SEPOLIA_RELAY=0x2cD3CbcC13e5b165b6b43708788B4477778bC171

COSTON_GATEWAY=0x8b1274d063593F0973afF1710EA4490BE67AE9f2
SEPOLIA_GATEWAY=0x0c2eFE1D385151870B3fFb9901B7a0FB1C5a1314

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


```
