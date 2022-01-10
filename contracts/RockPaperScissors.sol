pragma solidity ^0.8.0;

// to-do some incentive token to play, and variable rate depending on win or lose
contract RockPaperScissors {

    enum Move{NOTREADY,ROCK,PAPER,SCISSORS}
    mapping(address =>Move) moves;

    function play(address adversary) public {
        require(moves[msg.sender]!= Move.NOTREADY && moves[adversary] != Move.NOTREADY);
        address winner = decideWinner(adversary);
        moves[adversary] = Move.NOTREADY;
        moves[msg.sender] = Move.NOTREADY;
        //to-do transfer tokens to winner
    }

    function decideWinner(address adversary) private returns(address){
        //game-engine
    }

    function sendMove(Move move, address adversary) public {
      //check tokens balance used
      //check adversary state
      //play
    }







}