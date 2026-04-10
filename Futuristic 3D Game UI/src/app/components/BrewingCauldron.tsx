import { motion } from "motion/react";

export function BrewingCauldron() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow effect */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-purple-600/30 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cauldron container */}
      <div className="relative" style={{ perspective: "1000px" }}>
        <motion.div
          className="relative"
          animate={{
            rotateY: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Cauldron body - voxel style */}
          <div className="relative w-64 h-64">
            {/* Main body */}
            <div className="absolute inset-x-8 top-16 bottom-0 bg-gradient-to-b from-gray-700 to-gray-900 border-4 border-gray-800 shadow-2xl"
              style={{
                clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)"
              }}
            >
              {/* Voxel texture effect */}
              <div className="absolute inset-0 opacity-20" 
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(0,0,0,0.3) 8px, rgba(0,0,0,0.3) 10px),
                                    repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.3) 8px, rgba(0,0,0,0.3) 10px)`
                }}
              />
            </div>

            {/* Bubbling potion liquid */}
            <motion.div
              className="absolute inset-x-10 top-20 h-32 bg-gradient-to-b from-purple-400 via-purple-600 to-purple-800 border-4 border-purple-900"
              animate={{
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Bubble particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-purple-300 rounded-full"
                  style={{
                    left: `${20 + i * 10}%`,
                    bottom: 0,
                  }}
                  animate={{
                    y: [-80, -120],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>

            {/* Magical smoke */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(168,85,247,0) 70%)",
                  }}
                  animate={{
                    y: [0, -80],
                    x: [0, (i % 2 === 0 ? 20 : -20)],
                    opacity: [0.6, 0],
                    scale: [0.5, 2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            {/* Sparks */}
            {[...Array(12)].map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const radius = 100;
              return (
                <motion.div
                  key={`spark-${i}`}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                  animate={{
                    x: [0, Math.cos(angle) * radius],
                    y: [0, Math.sin(angle) * radius],
                    opacity: [1, 0],
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut",
                  }}
                />
              );
            })}
          </div>

          {/* Floating ingredients around cauldron */}
          {[
            { emoji: "🌿", angle: 0, color: "text-green-400" },
            { emoji: "💎", angle: 120, color: "text-blue-400" },
            { emoji: "⚗️", angle: 240, color: "text-purple-400" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className={`absolute ${item.color} text-4xl`}
              style={{
                left: "50%",
                top: "50%",
                transformOrigin: "center",
              }}
              animate={{
                rotate: [item.angle, item.angle + 360],
                x: Math.cos((item.angle * Math.PI) / 180) * 150,
                y: Math.sin((item.angle * Math.PI) / 180) * 150,
              }}
              transition={{
                rotate: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                },
                x: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                },
                y: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                style={{ filter: "drop-shadow(0 0 10px currentColor)" }}
              >
                {item.emoji}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Arena title */}
      <motion.div
        className="absolute -bottom-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          BREWING ARENA
        </h2>
      </motion.div>
    </div>
  );
}
