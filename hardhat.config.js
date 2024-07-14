require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("./tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETKEY_API_KEY = process.env.COINMARKETKEY_API_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.24",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  localhost: {
    url: "http://127.0.0.1:8545/",
    // accounts : already placed by hardhat default
    chainId: 31337,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETKEY_API_KEY,
  },
};
