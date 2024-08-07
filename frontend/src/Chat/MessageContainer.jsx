import { useState } from 'react';
import '../sass/MessageContainer.scss';

const MessageContainer = ({ selectedUser, messages, sendMessage }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            sendMessage(newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className="message-container">
            <div className="messages">
                {messages.map((message) => (
                    <div key={message._id} className={`message ${message.senderId === selectedUser._id ? 'received' : 'sent'}`}>
                        {message.content || message.message}
                    </div>
                ))}
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