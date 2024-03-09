// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract CalldataInterface is ReentrancyGuard {
    function executeCall(address _recipient, bytes memory _callData) external nonReentrant {
        (bool success, bytes memory result) = address(_recipient).call(_callData);
        if (!success) {
            if (result.length < 68) revert("Error in execution");
            assembly {
                result := add(result, 0x04)
            }
            revert(abi.decode(result, (string)));
        }
    }
}
