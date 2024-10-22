import React from 'react';

type ChatMessageProps = {
  name: string;
  time: string;
  message: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ name, time, message }) => (
  <div className="mb-4 flex items-start">
    <div>
      <div className="flex items-center">
        <span className="mr-2 font-bold">{name}</span>
        <span className="text-sm text-gray-500">{time}</span>
      </div>
      <p className="text-gray-800">{message}</p>
    </div>
  </div>
);

export default ChatMessage;
