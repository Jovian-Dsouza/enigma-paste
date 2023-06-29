require("@nomicfoundation/hardhat-toolbox");
var path = require("path");

const envFile = path.dirname(__dirname) + '/.env.local';
require("dotenv").config({ path: envFile });

console.log("Loaded env: ", envFile);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: process.env.QUICK_NODE_URL,
      accounts: [process.env.GOERLI_PRIVATE_KEY],
    },
  },
};
