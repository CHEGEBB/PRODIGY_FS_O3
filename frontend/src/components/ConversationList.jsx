import React from 'react';

const ConversationList = ({ conversations, selectConversation }) => {
  return (
    <div className="conversation-list glassmorphism">
      <h2>Conversations</h2>
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className="conversation-item"
          onClick={() => selectConversation(conversation.id)}
        >
          {conversation.name}
        </div>
      ))}
    </div>
  );
};

export default ConversationList;