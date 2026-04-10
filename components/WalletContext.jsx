"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BrowserProvider } from "ethers";
import {
  brewPotion,
  checkNetwork,
  CONTRACT_ADDRESS,
  fetchLeaderboardFromChain,
  formatContractError,
  getPotionRaceContract,
  joinRace,
} from "@/lib/contract";

const WalletContext = createContext(null);

/** One shared in-flight connect; stops duplicate eth_requestAccounts (-32002) from Navbar + hero, double-clicks, etc. */
let connectWalletPromise = null;

function rpcNestedCode(err) {
  const inner =
    err && typeof err === "object" && "error" in err && err.error && typeof err.error === "object"
      ? err.error
      : null;
  return inner?.code;
}

export function WalletProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [signer, setSigner] = useState(null);
  const [loadingConnect, setLoadingConnect] = useState(false);
  const [loadingJoin, setLoadingJoin] = useState(false);
  const [loadingBrew, setLoadingBrew] = useState(false);
  const [txStatus, setTxStatus] = useState({ type: null, message: "" });
  const [leaderboardRows, setLeaderboardRows] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [leaderboardError, setLeaderboardError] = useState(null);

  const refreshSigner = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) return;
    const provider = new BrowserProvider(window.ethereum);
    const list = await provider.listAccounts();
    if (list.length === 0) {
      setSigner(null);
      setAddress(null);
      return;
    }
    const nextSigner = await provider.getSigner();
    const addr = await nextSigner.getAddress();
    setSigner(nextSigner);
    setAddress(addr);
  }, []);

  const refreshLeaderboard = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      setLeaderboardRows([]);
      setLeaderboardLoading(false);
      setLeaderboardError(null);
      return;
    }
    setLeaderboardLoading(true);
    setLeaderboardError(null);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const rows = await fetchLeaderboardFromChain(provider);
      setLeaderboardRows(rows);
    } catch (e) {
      console.error("fetchLeaderboardFromChain", e);
      setLeaderboardError(formatContractError(e));
      setLeaderboardRows([]);
    } finally {
      setLeaderboardLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return undefined;

    const ethereum = window.ethereum;

    const onAccounts = (accs) => {
      if (!accs?.length) {
        setSigner(null);
        setAddress(null);
        return;
      }
      refreshSigner();
    };

    const onChain = () => {
      refreshSigner();
      refreshLeaderboard();
    };

    ethereum.on?.("accountsChanged", onAccounts);
    ethereum.on?.("chainChanged", onChain);
    refreshSigner();
    refreshLeaderboard();

    return () => {
      ethereum.removeListener?.("accountsChanged", onAccounts);
      ethereum.removeListener?.("chainChanged", onChain);
    };
  }, [refreshSigner, refreshLeaderboard]);

  const logPlayersData = useCallback(async (playerAddress) => {
    if (!playerAddress || typeof window === "undefined" || !window.ethereum) return;
    try {
      const provider = new BrowserProvider(window.ethereum);
      const contract = getPotionRaceContract(provider);
      const data = await contract.players(playerAddress);
      console.log(data);
    } catch (err) {
      console.error("contract.players(address):", err);
    }
  }, []);

  useEffect(() => {
    logPlayersData(address);
  }, [address, logPlayersData]);

  const connectWallet = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      setTxStatus({
        type: "error",
        message: "MetaMask (or another injected wallet) was not found. Install MetaMask to connect.",
      });
      return;
    }

    if (connectWalletPromise) {
      return connectWalletPromise;
    }

    setLoadingConnect(true);
    setTxStatus({ type: null, message: "" });

    connectWalletPromise = (async () => {
      try {
        const provider = new BrowserProvider(window.ethereum);

        // No popup: MetaMask already authorized this origin (refresh, state reset, etc.)
        const already = await provider.send("eth_accounts", []);
        if (already?.length) {
          const nextSigner = await provider.getSigner();
          const addr = await nextSigner.getAddress();
          setSigner(nextSigner);
          setAddress(addr);
          setTxStatus({ type: "success", message: `Connected: ${addr.slice(0, 6)}…${addr.slice(-4)}` });
          return;
        }

        try {
          await provider.send("eth_requestAccounts", []);
        } catch (err) {
          if (rpcNestedCode(err) === -32002 || /** @type {{ code?: number }} */ (err).code === -32002) {
            const after = await provider.send("eth_accounts", []);
            if (after?.length) {
              const nextSigner = await provider.getSigner();
              const addr = await nextSigner.getAddress();
              setSigner(nextSigner);
              setAddress(addr);
              setTxStatus({ type: "success", message: `Connected: ${addr.slice(0, 6)}…${addr.slice(-4)}` });
              return;
            }
          }
          setTxStatus({ type: "error", message: formatContractError(err) });
          return;
        }

        const nextSigner = await provider.getSigner();
        const addr = await nextSigner.getAddress();
        setSigner(nextSigner);
        setAddress(addr);
        setTxStatus({ type: "success", message: `Connected: ${addr.slice(0, 6)}…${addr.slice(-4)}` });
      } catch (err) {
        setTxStatus({ type: "error", message: formatContractError(err) });
      } finally {
        connectWalletPromise = null;
        setLoadingConnect(false);
      }
    })();

    return connectWalletPromise;
  }, []);

  const disconnectWallet = useCallback(async () => {
    setSigner(null);
    setAddress(null);
    setTxStatus({ type: null, message: "" });
    if (typeof window !== "undefined" && window.ethereum?.request) {
      try {
        await window.ethereum.request({
          method: "wallet_revokePermissions",
          params: [{ eth_accounts: {} }],
        });
      } catch {
        // Wallet may not support revoke; local state is already cleared.
      }
    }
    await refreshLeaderboard();
  }, [refreshLeaderboard]);

  const handleJoinRace = useCallback(async () => {
    if (!signer) {
      setTxStatus({ type: "error", message: "Connect your wallet first, alchemist." });
      return;
    }
    if (!CONTRACT_ADDRESS) {
      setTxStatus({
        type: "error",
        message: "Set NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local to call joinRace on your deployed contract.",
      });
      return;
    }

    setLoadingJoin(true);
    setTxStatus({ type: "pending", message: "Confirm the race entry in your wallet…" });

    try {
      await checkNetwork();
      const tx = await joinRace(signer);
      setTxStatus({
        type: "pending",
        message: `Transaction sent: ${tx.hash.slice(0, 10)}… — waiting for confirmation`,
      });
      await tx.wait(1);
      setTxStatus({ type: "success", message: "You joined the potion brewing race on-chain." });
      await logPlayersData(await signer.getAddress());
      await refreshLeaderboard();
    } catch (err) {
      setTxStatus({ type: "error", message: formatContractError(err) });
    } finally {
      setLoadingJoin(false);
    }
  }, [signer, logPlayersData, refreshLeaderboard]);

  const handleBrewPotion = useCallback(async () => {
    if (!signer) {
      setTxStatus({ type: "error", message: "Connect your wallet to brew." });
      return;
    }
    if (!CONTRACT_ADDRESS) {
      setTxStatus({
        type: "error",
        message: "Set NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local to call brewPotion on your deployed contract.",
      });
      return;
    }

    setLoadingBrew(true);
    setTxStatus({ type: "pending", message: "Confirm the brew spell in your wallet…" });

    try {
      await checkNetwork();
      const tx = await brewPotion(signer);
      setTxStatus({
        type: "pending",
        message: `Brewing tx: ${tx.hash.slice(0, 10)}… — waiting for confirmation`,
      });
      await tx.wait(1);
      setTxStatus({ type: "success", message: "Potion brewed successfully. Your recipe hit the chain." });
      await logPlayersData(await signer.getAddress());
      await refreshLeaderboard();
    } catch (err) {
      setTxStatus({ type: "error", message: formatContractError(err) });
    } finally {
      setLoadingBrew(false);
    }
  }, [signer, logPlayersData, refreshLeaderboard]);

  const dismissTx = useCallback(() => {
    setTxStatus({ type: null, message: "" });
  }, []);

  const value = useMemo(
    () => ({
      address,
      signer,
      loadingConnect,
      loadingJoin,
      loadingBrew,
      txStatus,
      leaderboardRows,
      leaderboardLoading,
      leaderboardError,
      connectWallet,
      disconnectWallet,
      handleJoinRace,
      handleBrewPotion,
      dismissTx,
      refreshLeaderboard,
    }),
    [
      address,
      signer,
      loadingConnect,
      loadingJoin,
      loadingBrew,
      txStatus,
      leaderboardRows,
      leaderboardLoading,
      leaderboardError,
      connectWallet,
      disconnectWallet,
      handleJoinRace,
      handleBrewPotion,
      dismissTx,
      refreshLeaderboard,
    ]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used inside WalletProvider");
  }
  return ctx;
}
