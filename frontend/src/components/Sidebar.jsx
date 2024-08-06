import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faUsers, faCog } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../sass/Sidebar.scss';

const Sidebar = () => {
    const [users, setUsers] = useState([]);

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

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>ChatApp</h2>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li><FontAwesomeIcon icon={faComments} /> Chats</li>
                    <li><FontAwesomeIcon icon={faUsers} /> Active Users</li>
                    <li><FontAwesomeIcon icon={faCog} /> Settings</li>
                </ul>
            </nav>
            <div className="user-profiles">
                <h3>User Profiles</h3>
                <ul>
                    {users.map((user) => (
                        <li key={user._id} className="user-profile">
                            <img src={user.profilePic} alt={user.fullname} />
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