const hre = require("hardhat");

async function main() {
 
  [this.alice, this.bob] = await hre.ethers.getSigners();
  const SampleToken = await hre.ethers.getContractFactory("SampleToken");
  const sampleToken = await SampleToken.deploy(10000*10^18, this.bob);

  await sampleToken.deployed();

  const RockPaperScissors = await hre.ethers.getContractFactory("RockPaperScissors");
  const rockpaperscissors = await RockPaperScissors.deploy(this.sampleToken.address);

  await rockpaperscissors.deployed();

  console.log("RockPaperScissors deployed to:", rockpaperscissors.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
