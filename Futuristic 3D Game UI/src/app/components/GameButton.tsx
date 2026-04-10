import { motion } from "motion/react";
import { ReactNode, useState } from "react";

interface GameButtonProps {
  children: ReactNode;
  variant?: "primary" | "success" | "warning";
  icon?: ReactNode;
  onClick?: () => void;
  animated?: boolean;
}

export function GameButton({ 
  children, 
  variant = "primary", 
  icon,
  onClick,
  animated = false,
}: GameButtonProps) {
  const [particles, setParticles] = useState<number[]>([]);

  const handleClick = () => {
    onClick?.();
    // Particle burst
    setParticles([...Array(8)].map((_, i) => i));
    setTimeout(() => setParticles([]), 800);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return {
          gradient: "from-green-500 via-emerald-500 to-green-600",
          glow: "rgba(34,197,94,0.6)",
          glowHover: "rgba(34,197,94,0.9)",
        };
      case "warning":
        return {
          gradient: "from-orange-500 via-amber-500 to-orange-600",
          glow: "rgba(251,146,60,0.6)",
          glowHover: "rgba(251,146,60,0.9)",
        };
      default:
        return {
          gradient: "from-blue-500 via-cyan-500 to-blue-600",
          glow: "rgba(59,130,246,0.6)",
          glowHover: "rgba(59,130,246,0.9)",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        className={`relative px-6 py-3 bg-gradient-to-r ${styles.gradient} text-white font-bold text-base overflow-hidden group border-4 border-black/30`}
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "10px",
          letterSpacing: "1px",
          imageRendering: "pixelated",
          boxShadow: `0 8px 0 rgba(0,0,0,0.3), 0 0 20px ${styles.glow}`,
        }}
        whileHover={{ 
          y: -2,
          boxShadow: `0 10px 0 rgba(0,0,0,0.3), 0 0 30px ${styles.glowHover}`,
        }}
        whileTap={{ 
          y: 4,
          boxShadow: `0 4px 0 rgba(0,0,0,0.3), 0 0 15px ${styles.glow}`,
        }}
      >
        {/* Pixel grid texture */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px),
                              repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px)`
          }}
        />

        {/* Animated shine */}
        {animated && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent"
            animate={{
              y: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        <div className="relative flex items-center gap-3 justify-center">
          {icon && (
            <motion.div
              animate={animated ? {
                y: [0, -3, 0],
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {icon}
            </motion.div>
          )}
          <span>{children}</span>
        </div>

        {/* Glow overlay on hover */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
      </motion.button>

      {/* Particle burst */}
      {particles.map((i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const distance = 60;
        return (
          <motion.div
            key={i}
            className={`absolute w-1.5 h-1.5 ${
              variant === "success" ? "bg-green-400" :
              variant === "warning" ? "bg-orange-400" :
              "bg-cyan-400"
            }`}
            style={{
              left: "50%",
              top: "50%",
            }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}
