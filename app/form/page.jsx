"use client";

import Navbar from "@/components/Navbar";
import AlchemistForm from "@/components/AlchemistForm";
import { useWallet } from "@/components/WalletContext";

export default function FormPage() {
  const { address, connectWallet, loadingConnect } = useWallet();

  return (
    <>
      <Navbar address={address} loadingConnect={loadingConnect} onConnect={connectWallet} />
      <AlchemistForm />
    </>
  );
}
