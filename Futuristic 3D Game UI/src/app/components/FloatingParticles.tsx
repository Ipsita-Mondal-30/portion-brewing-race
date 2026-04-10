import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  type: "cube" | "potion" | "crystal" | "herb";
  x: number;
  y: number;
  delay: number;
  duration: number;
  rotateSpeed: number;
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    const types: Particle["type"][] = ["cube", "potion", "crystal", "herb"];
    
    for (let i = 0; i < 25; i++) {
      newParticles.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 15 + Math.random() * 10,
        rotateSpeed: 10 + Math.random() * 20,
      });
    }
    setParticles(newParticles);
  }, []);

  const getParticleStyle = (type: Particle["type"]) => {
    switch (type) {
      case "cube":
        return "bg-gradient-to-br from-purple-500 to-pink-500";
      case "potion":
        return "bg-gradient-to-br from-green-400 to-emerald-600 rounded-full";
      case "crystal":
        return "bg-gradient-to-br from-blue-400 to-cyan-600 rotate-45";
      case "herb":
        return "bg-gradient-to-br from-yellow-400 to-green-500 rounded-sm";
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute ${getParticleStyle(particle.type)} opacity-20`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.type === "potion" ? "20px" : "16px",
            height: particle.type === "potion" ? "24px" : "16px",
            filter: "blur(1px) drop-shadow(0 0 8px currentColor)",
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
