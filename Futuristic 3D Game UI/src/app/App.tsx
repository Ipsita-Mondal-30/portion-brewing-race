import { motion } from "motion/react";
import { Sparkles, Zap, Flame } from "lucide-react";
import { FloatingParticles } from "./components/FloatingParticles";
import { BrewingCauldron } from "./components/BrewingCauldron";
import { WalletButton } from "./components/WalletButton";
import { GameButton } from "./components/GameButton";
import { Leaderboard } from "./components/Leaderboard";
import { GameHUD } from "./components/GameHUD";
import { VoxelBackground } from "./components/VoxelBackground";

export default function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#111] to-[#0a0a0a] overflow-hidden">
      {/* Background effects */}
      <VoxelBackground />
      <FloatingParticles />
      
      {/* Radial gradient overlay */}
      <div className="fixed inset-0 bg-radial-gradient pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.15) 0%, transparent 50%)",
        }}
      />

      {/* Scanline effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "0px 100px"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* HUD Overlay */}
      <GameHUD />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="flex items-start justify-between gap-12">
          {/* Left side - Actions */}
          <motion.div
            className="flex-1 space-y-8"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Welcome section */}
            <div className="space-y-6">
              <motion.div
                className="inline-block"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div 
                  className="text-xl text-purple-300 mb-4"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  WELCOME TO THE ULTIMATE
                </div>
                <h2 
                  className="text-5xl font-bold mb-6 leading-tight"
                  style={{ 
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: "32px",
                    lineHeight: "1.5",
                  }}
                >
                  <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                    BLOCKCHAIN
                  </span>
                  <br />
                  <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                    ALCHEMY
                  </span>
                  <br />
                  <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
                    CHALLENGE
                  </span>
                </h2>
              </motion.div>

              <div 
                className="text-gray-400 text-sm leading-relaxed max-w-md"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Brew magical potions, compete in real-time races, and climb the leaderboard. 
                Earn rewards, unlock rare ingredients, and become the ultimate Potion Master!
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-4">
              <WalletButton />
              
              <div className="flex gap-4">
                <GameButton 
                  variant="success" 
                  icon={<Zap className="w-4 h-4" />}
                  animated
                >
                  JOIN RACE
                </GameButton>
                
                <GameButton 
                  variant="warning" 
                  icon={<Flame className="w-4 h-4" />}
                  animated
                >
                  BREW NOW
                </GameButton>
              </div>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              <InfoCard 
                icon="💰" 
                title="REWARDS"
                value="2.5 ETH"
                subtitle="Prize Pool"
                color="from-yellow-500/20 to-orange-500/20"
              />
              <InfoCard 
                icon="🏆" 
                title="WINNERS"
                value="847"
                subtitle="This Season"
                color="from-purple-500/20 to-pink-500/20"
              />
              <InfoCard 
                icon="⚡" 
                title="ACTIVE"
                value="2.8K"
                subtitle="Players Now"
                color="from-cyan-500/20 to-blue-500/20"
              />
            </div>
          </motion.div>

          {/* Center - Brewing Cauldron */}
          <div className="flex-shrink-0">
            <BrewingCauldron />
          </div>

          {/* Right side - Leaderboard */}
          <div className="flex-shrink-0">
            <Leaderboard />
          </div>
        </div>

        {/* Bottom features */}
        <motion.div
          className="mt-20 grid grid-cols-4 gap-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <FeatureCard
            icon={<Sparkles className="w-8 h-8" />}
            title="RARE INGREDIENTS"
            description="Collect & trade magical items"
            color="text-purple-400"
          />
          <FeatureCard
            icon="🔮"
            title="CRAFT POTIONS"
            description="Mix unique combinations"
            color="text-blue-400"
          />
          <FeatureCard
            icon="⚔️"
            title="COMPETE LIVE"
            description="Real-time PvP battles"
            color="text-green-400"
          />
          <FeatureCard
            icon="🎮"
            title="PLAY & EARN"
            description="Win crypto rewards"
            color="text-orange-400"
          />
        </motion.div>
      </div>

      {/* Ambient light effects */}
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/4 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/3 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}

interface InfoCardProps {
  icon: string;
  title: string;
  value: string;
  subtitle: string;
  color: string;
}

function InfoCard({ icon, title, value, subtitle, color }: InfoCardProps) {
  return (
    <motion.div
      className={`bg-gradient-to-br ${color} backdrop-blur-sm border-2 border-white/10 p-4 text-center`}
      style={{
        clipPath: "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)",
      }}
      whileHover={{ 
        scale: 1.05,
        borderColor: "rgba(255,255,255,0.3)",
      }}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div 
        className="text-xs text-gray-400 mb-1"
        style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "9px" }}
      >
        {title}
      </div>
      <div 
        className="text-2xl font-bold text-white mb-1"
        style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "14px" }}
      >
        {value}
      </div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </motion.div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  return (
    <motion.div
      className="bg-black/40 backdrop-blur-md border-2 border-white/10 p-6 group overflow-hidden"
      style={{
        clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
      }}
      whileHover={{ 
        scale: 1.03,
        borderColor: "rgba(255,255,255,0.3)",
        boxShadow: "0 0 30px rgba(168,85,247,0.3)",
      }}
    >
      {/* Pixel texture */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 3px),
                            repeating-linear-gradient(90deg, transparent, transparent 2px, white 2px, white 3px)`
        }}
      />

      <motion.div
        className={`${color} mb-3`}
        whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {typeof icon === 'string' ? (
          <div className="text-4xl">{icon}</div>
        ) : (
          icon
        )}
      </motion.div>
      
      <h3 
        className="text-white font-bold mb-2"
        style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "12px" }}
      >
        {title}
      </h3>
      
      <p className="text-gray-400 text-xs leading-relaxed">
        {description}
      </p>

      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5"
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
