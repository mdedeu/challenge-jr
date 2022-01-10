const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RockPaperScissors", function () {
  it("Should return the new token balance once we win", async function () {
    const RockPaperScissors = await ethers.getContractFactory("RockPaperScissors");
    const rockpaperscissors = await RockPaperScissors.deploy(DAI_ADDRESS);
    await rockpaperscissors.deployed();

    


  });
});
