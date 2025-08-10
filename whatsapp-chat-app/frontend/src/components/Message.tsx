'use client';

import { Message as MessageType } from '@/types';
import { format } from 'date-fns';

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  const isFromUser = message.isFromUser;
  const timestamp = new Date(message.timestamp * 1000);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'read':
        return (
          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'delivered':
        return (
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        );
    }
  };

  return (
    <div className={`flex ${isFromUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isFromUser
            ? 'bg-green-500 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        <p className="text-sm break-words">{message.text}</p>
        <div className={`flex items-center justify-end mt-1 space-x-1 ${
          isFromUser ? 'text-green-100' : 'text-gray-500'
        }`}>
          <span className="text-xs">
            {format(timestamp, 'HH:mm')}
          </span>
          {isFromUser && (
            <div className="flex items-center">
              {getStatusIcon(message.status)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



