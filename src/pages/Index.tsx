
import { useState } from 'react';
import StartPage from '@/components/StartPage';
import ConversationPage from '@/components/ConversationPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'start' | 'conversation'>('start');

  const handleStartConversation = () => {
    setCurrentPage('conversation');
  };

  const handleEndConversation = () => {
    setCurrentPage('start');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {currentPage === 'start' ? (
        <StartPage onStartConversation={handleStartConversation} />
      ) : (
        <ConversationPage onEndConversation={handleEndConversation} />
      )}
    </div>
  );
};

export default Index;
