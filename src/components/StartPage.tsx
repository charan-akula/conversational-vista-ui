
import { motion } from 'framer-motion';

interface StartPageProps {
  onStartConversation: () => void;
}

const StartPage = ({ onStartConversation }: StartPageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.09, 1.04, 0.245, 1.055] }}
        className="text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-4xl font-bold text-white mb-8"
        >
          Voice Assistant
        </motion.h1>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onClick={onStartConversation}
          className="px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Start Conversation
        </motion.button>
      </motion.div>
    </div>
  );
};

export default StartPage;
