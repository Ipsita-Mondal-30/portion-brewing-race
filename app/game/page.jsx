"use client";

import Navbar from "@/components/Navbar";
import GameUI from "@/components/GameUI";
import { useWallet } from "@/components/WalletContext";

export default function GamePage() {
  const {
    address,
    loadingConnect,
    connectWallet,
    loadingJoin,
    loadingBrew,
    handleJoinRace,
    handleBrewPotion,
    leaderboardRows,
    leaderboardLoading,
    leaderboardError,
  } = useWallet();

  return (
    <>
      <Navbar address={address} loadingConnect={loadingConnect} onConnect={connectWallet} />
      <GameUI
        address={address}
        loadingJoin={loadingJoin}
        loadingBrew={loadingBrew}
        onJoinRace={handleJoinRace}
        onBrewPotion={handleBrewPotion}
        leaderboardRows={leaderboardRows}
        leaderboardLoading={leaderboardLoading}
        leaderboardError={leaderboardError}
      />
    </>
  );
}
