import React from 'react';
import './MessageList.scss';

const MessageList = ({ messages, currentUser }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div
          key={message._id || index}
          className={`message-bubble ${
            message.senderId === currentUser?._id ? 'sent' : 'received'
          }`}
        >
          <div className="message-content">
            <p>{message.message}</p>
            <span className="message-time">{formatTime(message.createdAt)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;