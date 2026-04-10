"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Gamepad2, FileEdit, Sparkles } from "lucide-react";
import { useWallet } from "@/components/WalletContext";

const clip =
  "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)";

export default function WelcomeScreen() {
  const { address, connectWallet, disconnectWallet, loadingConnect } = useWallet();
  const connected = Boolean(address);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#0f0f0f] via-[#141118] to-[#0a0a0a] pb-16 pt-[5.5rem] sm:pt-24">
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(168,85,247,0.25) 0%, transparent 45%), radial-gradient(circle at 70% 80%, rgba(6,182,212,0.15) 0%, transparent 40%)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 border border-purple-500/40 bg-purple-500/10 px-4 py-1.5"
          style={{ clipPath: clip }}
        >
          <Sparkles className="h-4 w-4 text-purple-300" />
          <span className="text-xs tracking-[0.2em] text-purple-200" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            WELCOME, ALCHEMIST
          </span>
        </motion.div>

        <motion.h1
          className="mb-4 text-2xl font-bold leading-snug sm:text-4xl md:text-5xl"
          style={{ fontFamily: "'Press Start 2P', cursive", textShadow: "0 0 24px rgba(168,85,247,0.5)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
            POTION BREWING RACE
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mb-10 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Connect your wallet to compete on-chain, climb the power leaderboard, then tell us your brew style on the
          registration form.
        </motion.p>

        <motion.div
          className="mb-12 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          {connected ? (
            <>
              <motion.button
                type="button"
                onClick={disconnectWallet}
                className="border border-rose-500/50 bg-rose-950/50 px-8 py-4 text-sm font-bold text-rose-100"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  clipPath: clip,
                  boxShadow: "0 0 24px rgba(244,63,94,0.35)",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Disconnect wallet
              </motion.button>
              <motion.span
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-xs text-emerald-400"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                You are ready to enter the arena.
              </motion.span>
            </>
          ) : (
            <motion.button
              type="button"
              onClick={connectWallet}
              disabled={loadingConnect}
              className="relative overflow-hidden px-8 py-4 text-sm font-bold text-white disabled:opacity-60"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                clipPath: clip,
                boxShadow: "0 0 32px rgba(168,85,247,0.45)",
              }}
              whileHover={{ scale: loadingConnect ? 1 : 1.02 }}
              whileTap={{ scale: loadingConnect ? 1 : 0.98 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
              <span className="relative">{loadingConnect ? "Connecting…" : "Connect wallet"}</span>
            </motion.button>
          )}
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/game" className="group block">
            <motion.div
              className="h-full border-2 border-cyan-500/40 bg-black/50 p-6 text-left backdrop-blur-md transition-colors hover:border-cyan-400/70"
              style={{ clipPath: clip, boxShadow: "0 0 24px rgba(6,182,212,0.15)" }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              whileHover={{ y: -4 }}
            >
              <Gamepad2 className="mb-3 h-8 w-8 text-cyan-400" />
              <h2 className="mb-2 text-lg text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Play — Arena
              </h2>
              <p className="mb-4 text-xs text-gray-400">
                Join the race, brew potions, view the on-chain leaderboard.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300">
                Launch game <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.div>
          </Link>

          <Link href="/form" className="group block">
            <motion.div
              className="h-full border-2 border-orange-500/40 bg-black/50 p-6 text-left backdrop-blur-md transition-colors hover:border-orange-400/70"
              style={{ clipPath: clip, boxShadow: "0 0 24px rgba(251,146,60,0.15)" }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -4 }}
            >
              <FileEdit className="mb-3 h-8 w-8 text-orange-400" />
              <h2 className="mb-2 text-lg text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Alchemist form
              </h2>
              <p className="mb-4 text-xs text-gray-400">
                Register your display name, brew focus, and notes for the season.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-orange-300">
                Open form <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.div>
          </Link>
        </div>

        {!connected && (
          <p className="mt-10 text-[11px] text-gray-500" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Tip: Connect wallet on this page or from the top bar on any page.
          </p>
        )}
      </div>
    </div>
  );
}
