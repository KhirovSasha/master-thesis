const path = require("path");

async function main() {
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const contractsToDeploy = [
    {
      name: "Token",
      factory: await ethers.getContractFactory("Token"),
    },
    {
      name: "FiveParameterContract",
      factory: await ethers.getContractFactory("FiveParameterContract"),
    },
    // In this place add more contracts as needed
  ];
  
  for (const contract of contractsToDeploy) {
    const instance = await contract.factory.deploy();
    await instance.deployed();

    console.log(`${contract.name} address:`, instance.address);

    // Save the contract's artifacts and address in the frontend directory
    saveFrontendFiles(contract.name, instance);
  }
}

function saveFrontendFiles(contractName, contractInstance) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }


  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ [contractName]: contractInstance.address }, undefined, 2)
  );


  const contractArtifact = artifacts.readArtifactSync(contractName);

  fs.writeFileSync(
    path.join(contractsDir, `${contractName}.json`),
    JSON.stringify(contractArtifact, null, 2)
  );
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
