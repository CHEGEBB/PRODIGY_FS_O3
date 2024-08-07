import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faUsers, faCog, faCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../sass/Sidebar.scss';

const Sidebar = ({ onUserSelect, onlineUsers }) => {
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('chats');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleUserClick = (user) => {
        onUserSelect(user);
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>ChatApp</h2>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li className={activeTab === 'chats' ? 'active' : ''} onClick={() => handleTabClick('chats')}>
                        <FontAwesomeIcon icon={faComments} /> Chats
                    </li>
                    <li className={activeTab === 'users' ? 'active' : ''} onClick={() => handleTabClick('users')}>
                        <FontAwesomeIcon icon={faUsers} /> Active Users
                    </li>
                    <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => handleTabClick('settings')}>
                        <FontAwesomeIcon icon={faCog} /> Settings
                    </li>
                </ul>
            </nav>
            <div className="user-profiles">
                <h3>User Profiles</h3>
                <ul>
                    {users.map((user) => (
                        <li
                            key={user._id}
                            className="user-profile"
                            onClick={() => handleUserClick(user)}
                        >
                            <div className="user-avatar">
                                <img src={user.profilePic || 'https://via.placeholder.com/30'} alt={user.fullname} />
                                <FontAwesomeIcon 
                                    icon={faCircle} 
                                    className={`status-indicator ${onlineUsers.includes(user._id) ? 'online' : 'offline'}`} 
                                />
                            </div>
                            <span>{user.fullname}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="sidebar-footer">
                <p>© 2024 ChatApp</p>
            </div>
        </aside>
    );
};

export default Sidebar;