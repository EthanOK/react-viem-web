// import { createPublicClient, http, formatEther, formatGwei } from "viem";
// import { mainnet } from "viem/chains";

const { createPublicClient, http, formatEther, formatGwei } = require("viem");
const { mainnet } = require("viem/chains");

const YGMEAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "address",
        name: "_recommender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "mintNum",
        type: "uint256",
      },
    ],
    name: "swap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function main() {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
  });

  //   const blockNumber = await publicClient.getBlockNumber();
  //   console.log(blockNumber);

  const gas_used = await publicClient.estimateContractGas({
    address: "0x1b489201D974D37DDd2FaF6756106a7651914A63",
    abi: YGMEAbi,
    functionName: "swap",
    args: [
      "0x74cd2fc9b69f816b4998c5d26d1ed5fd9769d2a5",
      "0x0000000000000000000000000000000000000000",
      22,
    ],
    account: "0xC9c5F7B27201Ee0A462F47366f40eedF064EfEDa",
  });

  const gas_price = await publicClient.getGasPrice();
  const tx_fee = gas_used * gas_price;

  console.log(formatGwei(gas_price));

  console.log(formatEther(tx_fee));
}

main();
