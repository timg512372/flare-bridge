# Flare Bridge

## Contract Address

Coin on Sepolia: 0x5187763e09a672eda81F27e622129Ac28393ca53
Coin on Coston: 0x8c49e01E86d9ef98eA963Be48B1E41297E06F817

COSTON_RELAY=0x9b4e6a477EC865551ca4f5558420C908482F6073
SEPOLIA_RELAY=0x2cD3CbcC13e5b165b6b43708788B4477778bC171

COSTON_GATEWAY=0x542F8787D9607DeD3fe59d4024F0cC1DB1b57821
SEPOLIA_GATEWAY=0xa387afA74F74AB1c29F32D17655eA17621ABC5Dc

## Deployment

```bash

cd gateway-contracts

npx hardhat run scripts/deployCoin.js --network sepolia

 npx hardhat run scripts/deployCoin.js --network coston
```

## Start Relayer

```bash
cd flare-relayer-main

pip install requirements.txt
python manage.py makemigrations
python manage.py migrate
eval export $(cat .env) | python manage.py start_relay sepolia
eval export $(cat .env) | python manage.py start_relay coston

```
