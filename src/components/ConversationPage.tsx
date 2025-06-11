
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AudioVisualizer from './AudioVisualizer';
import VideoWindow from './VideoWindow';
import ConversationTranscript from './ConversationTranscript';
import ControlButtons from './ControlButtons';
import { useLiveKit } from '@/hooks/useLiveKit';

interface ConversationPageProps {
  onEndConversation: () => void;
}

const ConversationPage = ({ onEndConversation }: ConversationPageProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const { 
    connectionStatus, 
    messages, 
    isListening, 
    connect, 
    disconnect, 
    room 
  } = useLiveKit();

  const handleStartConversation = async () => {
    const roomName = `room-${Math.random().toString(36).substr(2, 8)}`;
    const participantName = `user-${Math.random().toString(36).substr(2, 5)}`;
    
    console.log('Starting conversation with room:', roomName);
    await connect(roomName, participantName);
  };

  const handleMuteToggle = async () => {
    if (room) {
      if (isMuted) {
        await room.localParticipant.unmute();
      } else {
        await room.localParticipant.mute();
      }
      setIsMuted(!isMuted);
      console.log('Mute toggled:', !isMuted);
    }
  };

  const handleEndCall = () => {
    console.log('Ending conversation...');
    disconnect();
    onEndConversation();
  };

  // Auto-start conversation when component mounts
  useEffect(() => {
    handleStartConversation();
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
            <VideoWindow room={room} />
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-semibold">Conversation</h3>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-green-500' : 
                  connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <span className="text-sm text-slate-400 capitalize">{connectionStatus}</span>
              </div>
            </div>
            {connectionStatus === 'connecting' ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-slate-400">Connecting to LiveKit...</p>
                </div>
              </div>
            ) : (
              <ConversationTranscript messages={messages} />
            )}
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
