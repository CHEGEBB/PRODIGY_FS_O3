import React, { useState, useEffect, useContext, useRef } from 'react';
import { SocketContext } from '../../context/SocketContext';
import { AuthContext } from '../../context/AuthContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './ChatWindow.scss';

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const socket = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      // Fetch messages when the component mounts or the selectedUser changes
      fetchMessages();
    }

    return () => {
      if (socket) {
        socket.off('newMessage');
      }
    };
  }, [socket, selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/messages/${selectedUser._id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (message) => {
    try {
      const response = await fetch(`/api/messages/send/${selectedUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ message }),
      });
      const newMessage = await response.json();
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-window">
      <MessageList messages={messages} currentUser={user} />
      <MessageInput onSendMessage={sendMessage} />
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;