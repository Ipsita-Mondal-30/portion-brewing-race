"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Award, Zap, Loader2 } from "lucide-react";

function formatScore(score) {
  if (typeof score === "bigint") {
    if (score > BigInt(Number.MAX_SAFE_INTEGER)) {
      return `${score.toString()} power`;
    }
    return `${Number(score).toLocaleString()} power`;
  }
  const n = Number(score);
  return Number.isFinite(n) ? `${n.toLocaleString()} power` : `${String(score)} power`;
}

function rankIcon(rank) {
  switch (rank) {
    case 1:
      return <Trophy className="h-6 w-6 text-yellow-400" />;
    case 2:
      return <Medal className="h-6 w-6 text-gray-300" />;
    case 3:
      return <Award className="h-6 w-6 text-orange-400" />;
    default:
      return <span className="font-bold text-gray-500">#{rank}</span>;
  }
}

function rankColor(rank) {
  switch (rank) {
    case 1:
      return "from-yellow-500/20 to-orange-500/20 border-yellow-500/50";
    case 2:
      return "from-gray-400/20 to-gray-600/20 border-gray-400/50";
    case 3:
      return "from-orange-500/20 to-amber-600/20 border-orange-500/50";
    default:
      return "from-purple-500/10 to-blue-500/10 border-purple-500/30";
  }
}

/**
 * @param {{
 *   highlightAddress?: string | null;
 *   rows: Array<{
 *     rank: number;
 *     address: string;
 *     score: bigint;
 *     avatar: string;
 *     displayName: string;
 *     submitted: boolean;
 *   }>;
 *   loading?: boolean;
 *   error?: string | null;
 * }} props
 */
export default function Leaderboard({ highlightAddress, rows = [], loading = false, error = null }) {
  const you = highlightAddress?.toLowerCase() ?? "";
  const displayRows = rows.slice(0, 15);

  return (
    <motion.div
      className="w-full max-w-sm overflow-hidden border-4 border-purple-500/30 bg-black/60 p-6 backdrop-blur-lg sm:w-96"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
        boxShadow:
          "0 0 40px rgba(168,85,247,0.3), inset 0 0 30px rgba(168,85,247,0.1)",
      }}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="relative mb-6">
        <motion.div
          className="absolute -inset-4 bg-purple-500/20 blur-xl"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <h2
          className="relative bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-center text-2xl font-bold text-transparent"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          LEADERBOARD
        </h2>
        <p
          className="relative mt-1 text-center text-[10px] tracking-wide text-purple-400/80"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Ranked by on-chain power
        </p>
        <div className="mt-2 h-1 w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      </div>

      {error && (
        <p className="mb-3 border border-red-500/40 bg-red-950/40 p-2 text-center text-xs text-red-200" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          {error}
        </p>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-purple-300">
          <Loader2 className="h-10 w-10 animate-spin text-purple-400" />
          <span className="text-xs" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Syncing chain…
          </span>
        </div>
      )}

      {!loading && displayRows.length === 0 && !error && (
        <p className="py-10 text-center text-sm text-gray-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          No racers on-chain yet. Join the race to appear here.
        </p>
      )}

      {!loading && displayRows.length > 0 && (
        <div className="space-y-3">
          {displayRows.map((player, index) => {
            const isYou = player.address === you;
            return (
              <motion.div
                key={player.address}
                className={`group relative overflow-hidden border-2 bg-gradient-to-r p-3 ${rankColor(player.rank)} ${
                  isYou ? "ring-2 ring-emerald-400/70 ring-offset-2 ring-offset-black/40" : ""
                }`}
                style={{
                  clipPath:
                    "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)",
                }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 + index * 0.06 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    player.rank <= 3
                      ? "0 0 20px rgba(251,191,36,0.5)"
                      : "0 0 15px rgba(168,85,247,0.5)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 3px),
                  repeating-linear-gradient(90deg, transparent, transparent 2px, white 2px, white 3px)`,
                  }}
                />

                {player.rank <= 3 && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                <div className="relative flex items-center gap-4">
                  <div className="flex w-8 flex-shrink-0 items-center justify-center">
                    <motion.div
                      whileHover={{ rotate: player.rank <= 3 ? 360 : 0, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      {rankIcon(player.rank)}
                    </motion.div>
                  </div>

                  <motion.div
                    className="relative text-3xl"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center border-2 border-white/30 bg-gradient-to-br from-purple-600 to-blue-600"
                      style={{ imageRendering: "pixelated" }}
                    >
                      {player.avatar}
                    </div>
                  </motion.div>

                  <div className="min-w-0 flex-1">
                    <div
                      className="truncate text-sm font-bold text-white"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      {player.displayName}
                      {isYou && (
                        <span className="ml-2 text-[10px] font-normal text-emerald-400">(you)</span>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-purple-300">{formatScore(player.score)}</span>
                      {player.submitted && (
                        <span className="flex items-center gap-1 text-xs text-orange-400">
                          <Zap className="h-3 w-3" />
                          brewed
                        </span>
                      )}
                    </div>
                  </div>

                  {player.rank <= 3 && (
                    <motion.div
                      className={`px-2 py-1 text-xs font-bold text-black ${
                        player.rank === 1 ? "bg-yellow-500" : player.rank === 2 ? "bg-gray-400" : "bg-orange-500"
                      }`}
                      style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "8px" }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      TOP {player.rank}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <motion.div
        className="mt-6 border-t-2 border-purple-500/30 pt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="font-mono text-xs text-purple-300">
          🎮{" "}
          <span className="font-bold text-white">
            {loading ? "…" : rows.length.toLocaleString()}
          </span>{" "}
          {rows.length === 1 ? "racer" : "racers"} on-chain
        </div>
      </motion.div>
    </motion.div>
  );
}
