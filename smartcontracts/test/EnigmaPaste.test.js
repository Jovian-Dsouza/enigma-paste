const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("EnigmaPaste");
  await contract.waitForDeployment();
  console.log(`Contract deployed`);

  var count = await contract.getPasteCount();
  console.log("Paste count before ", count);

  const txn1 = await contract.createPaste(
    "title1",
    "language",
    "author",
    1,
    "IPFS",
    false
  );
  txn1.wait();

  const txn2 = await contract.createPaste(
    "title2",
    "language",
    "author",
    1,
    "IPFS",
    false
  );
  txn2.wait();

  const txn3 = await contract.createPaste(
    "title3",
    "language",
    "author",
    1,
    "IPFS",
    false
  );
  txn3.wait();

  // await contract.deletePaste(2);

  count = await contract.getPasteCount();
  console.log("Paste count after ", count);

  recentPastes = await contract.getRecentPastes(2);
  console.log("recent pastes ", recentPastes);

  getPaste = await contract.getPaste(2);
  console.log("Get paste ", getPaste);

  recentPastes = await contract.getAllPastes();
  console.log("recent pastes ", recentPastes);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
