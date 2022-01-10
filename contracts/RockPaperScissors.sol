//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// to-do some incentive token to play, and variable rate depending on win or lose
//to-do gas optimization
//to-do security check and testing

contract RockPaperScissors {

    mapping(address => uint) moves;
    mapping(address => bool) allowed;
    address tokenAddress;
    uint fare;

    constructor(address _token, uint _fare){
        tokenAddress = _token;
        token = IERC20(tokenAddress);
        fare = _fare * 10^tokenAddress.getDecimals();
    }
    
    function play(address _adversary) external{
        require(moves[msg.sender] != 0 && moves[_adversary] != 0);
        address winner = decideWinner(_adversary);
        
        moves[_adversary] = 0;
        moves[msg.sender] = 0;

        allowed[msg.sender] =  false;
        allowed[_adversary] =  false;

        IERC20 token = IERC20(tokenAddress);
        if(winner == msg.sender){
            token.transfer(msg.sender, fare * 2);
        }else if(winner == _adversary){
            token.transfer(_adversary, fare*2 );
        }
        
    }

    function decideWinner(address _adversary) private view returns(address){
            if (moves[msg.sender] != moves[_adversary]) {
                 return (moves[msg.sender] == (moves[_adversary] + 1) % 3) ? msg.sender: _adversary;
            } else {
               return address(0);
            }
    }

    function sendMove(uint _move) public {
      require(_move > 0 && _move < 4);
      require(allowed[msg.sender]);
      moves[msg.sender] = _move;
    }

    function activatePlayer() external{
        IERC20 token = IERC20(tokenAddress);
        token.approve(msg.sender, fare);
        token.transferFrom(msg.sender, address(this), fare);
        allowed[msg.sender] =  true;
    }
}