"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  Flame,
  Coins,
  Star,
  Users,
  Loader2,
  CheckCircle2,
  Gamepad2,
  FlaskConical,
  Shield,
  Link2,
} from "lucide-react";
import { useEffect, useState } from "react";
import Leaderboard from "@/components/Leaderboard";

/* ——— Background: floating voxels ——— */
function VoxelBackground() {
  const [cubes, setCubes] = useState([]);

  useEffect(() => {
    const colors = [
      "rgba(168,85,247,0.15)",
      "rgba(59,130,246,0.15)",
      "rgba(34,197,94,0.15)",
      "rgba(236,72,153,0.15)",
    ];
    const next = [];
    for (let i = 0; i < 15; i++) {
      next.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        z: Math.random() * 500 - 250,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 40 + Math.random() * 80,
        rotateX: Math.random() * 360,
        rotateY: Math.random() * 360,
        delay: Math.random() * 5,
      });
    }
    setCubes(next);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ perspective: "1000px" }}>
      {cubes.map((cube) => (
        <motion.div
          key={cube.id}
          className="absolute"
          style={{
            left: `${cube.x}%`,
            top: `${cube.y}%`,
            width: cube.size,
            height: cube.size,
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateX: [cube.rotateX, cube.rotateX + 360],
            rotateY: [cube.rotateY, cube.rotateY + 360],
            z: [cube.z, cube.z + 100, cube.z],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            delay: cube.delay,
            ease: "linear",
          }}
        >
          <div
            className="absolute inset-0 border border-white/20"
            style={{
              backgroundColor: cube.color,
              transform: `translateZ(${cube.size / 2}px)`,
              boxShadow: `0 0 20px ${cube.color}`,
            }}
          />
          <div
            className="absolute inset-0 border border-white/20"
            style={{
              backgroundColor: cube.color,
              transform: `translateZ(-${cube.size / 2}px)`,
            }}
          />
          <div
            className="absolute inset-0 border border-white/20"
            style={{
              backgroundColor: cube.color,
              transform: `rotateY(90deg) translateZ(${cube.size / 2}px)`,
            }}
          />
          <div
            className="absolute inset-0 border border-white/20"
            style={{
              backgroundColor: cube.color,
              transform: `rotateY(-90deg) translateZ(${cube.size / 2}px)`,
            }}
          />
          <div
            className="absolute inset-0 border border-white/20"
            style={{
              backgroundColor: cube.color,
              transform: `rotateX(90deg) translateZ(${cube.size / 2}px)`,
            }}
          />
          <div
            className="absolute inset-0 border border-white/20"
            style={{
              backgroundColor: cube.color,
              transform: `rotateX(-90deg) translateZ(${cube.size / 2}px)`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ——— Ambient particles ——— */
function FloatingParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const types = ["cube", "potion", "crystal", "herb"];
    const next = [];
    for (let i = 0; i < 25; i++) {
      next.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 15 + Math.random() * 10,
      });
    }
    setParticles(next);
  }, []);

  const shape = (type) => {
    switch (type) {
      case "cube":
        return "bg-gradient-to-br from-purple-500 to-pink-500";
      case "potion":
        return "rounded-full bg-gradient-to-br from-green-400 to-emerald-600";
      case "crystal":
        return "rotate-45 bg-gradient-to-br from-blue-400 to-cyan-600";
      case "herb":
        return "rounded-sm bg-gradient-to-br from-yellow-400 to-green-500";
      default:
        return "bg-purple-500";
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute opacity-20 ${shape(p.type)}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.type === "potion" ? "20px" : "16px",
            height: p.type === "potion" ? "24px" : "16px",
            filter: "blur(1px) drop-shadow(0 0 8px currentColor)",
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ——— Center cauldron ——— */
function BrewingCauldron() {
  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className="absolute h-96 w-96 rounded-full bg-purple-600/30 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative" style={{ perspective: "1000px" }}>
        <motion.div
          className="relative"
          animate={{ rotateY: [0, 5, 0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative h-64 w-64">
            <div
              className="absolute inset-x-8 bottom-0 top-16 border-4 border-gray-800 bg-gradient-to-b from-gray-700 to-gray-900 shadow-2xl"
              style={{ clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)" }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(0,0,0,0.3) 8px, rgba(0,0,0,0.3) 10px),
                    repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.3) 8px, rgba(0,0,0,0.3) 10px)`,
                }}
              />
            </div>

            <motion.div
              className="absolute inset-x-10 top-20 h-32 border-4 border-purple-900 bg-gradient-to-b from-purple-400 via-purple-600 to-purple-800"
              animate={{ opacity: [0.7, 0.9, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-purple-300"
                  style={{ left: `${20 + i * 10}%`, bottom: 0 }}
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

            <div className="absolute -top-8 left-1/2 w-32 -translate-x-1/2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 h-12 w-12 -translate-x-1/2 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(168,85,247,0) 70%)",
                  }}
                  animate={{
                    y: [0, -80],
                    x: [0, i % 2 === 0 ? 20 : -20],
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

            {[...Array(12)].map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const radius = 100;
              return (
                <motion.div
                  key={`spark-${i}`}
                  className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-yellow-400"
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

          {[
            { emoji: "🌿", angle: 0, color: "text-green-400" },
            { emoji: "💎", angle: 120, color: "text-blue-400" },
            { emoji: "⚗️", angle: 240, color: "text-purple-400" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className={`absolute text-4xl ${item.color}`}
              style={{ left: "50%", top: "50%", transformOrigin: "center" }}
              animate={{
                rotate: [item.angle, item.angle + 360],
                x: Math.cos((item.angle * Math.PI) / 180) * 150,
                y: Math.sin((item.angle * Math.PI) / 180) * 150,
              }}
              transition={{
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                x: { duration: 10, repeat: Infinity, ease: "linear" },
                y: { duration: 10, repeat: Infinity, ease: "linear" },
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ filter: "drop-shadow(0 0 10px currentColor)" }}
              >
                {item.emoji}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute -bottom-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2
          className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          BREWING ARENA
        </h2>
      </motion.div>
    </div>
  );
}

function StatItem({ icon, label, value, color }) {
  return (
    <motion.div
      className="border border-white/10 bg-black/50 p-2"
      whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.3)" }}
    >
      <div className={`mb-1 flex items-center gap-1 ${color}`}>
        {icon}
        <span className="text-xs" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "9px" }}>
          {label}
        </span>
      </div>
      <div
        className="font-bold text-white"
        style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "10px" }}
      >
        {value}
      </div>
    </motion.div>
  );
}

function GameHUD({ address }) {
  const short = address && address.length > 10 ? `${address.slice(0, 4)}…${address.slice(-3)}` : "—";

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-[56px] z-30 sm:top-[60px]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col items-stretch justify-between gap-4 lg:flex-row lg:items-start">
          <motion.div
            className="pointer-events-none border-2 border-cyan-500/50 bg-black/70 p-4 backdrop-blur-md"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              boxShadow:
                "0 0 20px rgba(6,182,212,0.3), inset 0 0 15px rgba(6,182,212,0.1)",
            }}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <motion.div
                  className="flex h-10 w-10 items-center justify-center border-2 border-white/30 bg-gradient-to-br from-cyan-500 to-blue-600 text-lg"
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(6,182,212,0.5)",
                      "0 0 20px rgba(6,182,212,0.8)",
                      "0 0 10px rgba(6,182,212,0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⚡
                </motion.div>
                <div>
                  <div className="text-xs text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    WALLET
                  </div>
                  <div
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "11px" }}
                  >
                    {short}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <StatItem icon={<Coins className="h-4 w-4" />} label="COINS" value="1,247" color="text-yellow-400" />
                <StatItem icon={<Flame className="h-4 w-4" />} label="STREAK" value="12" color="text-orange-400" />
                <StatItem icon={<Star className="h-4 w-4" />} label="RANK" value="#8" color="text-purple-400" />
                <StatItem icon={<Users className="h-4 w-4" />} label="WINS" value="34" color="text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="pointer-events-none order-first text-center lg:order-none"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <motion.h1
              className="mb-2 text-2xl font-bold sm:text-4xl md:text-5xl"
              style={{
                fontFamily: "'Press Start 2P', cursive",
                textShadow:
                  "0 0 20px rgba(168,85,247,0.8), 0 0 40px rgba(168,85,247,0.5), 4px 4px 0 rgba(0,0,0,0.5)",
              }}
              animate={{
                textShadow: [
                  "0 0 20px rgba(168,85,247,0.8), 0 0 40px rgba(168,85,247,0.5), 4px 4px 0 rgba(0,0,0,0.5)",
                  "0 0 30px rgba(168,85,247,1), 0 0 60px rgba(168,85,247,0.7), 4px 4px 0 rgba(0,0,0,0.5)",
                  "0 0 20px rgba(168,85,247,0.8), 0 0 40px rgba(168,85,247,0.5), 4px 4px 0 rgba(0,0,0,0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
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
              className="inline-block border-2 border-white/30 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 text-xs text-white"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                boxShadow: "0 0 15px rgba(168,85,247,0.6)",
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              BLOCKCHAIN POWERED
            </motion.div>
          </motion.div>

          <motion.div
            className="pointer-events-none border-2 border-purple-500/50 bg-black/70 p-4 backdrop-blur-md"
            style={{
              clipPath:
                "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
              boxShadow:
                "0 0 20px rgba(168,85,247,0.3), inset 0 0 15px rgba(168,85,247,0.1)",
            }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center">
              <div className="mb-2 text-xs text-purple-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                SEASON 3
              </div>
              <motion.div
                className="font-mono text-2xl font-bold text-white"
                animate={{ color: ["#ffffff", "#a855f7", "#ffffff"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                05:42:18
              </motion.div>
              <div className="mt-1 text-xs text-gray-400">Time remaining</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function GameButton({ children, variant = "primary", icon, onClick, dimmed = false, loading, animated = false }) {
  const styles =
    variant === "success"
      ? {
          gradient: "from-green-500 via-emerald-500 to-green-600",
          glow: "rgba(34,197,94,0.6)",
          glowHover: "rgba(34,197,94,0.9)",
          particle: "bg-green-400",
        }
      : variant === "warning"
        ? {
            gradient: "from-orange-500 via-amber-500 to-orange-600",
            glow: "rgba(251,146,60,0.6)",
            glowHover: "rgba(251,146,60,0.9)",
            particle: "bg-orange-400",
          }
        : {
            gradient: "from-blue-500 via-cyan-500 to-blue-600",
            glow: "rgba(59,130,246,0.6)",
            glowHover: "rgba(59,130,246,0.9)",
            particle: "bg-cyan-400",
          };

  const [particles, setParticles] = useState([]);

  const handleClick = () => {
    if (loading) return;
    onClick?.();
    setParticles([...Array(8)].map((_, i) => i));
    setTimeout(() => setParticles([]), 800);
  };

  return (
    <div className="relative isolate">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        aria-busy={loading}
        aria-disabled={dimmed}
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "10px",
          letterSpacing: "1px",
          imageRendering: "pixelated",
          boxShadow: loading
            ? `0 6px 0 rgba(0,0,0,0.35), 0 0 16px ${styles.glow}`
            : `0 8px 0 rgba(0,0,0,0.3), 0 0 20px ${styles.glow}`,
          touchAction: "manipulation",
        }}
        className={`group relative z-10 min-h-[48px] min-w-[44px] overflow-hidden border-4 border-black/30 bg-gradient-to-r px-6 py-3 text-base font-bold text-white transition-transform duration-150 enabled:hover:-translate-y-0.5 enabled:active:translate-y-1 disabled:cursor-wait disabled:opacity-80 ${dimmed ? "opacity-90 ring-2 ring-white/10 sm:opacity-95" : ""} ${styles.gradient}`}
      >
        <span className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px),
              repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px)`,
          }}
        />
        {animated && (
          <motion.span
            className="pointer-events-none absolute inset-0 block bg-gradient-to-b from-white/40 via-transparent to-transparent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}
        <span className="relative flex items-center justify-center gap-3">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            icon && (
              <motion.span
                className="inline-flex"
                animate={animated ? { y: [0, -3, 0] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {icon}
              </motion.span>
            )
          )}
          <span>{children}</span>
        </span>
        <span className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity group-hover:opacity-20" />
      </button>
      {particles.map((i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const distance = 60;
        return (
          <motion.div
            key={i}
            className={`absolute h-1.5 w-1.5 ${styles.particle}`}
            style={{ left: "50%", top: "50%" }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

function InfoCard({ icon, title, value, subtitle, color }) {
  return (
    <motion.div
      className={`border-2 border-white/10 bg-gradient-to-br p-4 text-center backdrop-blur-sm ${color}`}
      style={{
        clipPath: "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)",
      }}
      whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.3)" }}
    >
      <div className="mb-2 text-3xl">{icon}</div>
      <div
        className="mb-1 text-xs text-gray-400"
        style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "9px" }}
      >
        {title}
      </div>
      <div
        className="mb-1 text-2xl font-bold text-white"
        style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "14px" }}
      >
        {value}
      </div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </motion.div>
  );
}

function FeatureCard({ icon, title, description, color }) {
  return (
    <motion.div
      className="group relative overflow-hidden border-2 border-white/10 bg-black/40 p-6 backdrop-blur-md"
      style={{
        clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
      }}
      whileHover={{
        scale: 1.03,
        borderColor: "rgba(255,255,255,0.3)",
        boxShadow: "0 0 30px rgba(168,85,247,0.3)",
      }}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 3px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, white 2px, white 3px)`,
        }}
      />
      <motion.div className={`relative z-10 mb-3 ${color}`} whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>
        {typeof icon === "string" ? <div className="text-4xl">{icon}</div> : icon}
      </motion.div>
      <h3 className="relative z-10 mb-2 font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "12px" }}>
        {title}
      </h3>
      <p className="relative z-10 text-xs leading-relaxed text-gray-400">{description}</p>
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 bg-white opacity-0 group-hover:opacity-5"
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

/** Two-column game-style panels for primary on-chain actions */
function PlayActionPanels({ walletReady, loadingJoin, loadingBrew, onJoinRace, onBrewPotion }) {
  const clip =
    "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)";

  return (
    <div className="relative z-30 grid w-full max-w-4xl gap-6 lg:max-w-none xl:max-w-3xl">
      <div className="grid gap-6 md:grid-cols-2">
        {/* —— Join game —— */}
        <motion.div
          className="group relative overflow-hidden border-2 border-emerald-500/45 bg-black/55 p-5 shadow-[0_0_36px_rgba(16,185,129,0.22)] backdrop-blur-md sm:p-6"
          style={{
            clipPath: clip,
            boxShadow:
              "0 0 36px rgba(16,185,129,0.25), inset 0 0 24px rgba(16,185,129,0.06)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ borderColor: "rgba(52,211,153,0.65)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.9) 3px, rgba(255,255,255,0.9) 4px),
                repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.9) 3px, rgba(255,255,255,0.9) 4px)`,
            }}
          />
          <motion.div
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/25 blur-2xl"
            animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 3.2, repeat: Infinity }}
          />

          <div className="relative flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center border-2 border-emerald-400/50 bg-gradient-to-br from-emerald-600 to-cyan-700 shadow-[0_0_18px_rgba(52,211,153,0.45)]">
                <Gamepad2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p
                  className="text-[10px] font-bold tracking-[0.25em] text-emerald-300/90"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  MULTIPLAYER LOBBY
                </p>
                <h3
                  className="bg-gradient-to-r from-emerald-300 via-cyan-200 to-emerald-300 bg-clip-text text-lg font-bold text-transparent sm:text-xl"
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "clamp(11px, 2.5vw, 14px)", lineHeight: 1.6 }}
                >
                  JOIN GAME
                </h3>
              </div>
            </div>
            <span
              className="shrink-0 border border-emerald-400/40 bg-emerald-500/15 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-200"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Season live
            </span>
          </div>

          <p
            className="relative mt-4 text-xs leading-relaxed text-gray-400"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Lock in your racer for the current season. You will sign one transaction in MetaMask to register on-chain.
          </p>

          <ul className="relative mt-4 space-y-2.5">
            <StepRow
              done={walletReady}
              active={!walletReady}
              label="Wallet linked"
              sub="Use Connect wallet above"
              icon={<Link2 className="h-3.5 w-3.5" />}
            />
            <StepRow
              done={false}
              active={walletReady && loadingJoin}
              label="Confirm race entry"
              sub="Approve the joinRace transaction"
              icon={<Shield className="h-3.5 w-3.5" />}
              pulsing={loadingJoin}
            />
          </ul>

          <div className="relative mt-5 h-2 w-full overflow-hidden border border-emerald-500/30 bg-black/60">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-400"
              initial={{ width: "0%" }}
              animate={{
                width: loadingJoin ? ["35%", "100%", "40%"] : walletReady ? "100%" : "12%",
              }}
              transition={{
                duration: loadingJoin ? 1.2 : 0.6,
                repeat: loadingJoin ? Infinity : 0,
                ease: "easeInOut",
              }}
              style={{ boxShadow: "0 0 12px rgba(52,211,153,0.7)" }}
            />
          </div>
          <p className="mt-1.5 text-[10px] text-emerald-500/70" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            {loadingJoin ? "Awaiting block confirmation…" : walletReady ? "Ready to enter the arena" : "Connect wallet to enable"}
          </p>

          <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
            <div className="flex gap-4 text-[10px] text-gray-500" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              <span>
                Pool: <span className="text-amber-300/90">2.5 ETH</span>
              </span>
              <span>Players: 2.8K</span>
            </div>
            <GameButton
              variant="success"
              icon={<Zap className="h-4 w-4" />}
              animated
              onClick={onJoinRace}
              dimmed={!walletReady}
              loading={loadingJoin}
            >
              JOIN GAME
            </GameButton>
          </div>
        </motion.div>

        {/* —— Brew now —— */}
        <motion.div
          className="group relative overflow-hidden border-2 border-orange-500/45 bg-black/55 p-5 shadow-[0_0_36px_rgba(251,146,60,0.2)] backdrop-blur-md sm:p-6"
          style={{
            clipPath: clip,
            boxShadow:
              "0 0 36px rgba(251,146,60,0.22), inset 0 0 24px rgba(251,146,60,0.06)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          whileHover={{ borderColor: "rgba(251,146,60,0.7)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.9) 3px, rgba(255,255,255,0.9) 4px),
                repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.9) 3px, rgba(255,255,255,0.9) 4px)`,
            }}
          />
          <motion.div
            className="pointer-events-none absolute -left-6 -bottom-10 h-36 w-36 rounded-full bg-orange-500/20 blur-2xl"
            animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.12, 1] }}
            transition={{ duration: 2.8, repeat: Infinity }}
          />

          <div className="relative flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center border-2 border-orange-400/50 bg-gradient-to-br from-amber-600 to-orange-700 shadow-[0_0_18px_rgba(251,146,60,0.45)]">
                <FlaskConical className="h-6 w-6 text-white" />
              </div>
              <div>
                <p
                  className="text-[10px] font-bold tracking-[0.25em] text-orange-300/90"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  ALCHEMY LAB
                </p>
                <h3
                  className="bg-gradient-to-r from-orange-300 via-amber-200 to-orange-300 bg-clip-text text-lg font-bold text-transparent sm:text-xl"
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "clamp(11px, 2.5vw, 14px)", lineHeight: 1.6 }}
                >
                  BREW NOW
                </h3>
              </div>
            </div>
            <span
              className="shrink-0 border border-orange-400/40 bg-orange-500/15 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-orange-100"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Hot cauldron
            </span>
          </div>

          <p
            className="relative mt-4 text-xs leading-relaxed text-gray-400"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Commit a brew to the chain. Each successful cast counts toward your score and leaderboard climb.
          </p>

          <div className="relative mt-4 flex gap-2">
            {["🌿", "💎", "🔥"].map((herb, i) => (
              <motion.div
                key={herb}
                className="flex h-10 flex-1 items-center justify-center border border-orange-500/25 bg-gradient-to-b from-orange-950/80 to-black/80 text-lg"
                style={{ clipPath: "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)" }}
                animate={{
                  boxShadow: loadingBrew
                    ? [
                        "0 0 0 rgba(251,146,60,0)",
                        "0 0 14px rgba(251,146,60,0.45)",
                        "0 0 0 rgba(251,146,60,0)",
                      ]
                    : "0 0 0 rgba(0,0,0,0)",
                }}
                transition={{ duration: 1.4, repeat: loadingBrew ? Infinity : 0, delay: i * 0.12 }}
              >
                <motion.span
                  animate={loadingBrew ? { y: [0, -4, 0], rotate: [0, 6, -6, 0] } : {}}
                  transition={{ duration: 1.2, repeat: loadingBrew ? Infinity : 0, delay: i * 0.15 }}
                >
                  {herb}
                </motion.span>
              </motion.div>
            ))}
          </div>

          <ul className="relative mt-4 space-y-2.5">
            <StepRow
              accent="brew"
              done={walletReady}
              active={!walletReady}
              label="Wallet linked"
              sub="Required to sign brewPotion"
              icon={<Link2 className="h-3.5 w-3.5" />}
            />
            <StepRow
              accent="brew"
              done={false}
              active={walletReady && loadingBrew}
              label="Cast brew on-chain"
              sub="Confirm in wallet & wait for block"
              icon={<FlaskConical className="h-3.5 w-3.5" />}
              pulsing={loadingBrew}
            />
          </ul>

          <div className="relative mt-5 h-2 w-full overflow-hidden border border-orange-500/30 bg-black/60">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-600 via-amber-400 to-orange-500"
              initial={{ width: "0%" }}
              animate={{
                width: loadingBrew ? ["30%", "95%", "45%"] : walletReady ? "100%" : "12%",
              }}
              transition={{
                duration: loadingBrew ? 1.1 : 0.6,
                repeat: loadingBrew ? Infinity : 0,
                ease: "easeInOut",
              }}
              style={{ boxShadow: "0 0 12px rgba(251,146,60,0.65)" }}
            />
          </div>
          <p className="mt-1.5 text-[10px] text-orange-400/75" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            {loadingBrew ? "Mixing reagents on-chain…" : walletReady ? "Cauldron primed — brew when ready" : "Connect wallet to brew"}
          </p>

          <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
            <div className="flex gap-4 text-[10px] text-gray-500" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              <span>Recipe: <span className="text-purple-300/90">Arcane</span></span>
              <span>Gas: network</span>
            </div>
            <GameButton
              variant="warning"
              icon={<Flame className="h-4 w-4" />}
              animated
              onClick={onBrewPotion}
              dimmed={!walletReady}
              loading={loadingBrew}
            >
              BREW NOW
            </GameButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StepRow({ done, active, label, sub, icon, pulsing, accent = "race" }) {
  const activeCls =
    accent === "brew"
      ? "border-orange-400/55 bg-orange-500/10 text-orange-200 animate-pulse"
      : "border-cyan-400/50 bg-cyan-500/10 text-cyan-300 animate-pulse";

  return (
    <li className="flex items-start gap-3 rounded border border-white/5 bg-black/35 px-3 py-2">
      <div
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border ${
          done
            ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-300"
            : active
              ? activeCls
              : "border-white/15 bg-white/5 text-gray-500"
        }`}
        style={{ clipPath: "polygon(2px 0, 100% 0, 100% calc(100% - 2px), calc(100% - 2px) 100%, 0 100%, 0 2px)" }}
      >
        {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : icon}
      </div>
      <div className="min-w-0">
        <p
          className={`text-[11px] font-bold ${
            done ? "text-emerald-200" : active ? (accent === "brew" ? "text-orange-200" : "text-cyan-200") : "text-gray-400"
          }`}
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {label}
        </p>
        <p className="text-[10px] text-gray-500">{sub}</p>
        {pulsing && (
          <motion.div
            className={`mt-1.5 h-0.5 max-w-[120px] bg-gradient-to-r from-transparent ${
              accent === "brew" ? "via-orange-400" : "via-cyan-400"
            } to-transparent`}
            animate={{ opacity: [0.3, 1, 0.3], x: [0, 40, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        )}
      </div>
    </li>
  );
}

/**
 * Main immersive game shell: background, HUD, cauldron, race actions, leaderboard column.
 */
export default function GameUI({
  address,
  loadingJoin,
  loadingBrew,
  onJoinRace,
  onBrewPotion,
  leaderboardRows = [],
  leaderboardLoading = false,
  leaderboardError = null,
}) {
  const walletReady = Boolean(address);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#0f0f0f] via-[#111] to-[#0a0a0a]">
      <VoxelBackground />
      <FloatingParticles />

      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.15) 0%, transparent 50%)",
        }}
      />

      <motion.div
        className="pointer-events-none fixed inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.12) 2px, rgba(255,255,255,0.12) 4px)",
        }}
        animate={{ backgroundPosition: ["0px 0px", "0px 100px"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <GameHUD address={address} />

      <div className="relative z-20 container mx-auto px-6 pb-20 pt-[clamp(22rem,52vh,36rem)] sm:pt-[26rem] lg:pt-48">
        <div className="flex flex-col items-center gap-12 xl:flex-row xl:items-start xl:justify-between">
          <motion.div
            className="w-full max-w-xl flex-1 space-y-8 xl:max-w-none"
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <div className="space-y-6">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div
                  className="mb-4 text-xl text-purple-300"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  WELCOME TO THE ULTIMATE
                </div>
                <h2
                  className="mb-6 text-[32px] font-bold leading-tight"
                  style={{ fontFamily: "'Press Start 2P', cursive", lineHeight: "1.5" }}
                >
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    BLOCKCHAIN
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    ALCHEMY
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    CHALLENGE
                  </span>
                </h2>
              </motion.div>

              <div
                className="max-w-md text-sm leading-relaxed text-gray-400"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Brew magical potions, compete in real-time races, and climb the leaderboard. Earn rewards, unlock rare
                ingredients, and become the ultimate Potion Master.
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-purple-300/90" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Connect your wallet in the top bar, then use the command panels below.
              </p>
              <PlayActionPanels
                walletReady={walletReady}
                loadingJoin={loadingJoin}
                loadingBrew={loadingBrew}
                onJoinRace={onJoinRace}
                onBrewPotion={onBrewPotion}
              />
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <InfoCard icon="💰" title="REWARDS" value="2.5 ETH" subtitle="Prize pool" color="from-yellow-500/20 to-orange-500/20" />
              <InfoCard icon="🏆" title="WINNERS" value="847" subtitle="This season" color="from-purple-500/20 to-pink-500/20" />
              <InfoCard icon="⚡" title="ACTIVE" value="2.8K" subtitle="Players now" color="from-cyan-500/20 to-blue-500/20" />
            </div>
          </motion.div>

          <div className="flex flex-shrink-0 flex-col items-center">
            <BrewingCauldron />
          </div>

          <div className="flex w-full flex-shrink-0 justify-center xl:w-auto xl:justify-end">
            <Leaderboard
              highlightAddress={address}
              rows={leaderboardRows}
              loading={leaderboardLoading}
              error={leaderboardError}
            />
          </div>
        </div>

        <motion.div
          className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.85 }}
        >
          <FeatureCard
            icon={<Sparkles className="h-8 w-8" />}
            title="RARE INGREDIENTS"
            description="Collect & trade magical items"
            color="text-purple-400"
          />
          <FeatureCard icon="🔮" title="CRAFT POTIONS" description="Mix unique combinations" color="text-blue-400" />
          <FeatureCard icon="⚔️" title="COMPETE LIVE" description="Real-time PvP battles" color="text-green-400" />
          <FeatureCard icon="🎮" title="PLAY & EARN" description="Win crypto rewards" color="text-orange-400" />
        </motion.div>
      </div>

      <div className="pointer-events-none fixed bottom-0 left-0 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="pointer-events-none fixed right-0 top-1/4 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none fixed bottom-1/4 right-1/3 h-64 w-64 rounded-full bg-pink-600/20 blur-3xl" />
    </div>
  );
}
