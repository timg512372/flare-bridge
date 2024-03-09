const hre = require("hardhat");

async function main() {
  const Gateway = await hre.ethers.getContractFactory("Gateway");

  const [deployer] = await hre.ethers.getSigners();
  await hre.run("compile");

  console.log("Deploying contracts with the account:", deployer.address);

  sepoliaCoin = "0x5187763e09a672eda81F27e622129Ac28393ca53";
  costonCoin = "0x8c49e01E86d9ef98eA963Be48B1E41297E06F817";

  sepoliaRelayer = "0x2cD3CbcC13e5b165b6b43708788B4477778bC171";
  costonRelayer = "0x9b4e6a477EC865551ca4f5558420C908482F6073";
  if (hre.network.name == "sepolia") {
    console.log("in sepolia");
    args = [sepoliaRelayer, sepoliaCoin];
  } else {
    args = [costonRelayer, costonCoin];
  }

  const gateway = await Gateway.deploy(...args);

  console.log("Gateway address: ", gateway.target);
  if (hre.network.name == "sepolia") {
    await gateway.setRelay(costonRelayer);
    await gateway.setBridgedCoinContract(costonCoin);
  } else {
    await gateway.setRelay(sepoliaRelayer);
    await gateway.setBridgedCoinContract(sepoliaCoin);
  }
}
main().then(() => process.exit(0));
