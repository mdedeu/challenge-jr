pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SampleToken is ERC20{

    constructor(uint256 supplyToDistribute, address bob) ERC20("Marrrquitos","MAR"){
        _mint(msg.sender, supplyToDistribute/2);
        _mint(bob, supplyToDistribute/2);

    }
}
