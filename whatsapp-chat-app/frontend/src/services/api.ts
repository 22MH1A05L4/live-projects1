import { Conversation, Message, SendMessageRequest } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:5000/api';

export const api = {
  // Get all conversations
  async getConversations(): Promise<Conversation[]> {
    const response = await fetch(`${API_BASE_URL}/conversations`);
    if (!response.ok) {
      throw new Error('Failed to fetch conversations');
    }
    return response.json();
  },

  // Get messages for a specific conversation
  async getMessages(wa_id: string): Promise<Message[]> {
    const response = await fetch(`${API_BASE_URL}/messages/${wa_id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }
    return response.json();
  },

  // Send a new message
  async sendMessage(data: SendMessageRequest): Promise<Message> {
    const response = await fetch(`${API_BASE_URL}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    return response.json();
  },
};



