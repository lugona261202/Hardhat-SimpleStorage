// imports

const { ethers, run, network } = require("hardhat");

// async main
async function main() {
  // deploying
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log(" Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed contract ot ${simpleStorage.address}`);
  // verifying
  // but we do not want to deploy our local hardhat network
  console.log(network.config);
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    // only if it is an online network like rinkeby with id =4 we will verify it
    console.log("waiting for txes...");
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }
  //interacting with contracts , updating
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`updated value is : ${updatedValue}`);
}

async function verify(constractAdress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified");
    } else {
      console.log(e);
    }
  }
}

// main
main()
  .then(() => process.exit(0))
  .catch(() => {
    console.error(error);
    process.exit(1);
  });

// yarn hardhat console --network localhost(has to be defined in .config)
// this will run a local console on which we can directly run our contract funciton
