
import { motion } from 'framer-motion';

const VideoWindow = () => {
  return (
    <div className="w-full h-full bg-slate-900/50 rounded-xl flex items-center justify-center min-h-[300px]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
          <div className="w-12 h-12 bg-slate-600 rounded-full animate-pulse" />
        </div>
        <p className="text-slate-400">Video feed will appear here</p>
      </motion.div>
    </div>
  );
};

export default VideoWindow;
