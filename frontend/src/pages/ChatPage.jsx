import React, { useState, useEffect } from 'react';
import ChatWindow from '../components/ChatWindow';
import ConversationList from '../components/ConversationList';
import UserList from '../components/UserList';
import { useAuth } from '../hooks/useAuth';
import { getConversations, getMessages, sendMessage } from '../services/api';
import { initSocket, getSocket } from '../services/socket';

const ChatPage = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [currentReceiver, setCurrentReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (user) {
      const socket = initSocket();
      
      socket.on('message', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      socket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users);
      });

      fetchConversations();

      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  const fetchConversations = async () => {
    const data = await getConversations();
    setConversations(data);
  };

  const selectConversation = async (receiverId) => {
    setCurrentReceiver(receiverId);
    const data = await getMessages(receiverId);
    setMessages(data);
  };

  const handleSendMessage = async (content) => {
    if (currentReceiver) {
      await sendMessage(currentReceiver, content);
      const socket = getSocket();
      socket.emit('sendMessage', { receiverId: currentReceiver, message: content });
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