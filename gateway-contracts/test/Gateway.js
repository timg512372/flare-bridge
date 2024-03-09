const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Gateway", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployGatewayFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("ERC20Bridge");
    const token = await Token.deploy(100000000);

    const RelayGateway = await ethers.getContractFactory("RelayGateway");
    const relayGateway = await RelayGateway.deploy(
      "0x20E43CAdC9961eDfc61170EeeF66d571C5993DFC",
      true
    );

    await relayGateway.addTokenPair(
      token.target,
      "0x5187763e09a672eda81F27e622129Ac28393ca53"
    );

    const Gateway = await ethers.getContractFactory("Gateway");
    const gateway = await Gateway.deploy(relayGateway.target, token.target);
    await gateway.setRelay("0x2cD3CbcC13e5b165b6b43708788B4477778bC171");
    await gateway.setBridgedCoinContract(
      "0x5187763e09a672eda81F27e622129Ac28393ca53"
    );

    return { token, relayGateway, gateway, owner, otherAccount };
  }

  describe("Basic Tests", function () {
    it("Should transfer", async function () {
      const { token, gateway, owner, otherAccount } = await loadFixture(
        deployGatewayFixture
      );

      await token.approve(gateway.target, 100);
      console.log("approved");
      await gateway.sendToken(10);
    });
  });
});
