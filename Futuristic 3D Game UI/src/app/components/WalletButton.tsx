import { motion } from "motion/react";
import { Wallet, Sparkles } from "lucide-react";
import { useState } from "react";

export function WalletButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  const handleClick = () => {
    setIsConnected(!isConnected);
    // Trigger particle burst
    setParticles([...Array(12)].map((_, i) => i));
    setTimeout(() => setParticles([]), 1000);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        className="relative px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold text-lg overflow-hidden group"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
          boxShadow: "0 0 30px rgba(168,85,247,0.6), inset 0 0 20px rgba(255,255,255,0.1)",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isConnected 
            ? ["0 0 30px rgba(34,197,94,0.6)", "0 0 50px rgba(34,197,94,0.8)", "0 0 30px rgba(34,197,94,0.6)"]
            : ["0 0 30px rgba(168,85,247,0.6)", "0 0 50px rgba(168,85,247,0.8)", "0 0 30px rgba(168,85,247,0.6)"],
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Pixel grid overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.5) 4px, rgba(255,255,255,0.5) 5px),
                              repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.5) 4px, rgba(255,255,255,0.5) 5px)`
          }}
        />

        <div className="relative flex items-center gap-3">
          <motion.div
            animate={{
              rotate: isConnected ? [0, 360] : 0,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            {isConnected ? (
              <Sparkles className="w-6 h-6" />
            ) : (
              <Wallet className="w-6 h-6" />
            )}
          </motion.div>
          <span className="tracking-wider">
            {isConnected ? "WALLET CONNECTED" : "CONNECT WALLET"}
          </span>
        </div>

        {/* Glow on hover */}
        <motion.div
          className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Particle burst on click */}
      {particles.map((i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full"
            style={{
              left: "50%",
              top: "50%",
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: Math.cos(angle) * 80,
              y: Math.sin(angle) * 80,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}
