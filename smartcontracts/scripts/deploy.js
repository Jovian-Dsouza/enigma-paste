const hre = require("hardhat");
const fs = require("fs");

function updateContractAddress(contractAddressFile, address) {
  const addressLine = "ENIGMAPASTE_ADDRESS=";
  if (fs.existsSync(contractAddressFile)) {
    let fileContents = fs.readFileSync(contractAddressFile, "utf8");
    const addressLineIndex = fileContents.indexOf(addressLine);
    if (addressLineIndex !== -1) {
      const start = addressLineIndex + addressLine.length;
      const end = fileContents.indexOf("\n", start);
      const existingAddress = fileContents.substring(start, end);
      fileContents = fileContents.replace(existingAddress, address);
    } else {
      fileContents += `${addressLine}${address}\n`;
    }
    fs.writeFileSync(contractAddressFile, fileContents);
  } else {
    fs.writeFileSync(contractAddressFile, `${addressLine}${address}\n`);
  }
  console.log(`Contract address updated in ${contractAddressFile}`);
}

async function main() {
  const network = hre.network.name;
  console.log("Deploying to network:", network);

  const contract = await hre.ethers.deployContract("EnigmaPaste");
  await contract.waitForDeployment();
  const contract_address = await contract.getAddress();
  console.log(`Contract deployed at address: ${contract_address}`);

  if (network === "goerli") {
    updateContractAddress("../.env.local", contract_address);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
