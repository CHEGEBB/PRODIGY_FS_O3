import { useState, useEffect, useRef } from 'react';
import '../sass/MessageContainer.scss';

const MessageContainer = ({ selectedUser, currentUser, messages, sendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            sendMessage(newMessage);
            setNewMessage('');
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="message-container">
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={message._id || index} className={`message ${message.senderId === currentUser?._id ? 'sent' : 'received'}`}>
                        <p className="message-content">{message.content}</p>
                        <span className="message-time">{formatTime(message.createdAt)}</span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default MessageContainer;