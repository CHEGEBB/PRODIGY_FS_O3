import React from 'react';
import MessageInput from './MessageInput';

const ChatWindow = ({ messages, sendMessage }) => {
  return (
    <div className="chat-window glassmorphism">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'user' ? 'user' : 'other'}`}>
            {message.content}
          </div>
        ))}
      </div>
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;