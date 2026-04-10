"use client";

import { TransactionToast } from "@/components/TransactionToast";
import { useWallet } from "@/components/WalletContext";

export function TxToastHost() {
  const { txStatus, dismissTx } = useWallet();
  return <TransactionToast txStatus={txStatus} onDismiss={dismissTx} />;
}
