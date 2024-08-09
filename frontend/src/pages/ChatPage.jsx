import React, { useState, useEffect } from 'react';
import ChatWindow from '../components/ChatWindow';
import ConversationList from '../components/ConversationList';
import UserList from '../components/UserList';
import { useAuth } from '../hooks/useAuth';
import { getConversations, getMessages, sendMessage } from '../services/api';
import { initSocket } from '../services/socket';

const ChatPage = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (user) {
      const socket = initSocket(user.token);
      
      socket.on('message', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      socket.on('userOnline', (userData) => {
        setOnlineUsers((prevUsers) => [...prevUsers, userData]);
      });

      socket.on('userOffline', (userId) => {
        setOnlineUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  const fetchConversations = async () => {
    const data = await getConversations(user.token);
    setConversations(data);
  };

  const selectConversation = async (conversationId) => {
    setCurrentConversation(conversationId);
    const data = await getMessages(user.token, conversationId);
    setMessages(data);
  };

  const handleSendMessage = async (content) => {
    if (currentConversation) {
      await sendMessage(user.token, currentConversation, content);
    }
  };

  return (
    <div className="chat-page">
      <ConversationList
        conversations={conversations}
        selectConversation={selectConversation}
      />
      <ChatWindow messages={messages} sendMessage={handleSendMessage} />
      <UserList users={onlineUsers} />
    </div>
  );
};

export default ChatPage;