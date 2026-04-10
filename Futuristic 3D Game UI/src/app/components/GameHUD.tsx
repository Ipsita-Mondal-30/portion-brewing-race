import { motion } from "motion/react";
import { Coins, Flame, Star, Users } from "lucide-react";

export function GameHUD() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-start justify-between">
          {/* Left HUD - Player Stats */}
          <motion.div 
            className="bg-black/70 backdrop-blur-md border-2 border-cyan-500/50 p-4 pointer-events-auto"
            style={{
              clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              boxShadow: "0 0 20px rgba(6,182,212,0.3), inset 0 0 15px rgba(6,182,212,0.1)",
            }}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-3">
              {/* Player level */}
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-lg border-2 border-white/30"
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(6,182,212,0.5)",
                      "0 0 20px rgba(6,182,212,0.8)",
                      "0 0 10px rgba(6,182,212,0.5)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  ⚡
                </motion.div>
                <div>
                  <div 
                    className="text-xs text-cyan-400"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    LEVEL
                  </div>
                  <div 
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "12px" }}
                  >
                    42
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-2">
                <StatItem icon={<Coins className="w-4 h-4" />} label="COINS" value="1,247" color="text-yellow-400" />
                <StatItem icon={<Flame className="w-4 h-4" />} label="STREAK" value="12" color="text-orange-400" />
                <StatItem icon={<Star className="w-4 h-4" />} label="RANK" value="#8" color="text-purple-400" />
                <StatItem icon={<Users className="w-4 h-4" />} label="WINS" value="34" color="text-green-400" />
              </div>
            </div>
          </motion.div>

          {/* Right HUD - Game Title */}
          <motion.div
            className="text-center pointer-events-auto"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{ 
                fontFamily: "'Press Start 2P', cursive",
                textShadow: "0 0 20px rgba(168,85,247,0.8), 0 0 40px rgba(168,85,247,0.5), 4px 4px 0 rgba(0,0,0,0.5)",
              }}
              animate={{
                textShadow: [
                  "0 0 20px rgba(168,85,247,0.8), 0 0 40px rgba(168,85,247,0.5), 4px 4px 0 rgba(0,0,0,0.5)",
                  "0 0 30px rgba(168,85,247,1), 0 0 60px rgba(168,85,247,0.7), 4px 4px 0 rgba(0,0,0,0.5)",
                  "0 0 20px rgba(168,85,247,0.8), 0 0 40px rgba(168,85,247,0.5), 4px 4px 0 rgba(0,0,0,0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                POTION
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                BREWING
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                RACE
              </span>
            </motion.h1>
            <motion.div
              className="inline-block px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs border-2 border-white/30"
              style={{ 
                fontFamily: "'Orbitron', sans-serif",
                boxShadow: "0 0 15px rgba(168,85,247,0.6)",
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              BLOCKCHAIN POWERED
            </motion.div>
          </motion.div>

          {/* Timer/Season Info */}
          <motion.div
            className="bg-black/70 backdrop-blur-md border-2 border-purple-500/50 p-4 pointer-events-auto"
            style={{
              clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
              boxShadow: "0 0 20px rgba(168,85,247,0.3), inset 0 0 15px rgba(168,85,247,0.1)",
            }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center">
              <div 
                className="text-xs text-purple-400 mb-2"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                SEASON 3
              </div>
              <motion.div
                className="text-2xl font-bold text-white font-mono"
                animate={{
                  color: ["#ffffff", "#a855f7", "#ffffff"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                05:42:18
              </motion.div>
              <div className="text-xs text-gray-400 mt-1">
                Time Remaining
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

function StatItem({ icon, label, value, color }: StatItemProps) {
  return (
    <motion.div 
      className="bg-black/50 p-2 border border-white/10"
      whileHover={{ 
        scale: 1.05,
        borderColor: "rgba(255,255,255,0.3)",
      }}
    >
      <div className={`flex items-center gap-1 ${color} mb-1`}>
        {icon}
        <span className="text-xs" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "9px" }}>
          {label}
        </span>
      </div>
      <div 
        className="text-white font-bold"
        style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "10px" }}
      >
        {value}
      </div>
    </motion.div>
  );
}
