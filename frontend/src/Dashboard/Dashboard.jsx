import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import '../sass/Dashboard.scss';
import MessageContainer from '../components/Chat/MessageContainer';
import socket from '../socket';

const Dashboard = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/current', { withCredentials: true });
                setCurrentUser(response.data);
                socket.auth = { userId: response.data._id };
                socket.connect();
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        const fetchOnlineUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setOnlineUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchCurrentUser();
        fetchOnlineUsers();

        // Socket event listeners
        socket.on('getOnlineUsers', (users) => {
            setOnlineUsers(users);
        });

        socket.on('newMessage', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            socket.off('getOnlineUsers');
            socket.off('newMessage');
            socket.disconnect();
        };
    }, []);

    const handleUserSelect = async (user) => {
        setSelectedUser(user);
        try {
            const response = await axios.get(`http://localhost:5000/api/messages/${user._id}`, {
                withCredentials: true
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async (content) => {
        if (!selectedUser || !currentUser) return;

        try {
            const response = await axios.post(`http://localhost:5000/api/messages/send/${selectedUser._id}`,
                { content },
                { withCredentials: true }
            );
            const newMessage = {
                ...response.data,
                senderId: currentUser._id
            };
            setMessages(prevMessages => [...prevMessages, newMessage]);
            // Emit the message through socket
            socket.emit('sendMessage', newMessage);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="dashboard">
            <Sidebar onUserSelect={handleUserSelect} onlineUsers={onlineUsers} />
            <main className="main-content">
                <Header selectedUser={selectedUser} />
                <section className="chat-area">
                    {selectedUser ? (
                        <MessageContainer
                            selectedUser={selectedUser}
                            currentUser={currentUser}
                            messages={messages}
                            sendMessage={sendMessage}
                        />
                    ) : (
                        <>
                            <h1>Welcome to ChatApp</h1>
                            <p>Select a chat to start messaging</p>
                        </>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
