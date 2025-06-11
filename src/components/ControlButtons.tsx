
import { motion } from 'framer-motion';
import { Mic, MicOff, X } from 'lucide-react';

interface ControlButtonsProps {
  isMuted: boolean;
  onMuteToggle: () => void;
  onEndCall: () => void;
}

const ControlButtons = ({ isMuted, onMuteToggle, onEndCall }: ControlButtonsProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="flex justify-center gap-4"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onMuteToggle}
        className={`p-4 rounded-full transition-all duration-200 ${
          isMuted
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-slate-700 hover:bg-slate-600 text-white'
        }`}
      >
        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onEndCall}
        className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
      >
        <X size={24} />
      </motion.button>
    </motion.div>
  );
};

export default ControlButtons;
