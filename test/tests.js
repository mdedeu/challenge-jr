const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RockPaperScissors", function () {

  beforeEach(async function(){
    [this.alice, this.bob] = await hre.ethers.getSigners();
    this.RockPaperScissors = await hre.ethers.getContractFactory("RockPaperScissors");
    
    this.SampleToken = await hre.ethers.getContractFactory("SampleToken");
    this.sampletoken = await this.SampleToken.deploy(10000*10^18, this.bob.address);
    
    this.rockpaperscissors = await this.RockPaperScissors.deploy(this.sampletoken.address, 100);
    await this.rockpaperscissors.deployed();

    await this.sampletoken.approve(this.rockpaperscissors.address, 100 * 10^18);
    await this.sampletoken.connect(this.bob).approve(this.rockpaperscissors.address, 100 * 10^18);
  })

  it("Player1 wins", async function () {
    
    await this.rockpaperscissors.activatePlayer();
    await this.rockpaperscissors.connect(this.bob).activatePlayer();

    //rock
    await this.rockpaperscissors.sendMove(1);
    //scissors
    await this.rockpaperscissors.connect(this.bob).sendMove(3);

    await this.rockpaperscissors.play(this.bob.address);

  });

  it("Player2 wins", async function () {
 
    await this.rockpaperscissors.activatePlayer();
    await this.rockpaperscissors.connect(this.bob).activatePlayer();
    
    //rock
    await this.rockpaperscissors.sendMove(1);
    //paper
    await this.rockpaperscissors.connect(this.bob).sendMove(2);

    await this.rockpaperscissors.play(this.bob.address);

  });

  it("Some of the players have not deposited initial  token amount", async function () {
    
    await this.rockpaperscissors.activatePlayer();
    
    //rock
    await this.rockpaperscissors.sendMove(1);
    //paper
    await expect(this.rockpaperscissors.connect(this.bob).sendMove(2)).to.be.reverted;

  });

  it("Player sent invalid move", async function () {
    await this.rockpaperscissors.activatePlayer();
    await expect(this.rockpaperscissors.sendMove(4)).to.be.reverted;
  });

  it("Uncooperative player", async function () {

    await this.rockpaperscissors.activatePlayer();
    
    //rock
    await this.rockpaperscissors.sendMove(1);

    await expect(this.rockpaperscissors.play(this.bob.address)).to.be.reverted;

  });


});
