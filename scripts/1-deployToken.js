const hre = require("hardhat");

async function main() {
 
  await hre.run('compile');

  [this.alice, this.bob] = await hre.ethers.getSigners();
  const SampleToken = await hre.ethers.getContractFactory("SampleToken");
  const sampleToken = await SampleToken.deploy(10000*10^18, this.bob);

  await sampleToken.deployed();

  console.log("SampleToken deployed to:", sampleToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
