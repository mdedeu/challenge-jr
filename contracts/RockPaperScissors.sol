pragma solidity ^0.8.0;

// to-do some incentive token to play, and variable rate depending on win or lose
//to-do deposit limitation
contract RockPaperScissors {

    mapping(address => uint) moves;
    
    function play(address adversary) public {
        require(moves[msg.sender] != 0 && moves[adversary] != 0);
        address winner = decideWinner(adversary);
        
        moves[adversary] = 0;
        moves[msg.sender] = 0;
        if(winner == msg.sender){
            //to-do transfer all tokens to winner
        }else if(winner == adversary){
            
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
      moves[msg.sender] = move;
      //approveTokens
    }







}