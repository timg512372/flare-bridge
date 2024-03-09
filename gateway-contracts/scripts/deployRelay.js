const hre = require("hardhat");

async function main() {
  const RelayGateway = await hre.ethers.getContractFactory("RelayGateway");

  const [deployer] = await hre.ethers.getSigners();
  await hre.run("compile");

  console.log("Deploying contracts with the account:", deployer.address);

  let tokensCoston = ["0x8c49e01E86d9ef98eA963Be48B1E41297E06F817"];

  let tokensSepolia = ["0x5187763e09a672eda81F27e622129Ac28393ca53"];

  if (hre.network.name === "sepolia") {
    let tmp = tokensCoston;
    tokensCoston = tokensSepolia;
    tokensSepolia = tmp;
  }

  const args = ["0xB1766787e2241578C9df8793b7874d3F3d32acd1", true];
  const relayer = await RelayGateway.deploy(...args);

  console.log("Relayer address: ", relayer.target);
  for (let i = 0; i < tokensCoston.length; i++) {
    await relayer.addTokenPair(tokensCoston[i], tokensSepolia[i]);
  }
}
main().then(() => process.exit(0));
