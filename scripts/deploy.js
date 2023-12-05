const path = require("path");
const fs = require("fs");
const Papa = require('papaparse');

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
      name: "Lands",
      factory: await ethers.getContractFactory("Lands"),
    },
    {
      name: "LandParameters",
      factory: await ethers.getContractFactory("LandParameters"),
    },
    // In this place add more contracts as needed
  ];

  const csvData = fs.readFileSync("./data.csv", "utf8");
  //const rows = csvData.split("\n");

  const parsedData = Papa.parse(csvData, {
    header: false, // Set to true if the first row contains headers
    skipEmptyLines: true,
  });
  
  // Access rows using parsedData.data
  const rows = parsedData.data;
  

  const landId = [];
  const description = [];
  const pHLevel = [];
  const organicMatter = [];
  const nitrogenContent = [];
  const phosphorusContent = [];
  const potassiumContent = [];
  const area = [];

  for (let i = 1; i < rows.length; i++) {
    const rowData = rows[i];

    const [
      _landId,
      _description,
      _pHLevel,
      _organicMatter,
      _nitrogenContent,
      _phosphorusContent,
      _potassiumContent,
      _area,
    ] = rowData.map((item) => item.trim());

    landId.push(parseInt(_landId));
    description.push(_description);
    pHLevel.push(_pHLevel);
    organicMatter.push(_organicMatter);
    nitrogenContent.push(_nitrogenContent);
    phosphorusContent.push(_phosphorusContent);
    potassiumContent.push(_potassiumContent);
    area.push(_area);
  }


  for (const contract of contractsToDeploy) {
    let instance;
    if (contract.name == "LandParameters") {
      instance = await contract.factory.deploy(landId, description, pHLevel, organicMatter, nitrogenContent, phosphorusContent, potassiumContent, area);
    } else {
      instance = await contract.factory.deploy();
    }

    await instance.deployed();

    console.log(`${contract.name} address:`, instance.address);

    // Save the contract's artifacts and address in the frontend directory
    saveFrontendFiles(contract.name, instance);
  }
}

function saveFrontendFiles(contractName, contractInstance) {
  const fs = require("fs");
  const contractsDir = path.join(
    __dirname,
    "..",
    "frontend",
    "src",
    "contracts"
  );
  const filePath = path.join(contractsDir, "contract-address.json");

  let data = {};

  if (fs.existsSync(filePath)) {
    // If the file already exists, read its content
    data = JSON.parse(fs.readFileSync(filePath));
  }

  // Add or update the contract data
  data[contractName] = contractInstance.address;

  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

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
