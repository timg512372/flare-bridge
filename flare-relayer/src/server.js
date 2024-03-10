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

const network = process.argv[2] || "sepolia";
if (network != "sepolia" && network != "coston") {
  console.error(`Invalid network: ${network}`);
  process.exit(1);
}

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

const costonSigner = new ethers.Wallet(process.env.PRIVATE_KEY, costonProvider);
const sepoliaSigner = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  sepoliaProvider
);

const contract = new ethers.Contract(
  network == "coston" ? process.env.COSTON_RELAY : process.env.SEPOLIA_RELAY,
  relayJSON.abi,
  provider
);

console.log("Listening...");
contract.on("RelayRequested", async (...parameters) => {
  console.log(`Transfer event detected`);
  console.log(parameters);
  const event = parameters[parameters.length - 1];

  // Call the attestation provider API
  const utils = await import(
    `${FLARE_CONTRACTS}/dist/coston/StateConnector/libs/ts/utils.js`
  );

  const abiEncodedAttestation = await waitForAttestation(
    event.log.transactionHash
  );

  const stateConnector = await getStateConnector();
  const attestationTx = await stateConnector.requestAttestations(
    abiEncodedAttestation
  );
  const receipt = await attestationTx.wait();
  const block = await costonProvider.getBlock(receipt.blockNumber);

  // calculate round ID
  const roundOffset = await stateConnector.BUFFER_TIMESTAMP_OFFSET();
  const roundDuration = await stateConnector.BUFFER_WINDOW();
  const submissionRoundID = Number(
    (BigInt(block.timestamp) - roundOffset) / roundDuration
  );
  console.log(
    `Submission round ID: ${submissionRoundID} (offset: ${roundOffset}, duration: ${roundDuration})`
  );

  // Wait for attestation round to finalize
  var prevFinalizedRoundID = -1;
  let lastFinalizedRoundID = 0;
  while (lastFinalizedRoundID < submissionRoundID) {
    await new Promise((resolve) => setTimeout(resolve, 10000));

    lastFinalizedRoundID = Number(await stateConnector.lastFinalizedRoundId());

    if (prevFinalizedRoundID != lastFinalizedRoundID) {
      console.log("  Last finalized round is", lastFinalizedRoundID);
      prevFinalizedRoundID = lastFinalizedRoundID;
    }
  }
  // 8. Retrieve Merkle Proof

  console.log("Retrieving proof from attestation provider...");

  proof = await waitForProof({
    roundId: submissionRoundID,
    requestBytes: abiEncodedAttestation,
  });

  if (proof == null) {
    console.log("Proof not found");
    return;
  }
  console.log("  Received Merkle proof:", proof.data.merkleProof);
  console.log(proof.data.response.responseBody);
});

async function waitForProof(proofRequest) {
  for (let i = 0; i < 10; i++) {
    try {
      const { data } = await axios.post(ATTESTATION_ENDPOINT, proofRequest, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": ATTESTATION_PROVIDER_API_KEY,
        },
      });
      console.log(data);

      if (data.status == "PENDING") {
        console.log("Proof is pending, trying again");
        await new Promise((resolve) => setTimeout(resolve, 10000));
      } else if (data.status == "OK") {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return null;
}

async function waitForAttestation(txHash) {
  const rawAttestationRequest = {
    attestationType:
      "0x45564d5472616e73616374696f6e000000000000000000000000000000000000",
    sourceId:
      "0x7465737445544800000000000000000000000000000000000000000000000000",
    requestBody: {
      transactionHash: txHash,
      requiredConfirmations: "0",
      provideInput: true,
      listEvents: true,
      logIndices: [],
    },
  };
  console.log(
    "Preparing attestation request using verifier",
    ATTESTATION_PROVIDER_URL,
    "..."
  );
  console.log("Request:", rawAttestationRequest);

  console.log(VERIFICATION_ENDPOINT);

  abiEncodedRequest = "";

  for (let i = 0; i < 10; i++) {
    try {
      const { data, status } = await axios.post(
        VERIFICATION_ENDPOINT,
        rawAttestationRequest,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": ATTESTATION_PROVIDER_API_KEY,
          },
        }
      );
      console.log(data);
      console.log(status);
      if (data.status != "VALID") {
        console.log("Invalid attestation, waiting for block to process");
        // wait for 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        console.log("Valid attestation");
        abiEncodedRequest = data.abiEncodedRequest;
        return abiEncodedRequest;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  if (abiEncodedRequest == "") {
    console.log("No valid attestation found");
    return "";
  }
}

async function getStateConnector() {
  const flare = await import(FLARE_CONTRACTS);

  const flareContractRegistry = new ethers.Contract(
    FLARE_CONTRACT_REGISTRY_ADDR,
    flare.nameToAbi("FlareContractRegistry", "coston").data,
    costonSigner
  );

  const stateConnectorAddress =
    await flareContractRegistry.getContractAddressByName("StateConnector");

  const stateConnector = new ethers.Contract(
    stateConnectorAddress,
    flare.nameToAbi("StateConnector", "coston").data,
    costonSigner
  );

  return stateConnector;
}
