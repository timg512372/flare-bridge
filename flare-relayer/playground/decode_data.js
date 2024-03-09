const { ethers } = require("ethers");

// const iface = new ethers.Interface(["function receiveToken(address, uint)"]);

abiCoder = ethers.AbiCoder.defaultAbiCoder();
data =
  "0x2a7e581800000000000000000000000020e43cadc9961edfc61170eeef66d571c5993dfc0000000000000000000000000000000000000000000000000000000000000001";
help = abiCoder.decode(["address", "uint"], data);

// help = iface.decodeFunctionData(
//   "receiveToken",
//   "0x2a7e581800000000000000000000000020e43cadc9961edfc61170eeef66d571c5993dfc0000000000000000000000000000000000000000000000000000000000000001"
// );

console.log(help);
