
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface Message {
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface ConversationTranscriptProps {
  messages: Message[];
}

const ConversationTranscript = ({ messages }: ConversationTranscriptProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto space-y-4 bg-slate-900/30 rounded-xl p-4"
    >
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
              message.type === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-white'
            }`}
          >
            <p className="text-sm">{message.text}</p>
            <p className="text-xs opacity-70 mt-1">
              {message.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ConversationTranscript;
