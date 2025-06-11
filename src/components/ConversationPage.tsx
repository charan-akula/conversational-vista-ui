
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AudioVisualizer from './AudioVisualizer';
import VideoWindow from './VideoWindow';
import ConversationTranscript from './ConversationTranscript';
import ControlButtons from './ControlButtons';

interface ConversationPageProps {
  onEndConversation: () => void;
}

const ConversationPage = ({ onEndConversation }: ConversationPageProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot' as const, text: 'Hello! How can I help you today?', timestamp: new Date() }
  ]);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    console.log('Mute toggled:', !isMuted);
  };

  const handleEndCall = () => {
    console.log('Ending conversation...');
    onEndConversation();
  };

  // Simulate conversation for demo
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prev => [...prev, 
        { type: 'user' as const, text: 'How about the story involving a llama', timestamp: new Date() }
      ]);
    }, 2000);

    const timer2 = setTimeout(() => {
      setMessages(prev => [...prev, 
        { type: 'bot' as const, text: 'Once upon a time, in a small village nestled in the Andes, there lived a quirky llama named Luis. Luis dreamed of becoming a famous mountain climber. One day, he decided to embark on a journey to the tallest peak.', timestamp: new Date() }
      ]);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-6"
    >
      <div className="max-w-7xl mx-auto h-screen flex gap-6">
        {/* Left Side - Audio Visualizer and Video */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex-1 flex flex-col gap-6"
        >
          {/* Audio Visualizer */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-white text-lg font-semibold mb-4">Audio Visualizer</h3>
            <AudioVisualizer isActive={isListening} isMuted={isMuted} />
          </div>

          {/* Video Window */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 flex-1">
            <h3 className="text-white text-lg font-semibold mb-4">Video</h3>
            <VideoWindow />
          </div>
        </motion.div>

        {/* Right Side - Conversation Transcript */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 flex flex-col gap-6"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 flex-1 flex flex-col">
            <h3 className="text-white text-lg font-semibold mb-4">Conversation</h3>
            <ConversationTranscript messages={messages} />
          </div>

          {/* Control Buttons */}
          <ControlButtons
            isMuted={isMuted}
            onMuteToggle={handleMuteToggle}
            onEndCall={handleEndCall}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ConversationPage;
