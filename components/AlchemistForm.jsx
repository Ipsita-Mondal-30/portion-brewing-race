"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { useWallet } from "@/components/WalletContext";

const clip =
  "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)";

export default function AlchemistForm() {
  const { address, connectWallet, loadingConnect } = useWallet();
  const [displayName, setDisplayName] = useState("");
  const [brewFocus, setBrewFocus] = useState("speed");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      displayName,
      brewFocus,
      notes,
      wallet: address ?? null,
      at: new Date().toISOString(),
    };
    console.log("Alchemist form (demo — hook to your API):", payload);
    setSubmitted(true);
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#0f0f0f] via-[#111] to-[#0a0a0a] pb-20 pt-[5.5rem] sm:pt-24">
      <div
        className="pointer-events-none fixed inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(251,146,60,0.12) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-lg px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1
            className="mb-2 text-xl font-bold sm:text-2xl"
            style={{ fontFamily: "'Press Start 2P', cursive", lineHeight: 1.6 }}
          >
            <span className="bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text text-transparent">
              ALCHEMIST
            </span>
            <br />
            <span className="text-gray-200">REGISTRATION</span>
          </h1>
          <p className="text-xs text-gray-500" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Demo form — data logs to the browser console. Wire to your backend when ready.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="border-2 border-orange-500/35 bg-black/55 p-6 shadow-[0_0_32px_rgba(251,146,60,0.12)] backdrop-blur-md sm:p-8"
          style={{ clipPath: clip }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="mb-5">
            <label
              className="mb-1.5 block text-xs font-bold tracking-wide text-orange-200/90"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
              htmlFor="displayName"
            >
              Display name
            </label>
            <input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              className="w-full border-2 border-white/15 bg-black/60 px-4 py-3 text-sm text-white outline-none ring-0 transition-colors focus:border-orange-400/60"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
              placeholder="e.g. CryptoWizard"
              autoComplete="nickname"
            />
          </div>

          <div className="mb-5">
            <label
              className="mb-1.5 block text-xs font-bold tracking-wide text-orange-200/90"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
              htmlFor="brewFocus"
            >
              Brew focus
            </label>
            <select
              id="brewFocus"
              value={brewFocus}
              onChange={(e) => setBrewFocus(e.target.value)}
              className="w-full border-2 border-white/15 bg-black/60 px-4 py-3 text-sm text-white outline-none focus:border-orange-400/60"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <option value="speed">Speed — first to finish</option>
              <option value="power">Power — max cauldron strength</option>
              <option value="balanced">Balanced — mix of both</option>
            </select>
          </div>

          <div className="mb-5">
            <label
              className="mb-1.5 block text-xs font-bold tracking-wide text-orange-200/90"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
              htmlFor="notes"
            >
              Notes for the guild
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full resize-y border-2 border-white/15 bg-black/60 px-4 py-3 text-sm text-white outline-none focus:border-orange-400/60"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
              placeholder="Strategy, favorite ingredients, team name…"
            />
          </div>

          <div className="mb-6 rounded border border-white/10 bg-white/5 p-4">
            <p className="mb-2 text-[10px] uppercase tracking-wider text-gray-500" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Linked wallet
            </p>
            {address ? (
              <p className="break-all font-mono text-xs text-emerald-300">{address}</p>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs text-gray-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  No wallet connected — optional for this demo.
                </span>
                <button
                  type="button"
                  onClick={connectWallet}
                  disabled={loadingConnect}
                  className="border border-purple-500/50 bg-purple-600/20 px-3 py-2 text-xs font-bold text-purple-200 hover:bg-purple-600/30 disabled:opacity-50"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {loadingConnect ? "…" : "Connect"}
                </button>
              </div>
            )}
          </div>

          <motion.button
            type="submit"
            className="flex w-full items-center justify-center gap-2 border-2 border-orange-400/50 bg-gradient-to-r from-orange-600 to-amber-600 py-4 text-sm font-bold text-white"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "10px" }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Send className="h-4 w-4" />
            Submit registration
          </motion.button>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center justify-center gap-2 border border-emerald-500/40 bg-emerald-950/50 py-3 text-xs text-emerald-200"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              Saved locally — check the console for the payload.
            </motion.div>
          )}
        </motion.form>
      </div>
    </div>
  );
}
