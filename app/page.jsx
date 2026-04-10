"use client";

import Navbar from "@/components/Navbar";
import WelcomeScreen from "@/components/WelcomeScreen";
import { useWallet } from "@/components/WalletContext";

export default function WelcomePage() {
  const { address, connectWallet, disconnectWallet, loadingConnect } = useWallet();

  return (
    <>
      <Navbar
        address={address}
        loadingConnect={loadingConnect}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
      />
      <WelcomeScreen />
    </>
  );
}
