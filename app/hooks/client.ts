import { createPublicClient, createWalletClient, custom } from "viem";
import { mainnet } from "viem/chains";
import "viem/window";

export function ConnectWalletClient() {
  let transport;

  if (window.ethereum) {
    transport = custom(window.ethereum!);
  } else {
    const errorMessage =
      "MetaMask or another web3 wallet is not installed. Please install one to proceed.";
    throw new Error(errorMessage);
  }

  const walletClient = createWalletClient({
    chain: mainnet,
    transport: transport,
  });

  return walletClient;
}

export function ConnectPublicClient() {
  // Check for window.ethereum
  let transport;
  if (window.ethereum) {
    transport = custom(window.ethereum!);
  } else {
    const errorMessage =
      "MetaMask or another web3 wallet is not installed. Please install one to proceed.";
    throw new Error(errorMessage);
  }

  // Delcare a Public Client
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: transport,
  });

  return publicClient;
}
