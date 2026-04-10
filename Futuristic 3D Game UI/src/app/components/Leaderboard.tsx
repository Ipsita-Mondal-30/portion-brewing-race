import { motion } from "motion/react";
import { Trophy, Medal, Award, Zap } from "lucide-react";

interface Player {
  rank: number;
  name: string;
  score: number;
  avatar: string;
  streak: number;
}

const mockPlayers: Player[] = [
  { rank: 1, name: "CryptoWizard", score: 15420, avatar: "🧙‍♂️", streak: 12 },
  { rank: 2, name: "PotionMaster", score: 14850, avatar: "🧪", streak: 8 },
  { rank: 3, name: "AlchemyKing", score: 13990, avatar: "👑", streak: 15 },
  { rank: 4, name: "BrewLegend", score: 12340, avatar: "⚡", streak: 6 },
  { rank: 5, name: "MixMaster", score: 11200, avatar: "🔮", streak: 9 },
];

export function Leaderboard() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-400" />;
      default:
        return <span className="text-gray-500 font-bold">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
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
  };

  return (
    <motion.div
      className="w-96 bg-black/60 backdrop-blur-lg border-4 border-purple-500/30 p-6 overflow-hidden"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
        boxShadow: "0 0 40px rgba(168,85,247,0.3), inset 0 0 30px rgba(168,85,247,0.1)",
      }}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {/* Header */}
      <div className="mb-6 relative">
        <motion.div
          className="absolute -inset-4 bg-purple-500/20 blur-xl"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        <h2 
          className="text-2xl font-bold text-center relative bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          LEADERBOARD
        </h2>
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-2" />
      </div>

      {/* Player list */}
      <div className="space-y-3">
        {mockPlayers.map((player, index) => (
          <motion.div
            key={player.rank}
            className={`relative bg-gradient-to-r ${getRankColor(player.rank)} border-2 p-3 overflow-hidden group`}
            style={{
              clipPath: "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)",
            }}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ 
              scale: 1.03,
              boxShadow: player.rank <= 3 
                ? "0 0 20px rgba(251,191,36,0.5)"
                : "0 0 15px rgba(168,85,247,0.5)",
            }}
          >
            {/* Pixel texture */}
            <div className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 3px),
                                  repeating-linear-gradient(90deg, transparent, transparent 2px, white 2px, white 3px)`
              }}
            />

            {/* Animated glow for top 3 */}
            {player.rank <= 3 && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            )}

            <div className="relative flex items-center gap-4">
              {/* Rank icon */}
              <div className="flex-shrink-0 w-8 flex items-center justify-center">
                <motion.div
                  whileHover={{ rotate: player.rank <= 3 ? 360 : 0, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {getRankIcon(player.rank)}
                </motion.div>
              </div>

              {/* Avatar */}
              <motion.div 
                className="text-3xl relative"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <div 
                  className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 border-2 border-white/30"
                  style={{ imageRendering: "pixelated" }}
                >
                  {player.avatar}
                </div>
              </motion.div>

              {/* Player info */}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-sm truncate"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {player.name}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-purple-300 font-mono">
                    {player.score.toLocaleString()} pts
                  </span>
                  {player.streak > 5 && (
                    <span className="flex items-center gap-1 text-xs text-orange-400">
                      <Zap className="w-3 h-3" />
                      {player.streak}
                    </span>
                  )}
                </div>
              </div>

              {/* Rank badge */}
              {player.rank <= 3 && (
                <motion.div
                  className={`text-xs font-bold px-2 py-1 ${
                    player.rank === 1 ? "bg-yellow-500" :
                    player.rank === 2 ? "bg-gray-400" :
                    "bg-orange-500"
                  } text-black`}
                  style={{ 
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: "8px",
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  TOP {player.rank}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer stats */}
      <motion.div 
        className="mt-6 pt-4 border-t-2 border-purple-500/30 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="text-xs text-purple-300 font-mono">
          🎮 <span className="text-white font-bold">2,847</span> Players Racing
        </div>
      </motion.div>
    </motion.div>
  );
}
