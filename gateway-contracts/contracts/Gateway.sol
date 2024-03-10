// SPDX-License-Identifier: MIT
import {IEVMTransactionVerification} from "@flarenetwork/flare-periphery-contracts/coston/stateConnector/interface/IEVMTransactionVerification.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20Bridge} from "./IERC20Bridge.sol";
import {IRelayer} from "./IRelayer.sol";
import {FlareContractsRegistryLibrary} from "@flarenetwork/flare-periphery-contracts/coston/util-contracts/ContractRegistryLibrary.sol";
import {EVMTransaction} from "@flarenetwork/flare-periphery-contracts/coston/stateConnector/interface/EVMTransaction.sol";
import "hardhat/console.sol";
pragma solidity >=0.8.2 <0.9.0;

contract Gateway is Ownable {

    IERC20Bridge public coinContract;
    IRelayer public relayerContract;
    address relayTarget;
    address bridgedCoinContract;

    mapping(bytes32 => bool) private burnProofs;

    event TokensBridged();

    constructor(address relayer, address coin) Ownable(msg.sender){
        coinContract = IERC20Bridge(coin);
        relayerContract = IRelayer(relayer);
    }

    // TODO: Actually make this do something
    function setRelay(address _target) public onlyOwner {
        relayTarget = _target;
    }

    function setBridgedCoinContract(address _bridgedContract) public onlyOwner {
        bridgedCoinContract = _bridgedContract;
    }

    // User should have approved the contract
    function sendToken(uint amount) public {
        coinContract.burnFrom(msg.sender, amount);
        bytes memory transferPayload = abi.encodeWithSignature("receiveToken(address,uint)", msg.sender, amount);
        relayerContract.requestRelay(relayTarget, transferPayload, address(coinContract), 0);
    }

    function receiveToken(address to, uint amount, EVMTransaction.Proof calldata transaction) public {
        // Verify the 
        console.log(tx.origin);
        require(tx.origin == relayTarget, "You are not the relayer");
        require(isBurnProofValid(transaction, bridgedCoinContract, to, amount), "Invalid Proof");
        coinContract.mint(to, amount);
    }

    function isEVMTransactionProofValid(
        EVMTransaction.Proof calldata transaction
    ) internal view returns (bool) {
        // Use the library to get the verifier contract and verify that this transaction was proved by state connector
        return FlareContractsRegistryLibrary
                .auxiliaryGetIEVMTransactionVerification()
                .verifyEVMTransaction(transaction);
    }

    function isBurnProofValid(EVMTransaction.Proof calldata transaction, address tokenAddress, address to, uint amount) internal returns (bool)
    {
        require(
            isEVMTransactionProofValid(transaction),
            "Invalid proof"
        );
        
        require(burnProofs[transaction.data.requestBody.transactionHash] == false, "Proof must be unique");
        burnProofs[transaction.data.requestBody.transactionHash] = true;

        uint eventIndex = 0;
        EVMTransaction.Event memory _event = transaction.data.responseBody.events[eventIndex];
        // This just check the happy path - do keep in mind, that this can possibly faked
        // And keep in mind that the specification does not require the topic0 to be event signature
        require(
            _event.topics[0] == keccak256("Transfer(address,address,uint256)"),
            "Invalid event"
        );

        (uint256 burned_tokens) = abi.decode(
            _event.data,
            (uint256)
        );

        require(burned_tokens == amount, "Invalid amount");
        (address burner) = abi.decode(
            abi.encodePacked(_event.topics[1]),
            (address)
        );
        require(to == burner, "Invalid address");

        (address burnee) = abi.decode(
            abi.encodePacked(_event.topics[2]),
            (address)
        );
        require(address(0) == burnee, "Did not burn token");

        require(_event.emitterAddress == tokenAddress, "Invalid token address");
        require(_event.emitterAddress == bridgedCoinContract, "Invalid token address");

        return true;
    }

}