// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;
import {CalldataInterface} from "./CalldataInterface.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

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



contract RelayGateway is ReentrancyGuard {

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

    address public owner;
    address public relayer;
    bool public is_destination;
    CalldataInterface public calldataInterface;
    RelayData[] public executedRelays;
    RelayData[] public requestedRelays;

    IERC20[] public availableTokens;
    mapping(IERC20 => address) public tokenPair;

    modifier onlyRelayer() {
        require(msg.sender == relayer, "Not relayer");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _relayer, bool _is_destination) {
        owner = msg.sender;
        relayer = _relayer;
        is_destination = _is_destination;
        calldataInterface = new CalldataInterface();
    }

    function addTokenPair(IERC20 _sourceToken, address _targetToken) public onlyOwner {
        require(tokenPair[_sourceToken] == address(0), "Token pair already exists");
        availableTokens.push(_sourceToken);
        tokenPair[_sourceToken] = _targetToken;
    }

    function removeTokenPair(IERC20 _sourceToken, uint256 tokenId) public onlyOwner {
        require(tokenPair[_sourceToken] != address(0), "Token pair does not exist");
        require(availableTokens[tokenId] == _sourceToken, "Invalid token id");
        availableTokens[tokenId] = availableTokens[availableTokens.length - 1];
        availableTokens.pop();
        delete tokenPair[_sourceToken];
    }

    function executeRelay(RelayData memory _relayData) public onlyRelayer {
        // TODO: check tokens
        if(_relayData.amount > 0){
            IERC20(_relayData.targetToken).transfer(_relayData.relayTarget, _relayData.amount);            
        }
        if(_relayData.additionalCalldata.length > 0){
            calldataInterface.executeCall(_relayData.relayTarget, _relayData.additionalCalldata);
        }
        executedRelays.push(_relayData);
        emit RelayExecuted(_relayData.uid, _relayData.relayInitiator, _relayData.relayTarget, _relayData.additionalCalldata, _relayData.sourceToken, _relayData.targetToken, _relayData.amount);
    }

    function requestRelay(address _relayTarget, bytes memory _additionalCalldata, address _sourceToken, uint256 _amount) 
        public nonReentrant {
        address _targetToken = tokenPair[IERC20(_sourceToken)];
        require(_targetToken != address(0), "Token not supported");
        RelayData memory _relayData = RelayData({
            uid: requestedRelays.length,
            relayInitiator: msg.sender,
            relayTarget: _relayTarget,
            additionalCalldata: _additionalCalldata,
            sourceToken: _sourceToken,
            targetToken: _targetToken,
            amount: _amount,
            executionResult: 0,
            relayDataHash: 0
        });
        requestedRelays.push(_relayData);
        IERC20(_sourceToken).transferFrom(msg.sender, owner, _amount);
        emit RelayRequested(_relayData.uid, _relayData.relayInitiator, _relayData.relayTarget, _relayData.additionalCalldata, _relayData.sourceToken, _relayData.targetToken, _relayData.amount);
    }

    function setRelayResult(uint256 _uid, uint256 _executionResult, bytes32 relayDataHash) public onlyRelayer() {
        require(_uid < executedRelays.length, "Invalid uid");
        require(_executionResult == 1 || _executionResult == 2, "Invalid execution result");
        executedRelays[_uid].executionResult = _executionResult;
        executedRelays[_uid].relayDataHash = relayDataHash;

    }

    function setOwner(address _owner) public onlyOwner {
        owner = _owner;
    }

    function setRelayer(address _relayer) public onlyOwner {
        relayer = _relayer;
    }

    function getRequestedRelays() public view returns (RelayData[] memory) {
        RelayData[] memory _requestedRelays = new RelayData[](requestedRelays.length);
        for(uint256 i = 0; i < requestedRelays.length; i++){
            _requestedRelays[i] = requestedRelays[i];
        }
        return _requestedRelays;
    }

    function getExecutedRelays() public view returns (RelayData[] memory) {
        RelayData[] memory _executedRelays = new RelayData[](executedRelays.length);
        for(uint256 i = 0; i < executedRelays.length; i++){
            _executedRelays[i] = executedRelays[i];
        }
        return _executedRelays;
    }

}

