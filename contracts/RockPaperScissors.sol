pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// to-do some incentive token to play, and variable rate depending on win or lose
//to-do deposit limitation
contract RockPaperScissors {

    mapping(address => uint) moves;
    mapping(address => bool) allowed;
    address tokenAddress;

    constructor(address _token){
        tokenAddress = _token;
    }
    
    function play(address adversary) external{
        require(moves[msg.sender] != 0 && moves[adversary] != 0);
        address winner = decideWinner(adversary);
        
        moves[adversary] = 0;
        moves[msg.sender] = 0;

        allowed[msg.sender] =  false;
        allowed[adversary] =  false;

        address token = IERC20(tokenAddress);
        if(winner == msg.sender){
            token.transfer(msg.sender, 200);
        }else if(winner == adversary){
            token.transfer(adversary, 200);
        }
        
    }

    function decideWinner(address adversary) private view returns(address){
            if (moves[msg.sender] != moves[adversary]) {
                 return (moves[msg.sender] == (moves[adversary] + 1) % 3) ? msg.sender: adversary;
            } else {
               return address(0);
            }
    }

    function sendMove(uint move) public {
      require(move > 0 && move < 4);
      require(allowed[msg.sender]);
      moves[msg.sender] = move;
    }

    function activatePlayer() external{
        token = IERC20(tokenAddress);
        token.approve(msg.sender, 100);
        token.transferFrom(msg.sender, address(this), 100);
        allowed[msg.sender] =  true;
    }
}