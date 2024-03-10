const express = require("express");
const { ethers } = require("ethers");
const axios = require("axios");
require("dotenv").config();
const gatewayJSON = require("../artifacts/contracts/Gateway.sol/Gateway.json");
const relayJSON = require("../artifacts/contracts/RelayGateway.sol/RelayGateway.json");

const app = express();
const port = 4000; // You can choose any port

const FLARE_CONTRACTS = "@flarenetwork/flare-periphery-contract-artifacts";
const ATTESTATION_PROVIDER_URL = "https://evm-verifier.flare.network";
const ATTESTATION_PROVIDER_API_KEY = "123456";
const FLARE_CONTRACT_REGISTRY_ADDR =
  "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019";

const network = "sepolia";

const VERIFICATION_ENDPOINT =
  `https://evm-verifier.flare.network/verifier/${
    network == "sepolia" ? "eth" : "flr"
  }` + `/EVMTransaction/prepareRequest`;
const ATTESTATION_ENDPOINT =
  `https://attestation-coston.flare.network/attestation-client/api/proof/` +
  `get-specific-proof`;

const sepoliaProvider = new ethers.JsonRpcProvider(
  process.env.SEPOLIA_NODE_RPC_URL
);
const costonProvider = new ethers.JsonRpcProvider(
  process.env.COSTON_NODE_RPC_URL
);
const provider = network == "coston" ? costonProvider : sepoliaProvider;

console.log(process.env.PRIVATE_KEY);
// const costonSigner = new ethers.Wallet(process.env.PRIVATE_KEY, costonProvider);
// const sepoliaSigner = new ethers.Wallet(
//   process.env.PRIVATE_KEY,
//   sepoliaProvider
// );

// const contract = new ethers.Contract(
//   network == "coston" ? process.env.COSTON_RELAY : process.env.SEPOLIA_RELAY,
//   relayJSON.abi,
//   provider
// );

response = {
  status: "VALID",
  abiEncodedRequest:
    "0x45564d5472616e73616374696f6e0000000000000000000000000000000000007465737445544800000000000000000000000000000000000000000000000000f94496936a5c05adfe050b73f7201c43e825fd7f3093bea28111216e282ffe7b00000000000000000000000000000000000000000000000000000000000000208dd88f83536dd2bb5b92addd69bd514c6cd18ba1bc7b8be1abed9359fdd59d3800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000",
};

response2 = {
  status: "OK",
  data: {
    roundId: 821724,
    hash: "0x8c34d7cef580f2082aaa35e21a71517ce41fdfdaa45ed8cb4596b5b1c6a3f076",
    requestBytes:
      "0x45564d5472616e73616374696f6e0000000000000000000000000000000000007465737445544800000000000000000000000000000000000000000000000000f94496936a5c05adfe050b73f7201c43e825fd7f3093bea28111216e282ffe7b00000000000000000000000000000000000000000000000000000000000000208dd88f83536dd2bb5b92addd69bd514c6cd18ba1bc7b8be1abed9359fdd59d3800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000",
    request: {
      attestationType:
        "0x45564d5472616e73616374696f6e000000000000000000000000000000000000",
      messageIntegrityCode:
        "0xf94496936a5c05adfe050b73f7201c43e825fd7f3093bea28111216e282ffe7b",
      requestBody: [Object],
      sourceId:
        "0x7465737445544800000000000000000000000000000000000000000000000000",
    },
    response: {
      attestationType:
        "0x45564d5472616e73616374696f6e000000000000000000000000000000000000",
      lowestUsedTimestamp: "1710025608",
      requestBody: [Object],
      responseBody: [Object],
      sourceId:
        "0x7465737445544800000000000000000000000000000000000000000000000000",
      votingRound: "821724",
    },
    merkleProof: [
      "0x7bd88161fc04f315a7e7c82f1bf93afa13f90b83c6ad55d031602fc4972ae93b",
      "0x571461cf2579bebce75d4b8fde14b11f96c84bec30ac6496ddc3d336c47f0f9e",
      "0xd794c67034e802db630c3f15c6302080a5e6ea8e4a1b9fa089ba0f92c633750d",
    ],
  },
};

/// test

/// test

// let iface = new ethers.Interface(gatewayJSON.abi);
// let calldata = iface.encodeFunctionData("receiveToken", [
//   "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019",
//   1,
//   fullProof,
// ]);
// console.log("abi");
// console.log(calldata);

async function try_something() {
  proofRequest = {
    roundId: 821724,
    requestBytes:
      "0x45564d5472616e73616374696f6e0000000000000000000000000000000000007465737445544800000000000000000000000000000000000000000000000000f94496936a5c05adfe050b73f7201c43e825fd7f3093bea28111216e282ffe7b00000000000000000000000000000000000000000000000000000000000000208dd88f83536dd2bb5b92addd69bd514c6cd18ba1bc7b8be1abed9359fdd59d3800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000",
  };

  const { data } = await axios.post(ATTESTATION_ENDPOINT, proofRequest, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": ATTESTATION_PROVIDER_API_KEY,
    },
  });
  console.log(data);

  console.log(data.data.response.responseBody);
  const receiver = data.data.response.responseBody.events[0].topics[1];
  console.log(receiver);
  // data.data.response.responseBody.events.forEach((e) => {
  //   console.log(e);
  //   // console.log(e.topics);
  // });

  let proof = data;

  const fullProof = {
    merkleProof: proof.data.merkleProof,
    data: {
      ...proof.data,
      ...proof.data.request,
      ...proof.data.response,
      status: proof.status,
    },
  };

  abiCoder = ethers.AbiCoder.defaultAbiCoder();
  address = abiCoder.decode(["address"], receiver)[0];
  amount = abiCoder.decode(
    ["uint"],
    proof.data.response.responseBody.events[0].data
  )[0];

  let iface = new ethers.Interface(gatewayJSON.abi);
  let calldata = iface.encodeFunctionData("receiveToken", [
    address,
    amount,
    fullProof,
  ]);
  console.log("abi");
  console.log(calldata);
}

try_something();
