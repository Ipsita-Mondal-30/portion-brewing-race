import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Cube {
  id: number;
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
  rotateX: number;
  rotateY: number;
  delay: number;
}

export function VoxelBackground() {
  const [cubes, setCubes] = useState<Cube[]>([]);

  useEffect(() => {
    const colors = [
      "rgba(168,85,247,0.15)", // purple
      "rgba(59,130,246,0.15)", // blue
      "rgba(34,197,94,0.15)", // green
      "rgba(236,72,153,0.15)", // pink
    ];

    const newCubes: Cube[] = [];
    for (let i = 0; i < 15; i++) {
      newCubes.push({
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
    setCubes(newCubes);
  }, []);

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ perspective: "1000px" }}
    >
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
          {/* Front face */}
          <div
            className="absolute inset-0 border border-white/20"
            style={{
              backgroundColor: cube.color,
              transform: `translateZ(${cube.size / 2}px)`,
              boxShadow: `0 0 20px ${cube.color}`,
            }}
          />
          {/* Back face */}
          <div
            className="absolute inset-0 border border-white/20"
            style={{
              backgroundColor: cube.color,
              transform: `translateZ(-${cube.size / 2}px)`,
            }}
          />
          {/* Right face */}
          <div
            className="absolute inset-0 border border-white/20"
            style={{
              backgroundColor: cube.color,
              transform: `rotateY(90deg) translateZ(${cube.size / 2}px)`,
            }}
          />
          {/* Left face */}
          <div
            className="absolute inset-0 border border-white/20"
            style={{
              backgroundColor: cube.color,
              transform: `rotateY(-90deg) translateZ(${cube.size / 2}px)`,
            }}
          />
          {/* Top face */}
          <div
            className="absolute inset-0 border border-white/20"
            style={{
              backgroundColor: cube.color,
              transform: `rotateX(90deg) translateZ(${cube.size / 2}px)`,
            }}
          />
          {/* Bottom face */}
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
