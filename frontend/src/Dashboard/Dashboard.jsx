import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../sass/Dashboard.scss';
import MessageContainer from '../Chat/MessageContainer';

const Dashboard = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);

    const handleUserSelect = async (user) => {
        setSelectedUser(user);
        // Fetch messages between current user and selected user
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
        if (!selectedUser) return;

        try {
            const response = await axios.post(`http://localhost:5000/api/messages/send/${selectedUser._id}`, 
                { content },
                { withCredentials: true }
            );
            setMessages(prevMessages => [...prevMessages, response.data]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="dashboard">
            <Sidebar onUserSelect={handleUserSelect} />
            <main className="main-content">
                <Header selectedUser={selectedUser} />
                <section className="chat-area">
                    {selectedUser ? (
                        <MessageContainer 
                            selectedUser={selectedUser} 
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