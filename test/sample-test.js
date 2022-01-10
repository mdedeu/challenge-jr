const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RockPaperScissors", function () {

  beforeEach(async function(){
    const RockPaperScissors = await ethers.getContractFactory("RockPaperScissors");
    const rockpaperscissors = await RockPaperScissors.deploy(DAI_ADDRESS);
    await rockpaperscissors.deployed();
  })

  it("Player1 wins", async function () {
   

    //activate player 1
    //activate player 2
    
    //sendMove1
    //sendMove2 

    //play
  });

  it("Player2 wins", async function () {
 
    //activate player 1
    //activate player 2
    
    //sendMove1
    //sendMove2 

    //play
  });

  it("Some of the players have not deposited initial  token amount", async function () {

    //activate player 1
    
    //sendMove1
    //sendMove2 ---fail
    //play---fail
  });

  it("Player sent invalid move", async function () {
    //activate player 1
    //activate player 2
    //send move 1 invalid

  });


});
