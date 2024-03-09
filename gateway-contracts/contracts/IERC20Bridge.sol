// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC20Bridge is IERC20 {
    function burn(uint256 value) external;
    function burnFrom(address account, uint256 value) external;
    function mint(address to, uint256 amount) external ;
}