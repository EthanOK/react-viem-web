import { bsc, bscTestnet, goerli, mainnet, sepolia } from "viem/chains";

export default function getChain(chainId: number) {
  if (chainId === 1) {
    return mainnet;
  } else if (chainId === 5) {
    return goerli;
  } else if (chainId === 11155111) {
    return sepolia;
  } else if (chainId === 56) {
    return bsc;
  } else if (chainId === 97) {
    return bscTestnet;
  }
}
