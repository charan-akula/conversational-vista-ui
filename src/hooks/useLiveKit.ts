
import { useState, useEffect, useRef } from 'react';
import { LiveKitConnection } from '@/utils/livekitConnection';

interface Message {
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export const useLiveKit = () => {
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const connectionRef = useRef<LiveKitConnection | null>(null);

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      type: isUser ? 'user' : 'bot',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const connect = async (roomName: string, participantName: string) => {
    setConnectionStatus('connecting');
    
    try {
      connectionRef.current = new LiveKitConnection();
      connectionRef.current.setOnTranscript(addMessage);
      
      await connectionRef.current.connect(roomName, participantName);
      setConnectionStatus('connected');
      setIsListening(true);
      
      // Add initial bot message
      addMessage('Hello! I\'m connected and ready to chat. How can I help you today?', false);
      
    } catch (error) {
      console.error('Connection failed:', error);
      setConnectionStatus('disconnected');
    }
  };

  const disconnect = () => {
    if (connectionRef.current) {
      connectionRef.current.disconnect();
      connectionRef.current = null;
    }
    setConnectionStatus('disconnected');
    setIsListening(false);
  };

  const sendMessage = async (message: string) => {
    if (connectionRef.current) {
      addMessage(message, true);
      await connectionRef.current.sendMessage(message);
    }
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return {
    connectionStatus,
    messages,
    isListening,
    connect,
    disconnect,
    sendMessage,
    room: connectionRef.current?.getRoom()
  };
};
