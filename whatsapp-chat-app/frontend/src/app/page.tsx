'use client';

import Chat from '@/components/Chat';
import ConversationList from '@/components/ConversationList';
import { api } from '@/services/api';
import { Conversation } from '@/types';
import { useEffect, useState } from 'react';

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedConversations = await api.getConversations();
      setConversations(fetchedConversations);
      
      // Auto-select first conversation on mobile
      if (fetchedConversations.length > 0 && window.innerWidth < 768) {
        setSelectedConversation(fetchedConversations[0]);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
      setError('Failed to load conversations. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectConversation = (wa_id: string) => {
    const conversation = conversations.find(c => c._id === wa_id);
    setSelectedConversation(conversation || null);
    setSelectedConversationId(wa_id);
  };

  const handleMessageSent = () => {
    // Refresh conversations to update last message
    loadConversations();
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading WhatsApp Web...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadConversations}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Mobile: Show conversation list or chat based on selection */}
      <div className="md:hidden w-full">
        {selectedConversation ? (
          <div className="h-full flex flex-col">
            {/* Mobile Header with back button */}
            <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
              <button
                onClick={() => setSelectedConversation(null)}
                className="mr-3 p-1 hover:bg-gray-100 rounded"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {selectedConversation.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {selectedConversation.name}
                  </h2>
                </div>
              </div>
            </div>
            <Chat selectedConversation={selectedConversation} onMessageSent={handleMessageSent} />
          </div>
        ) : (
          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversationId}
            onSelectConversation={handleSelectConversation}
          />
        )}
      </div>

      {/* Desktop: Show both conversation list and chat */}
      <div className="hidden md:flex w-full">
        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversationId}
          onSelectConversation={handleSelectConversation}
        />
        <Chat selectedConversation={selectedConversation} onMessageSent={handleMessageSent} />
      </div>
    </div>
  );
}
