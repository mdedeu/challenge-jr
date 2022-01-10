const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RockPaperScissors", function () {

  beforeEach(async function(){
    [this.alice, this.bob] = await hre.ethers.getSigners();
    this.RockPaperScissors = await hre.ethers.getContractFactory("RockPaperScissors");
    
    this.SampleToken = await hre.ethers.getContractFactory("SampleToken");
    this.sampletoken = await this.SampleToken.deploy(200, this.bob.address);
    
    this.rockpaperscissors = await this.RockPaperScissors.deploy(this.sampletoken.address, 100);
    await this.rockpaperscissors.deployed();

    await this.sampletoken.approve(this.rockpaperscissors.address, 100);
    await this.sampletoken.connect(this.bob).approve(this.rockpaperscissors.address, 100);
  })

  it("Player1 wins", async function () {
    
    await this.rockpaperscissors.activatePlayer();
    await this.rockpaperscissors.connect(this.bob).activatePlayer();

    //rock
    await this.rockpaperscissors.sendMove(1);
    //scissors
    await this.rockpaperscissors.connect(this.bob).sendMove(3);

    await this.rockpaperscissors.play(this.bob.address);
  
    expect(await this.sampletoken.balanceOf(this.bob.address)).to.equal(0);
    expect(await this.sampletoken.balanceOf(this.alice.address)).to.equal(200);
    expect(await this.sampletoken.balanceOf(this.rockpaperscissors.address)).to.equal(0);

  });

  it("Player2 wins", async function () {
 
    await this.rockpaperscissors.activatePlayer();
    await this.rockpaperscissors.connect(this.bob).activatePlayer();
    
    //rock
    await this.rockpaperscissors.sendMove(1);
    //paper
    await this.rockpaperscissors.connect(this.bob).sendMove(2);

    await this.rockpaperscissors.play(this.bob.address);

    expect(await this.sampletoken.balanceOf(this.bob.address)).to.equal(200);
    expect(await this.sampletoken.balanceOf(this.alice.address)).to.equal(0);
    expect(await this.sampletoken.balanceOf(this.rockpaperscissors.address)).to.equal(0);

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

    await expect(this.rockpaperscissors.uncooperativeAdversary()).to.be.reverted;

    await ethers.provider.send("evm_increaseTime", [2592001]);
    await ethers.provider.send("evm_mine");

    expect(await this.sampletoken.balanceOf(this.alice.address)).to.equal(0);

    await this.rockpaperscissors.uncooperativeAdversary();

    expect(await this.sampletoken.balanceOf(this.alice.address)).to.equal(100);
  });


});
