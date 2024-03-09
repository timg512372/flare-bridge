const express = require("express");
const { ethers } = require("ethers");
require("dotenv").config();
const gatewayJSON = require("../artifacts/contracts/Gateway.sol/Gateway.json");
const relayJSON = require("../artifacts/contracts/RelayGateway.sol/RelayGateway.json");

const app = express();
const port = 4000; // You can choose any port

// Setup provider (You can replace this with your own provider)

const network = process.argv[2] || "sepolia";
if (network != "sepolia" && network != "coston") {
  console.error(`Invalid network: ${network}`);
  process.exit(1);
}

const provider = new ethers.JsonRpcProvider(
  network == "coston"
    ? "https://coston-api.flare.network/ext/bc/C/rpc" +
      (process.env.FLARE_RPC_API_KEY
        ? `?x-apikey=${process.env.FLARE_RPC_API_KEY}`
        : "")
    : process.env.SEPOLIA_NODE_RPC_URL
);

console.log(process.env.COSTON_NODE_RPC_URL);
console.log(process.env.FLARE_RPC_API_KEY);

const contract = new ethers.Contract(
  network == "coston" ? process.env.COSTON_RELAY : process.env.SEPOLIA_RELAY,
  relayJSON.abi,
  provider
);

console.log(contract);

contract.on(
  "RelayRequested",
  (
    uid,
    relayInitiator,
    relayTarget,
    additionalCalldata,
    sourceToken,
    targetToken,
    amount
  ) => {
    console.log(`Transfer event detected`);
    console.log(uid);
    console.log(additionalCalldata);
  }
);
