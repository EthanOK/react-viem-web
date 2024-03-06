"use client";
import { useState } from "react";
import { ConnectPublicClient, ConnectWalletClient } from "../hooks/client";
import login, { verifySignature } from "../hooks/login";
import { DefaultChainId, LoginMessage } from "../config";

export default function WalletButton() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState(BigInt(0));
  const [chainId, setChainId] = useState<number | null>(null);

  async function handleClick() {
    try {
      const walletClient = ConnectWalletClient();
      const publicClient = ConnectPublicClient();

      // Change Chain
      await walletClient.switchChain({ id: DefaultChainId });
      // Must: 此 API 对于需要访问用户帐户以执行交易或与智能合约交互的 dapp 非常有用。
      await walletClient.requestAddresses();

      const chainId = await walletClient.getChainId();

      setChainId(chainId);

      const [account] = await walletClient.getAddresses();
      console.log(account);

      if (localStorage.getItem("signature") === null) {
        const signature = await login(walletClient, account);

        console.log(signature);
        // signature 存缓存
        localStorage.setItem("signature", signature);

        const account1 = await verifySignature(LoginMessage, signature);

        console.log("Success: ", account == account1);
      }

      const balance = await publicClient.getBalance({ address: account });

      setAccount(account);
      setBalance(balance);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Status chainId={chainId} address={account} balance={balance} />
      <button
        className="px-8 py-2 rounded-md bg-[#1e2124] flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10"
        onClick={handleClick}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
          alt="MetaMask Fox"
          style={{ width: "25px", height: "25px" }}
        />
        <h1 className="mx-auto">Connect Wallet</h1>
      </button>
    </>
  );
}

function Status({
  chainId,
  address,
  balance,
}: {
  chainId: number | null;
  address: string | null;
  balance: BigInt;
}) {
  if (!address) {
    return (
      <div className="flex items-center">
        <div className="border bg-red-600 border-red-600 rounded-full w-1.5 h-1.5 mr-2"></div>
        <div>Disconnected</div>
      </div>
    );
  }
  return (
    <div className="flex items-center w-full">
      <div className="border bg-green-500 border-green-500 rounded-full w-1.5 h-1.5 mr-2"></div>
      <div className="text-xs md:text-xs">
        ChainId:{chainId}
        <br />
        Account: {address}
        <br />
        Balance: {balance.toString()}
      </div>
    </div>
  );
}
