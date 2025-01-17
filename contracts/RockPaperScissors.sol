//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

//to-do gas optimization

contract RockPaperScissors {

    mapping(address => uint8) moves;
    mapping(address => bool) allowed;
    mapping(address => uint) moveTime;

    address tokenAddress;
    uint fare;

    constructor(address _token, uint _fare){
        tokenAddress = _token;
        fare = _fare;
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
        }else{
            token.transfer(msg.sender, fare);
            token.transfer(_adversary, fare);
        }
        
    }

    function decideWinner(address _adversary) private view returns(address){
            if (moves[msg.sender] != moves[_adversary]) {
                 return (moves[msg.sender] == (moves[_adversary] + 1) % 3) ? msg.sender: _adversary;
            } else {
               return address(0);
            }
    }

    // Rock-1 Paper-2 Scissors-3
    function sendMove(uint8 _move) public {
      require(_move > 0 && _move < 4);
      require(allowed[msg.sender]);
      moves[msg.sender] = _move;
      moveTime[msg.sender] = block.timestamp;
    }

    function activatePlayer() external{
        IERC20 token = IERC20(tokenAddress);
        token.transferFrom(msg.sender, address(this), fare);
        allowed[msg.sender] =  true;
    }

    function uncooperativeAdversary() public {
        require(moveTime[msg.sender] + 30 days <= block.timestamp  && allowed[msg.sender]);
        IERC20 token = IERC20(tokenAddress);
        allowed[msg.sender] = false;
        token.transfer(msg.sender, fare);
    }
}