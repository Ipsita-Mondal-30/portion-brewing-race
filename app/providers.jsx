"use client";

import { WalletProvider } from "@/components/WalletContext";
import { TxToastHost } from "@/components/TxToastHost";

export function Providers({ children }) {
  return (
    <WalletProvider>
      {children}
      <TxToastHost />
    </WalletProvider>
  );
}
