
import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  isActive: boolean;
  isMuted: boolean;
}

const AudioVisualizer = ({ isActive, isMuted }: AudioVisualizerProps) => {
  const bars = Array.from({ length: 5 }, (_, i) => i);

  const getBarHeight = (index: number) => {
    const baseHeight = 24;
    const heights = [80, 120, 100, 90, 70];
    return isMuted ? baseHeight : heights[index];
  };

  return (
    <div className="flex items-center justify-center h-48 bg-slate-900/50 rounded-xl">
      <div className="flex items-end gap-3">
        {bars.map((bar) => (
          <motion.div
            key={bar}
            className={`w-16 rounded-full ${isMuted ? 'bg-slate-600' : 'bg-white'}`}
            animate={{
              height: getBarHeight(bar),
              opacity: isMuted ? 0.3 : 1,
            }}
            transition={{
              duration: 0.5,
              repeat: isMuted ? 0 : Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: bar * 0.1,
            }}
            style={{
              minHeight: 24,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AudioVisualizer;
