export interface Message {
  _id: string;
  wa_id: string;
  name: string;
  from: string;
  message_id?: string;
  text: string;
  timestamp: number;
  status: 'sent' | 'delivered' | 'read';
  type: string;
  isFromUser: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  _id: string;
  name: string;
  lastMessage: string;
  lastTimestamp: number;
  lastStatus: 'sent' | 'delivered' | 'read';
  messageCount: number;
}

export interface SendMessageRequest {
  wa_id: string;
  name: string;
  message: string;
}



