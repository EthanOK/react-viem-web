import { WalletClient, recoverMessageAddress } from "viem";
import { LoginMessage } from "../config";

export default async function login(walletClient: WalletClient, account: any) {
  const signature = await walletClient.signMessage({
    account,
    message: LoginMessage,
  });

  return signature;
}

export async function verifySignature(message: any, signature: any) {
  const account = await recoverMessageAddress({ message, signature });
  return account;
}
