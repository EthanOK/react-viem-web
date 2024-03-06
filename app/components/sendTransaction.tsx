"use client";

import { parseEther } from "viem";
import { DefaultChainId, Receiver } from "../config";
import { ConnectPublicClient, ConnectWalletClient } from "../hooks/client";
import getChain from "../hooks/getChain";

export default function SendTXButton() {
  async function handleClick() {
    try {
      const walletClient = ConnectWalletClient();
      const publicClient = ConnectPublicClient();

      // Change Chain
      await walletClient.switchChain({ id: DefaultChainId });
      // Must: 此 API 对于需要访问用户帐户以执行交易或与智能合约交互的 dapp 非常有用。
      await walletClient.requestAddresses();

      const [account] = await walletClient.getAddresses();

      const hash = await walletClient.sendTransaction({
        chain: getChain(await walletClient.getChainId()),
        account,
        to: Receiver,
        value: parseEther("0.1"),
      });

      console.log("Tx Hash: ", hash);

      const transactionR = await publicClient.waitForTransactionReceipt({
        hash,
      });

      alert(`Transaction status: ${transactionR.status}`);
    } catch (error) {
      alert(`Transaction failed: ${error}`);
    }
  }
  return (
    <button
      className="py-2.5 px-2 rounded-md bg-[#1e2124] flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10"
      onClick={handleClick}
    >
      Send Transaction
    </button>
  );
}
