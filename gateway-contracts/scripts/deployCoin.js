const hre = require("hardhat");
require("dotenv").config();

async function main() {
  // Compiling the contract
  await hre.run("compile");
  // console.log(hre.ethers);
  // Deploying the contract
  const initialSupply = hre.ethers.parseUnits("100", 18); // 100 tokens with 18 decimal places
  const ERC20Bridge = await hre.ethers.getContractFactory("ERC20Bridge");
  const tokenContract = await ERC20Bridge.deploy(initialSupply);

  await tokenContract.waitForDeployment();

  console.log("MyToken deployed to:", tokenContract.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
