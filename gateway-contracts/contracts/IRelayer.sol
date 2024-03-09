// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

struct RelayData {
    uint256 uid;
    address relayInitiator;
    address relayTarget;
    bytes additionalCalldata;
    address sourceToken;
    address targetToken;
    uint256 amount; 
    uint256 executionResult; // 0 unknown, 1 OK, 2 failed
    bytes32 relayDataHash; 
}

interface IRelayer {

    event RelayRequested(
        uint256 uid,
        address relayInitiator,
        address relayTarget,
        bytes additionalCalldata,
        address sourceToken,
        address targetToken,
        uint256 amount
    );

    event RelayExecuted(
        uint256 uid,
        address relayInitiator,
        address relayTarget,
        bytes additionalCalldata,
        address sourceToken,
        address targetToken,
        uint256 amount
    );

    function addTokenPair(IERC20 _sourceToken, address _targetToken) external;
    function removeTokenPair(IERC20 _sourceToken, uint256 tokenId) external;

    function executeRelay(RelayData memory _relayData) external;

    function requestRelay(address _relayTarget, bytes memory _additionalCalldata, address _sourceToken, uint256 _amount) external;

    function setRelayResult(uint256 _uid, uint256 _executionResult, bytes32 relayDataHash) external;

}