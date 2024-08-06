import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faUsers, faCog } from '@fortawesome/free-solid-svg-icons';
import '../sass/Sidebar.scss';

const Sidebar = () => {
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
            <div className="sidebar-footer">
                <p>© 2024 ChatApp</p>
            </div>
        </aside>
    );
};

export default Sidebar;