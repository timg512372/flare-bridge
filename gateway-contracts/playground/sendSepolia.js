const { ethers } = require("ethers");
require("dotenv").config();
const ERC20Bridge = require("../artifacts/contracts/ERC20Bridge.sol/ERC20Bridge.dbg.json");

// Define connection settings
const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY}`
); // Replace with your Alchemy API key

// Set up contract details
const coinAddress = "0x5187763e09a672eda81F27e622129Ac28393ca53"; // Replace with your contract's address

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function main() {
  const coinContract = new ethers.Contract(
    coinAddress,
    ERC20Bridge.abi,
    provider
  );
  // Sending a transaction to the contract (e.g., transferring tokens)
  const contractWithSigner = coinContract.connect(wallet);

  const recipientAddress = "RECIPIENT_ADDRESS"; // Address to receive the tokens
  const amount = ethers.utils.parseUnits("1", 18); // Specify the amount and decimals

  const transactionResponse = await contractWithSigner.transfer(
    recipientAddress,
    amount
  );
  console.log(`Transaction hash: ${transactionResponse.hash}`);

  // Wait for the transaction to be mined
  await transactionResponse.wait();
  console.log("Transaction confirmed!");
}

main().catch(console.error);
