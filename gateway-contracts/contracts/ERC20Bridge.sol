// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

// Burnable and mintable ERC20 for bridge operations
contract ERC20Bridge is AccessControl, ERC20Burnable {
    // Create a new role identifier for the minter role
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");

    error CallerNotMinter(address caller);
    error CallerNotOwner(address caller);

    constructor(uint initialSupply) ERC20("BabCoin", "BAB") {
        _grantRole(OWNER_ROLE, msg.sender);
        _mint(msg.sender, initialSupply);
    }

    function grantMinter(address minter) public {
        // Grant the minter role to a specified account
        if (!hasRole(OWNER_ROLE, msg.sender)) {
            revert CallerNotOwner(msg.sender);
        }
        _grantRole(MINTER_ROLE, minter);
    }

    function mint(address to, uint256 amount) public {
        // Check that the calling account has the minter role
        if (!hasRole(MINTER_ROLE, msg.sender)) {
            revert CallerNotMinter(msg.sender);
        }
        _mint(to, amount);
    }
}
