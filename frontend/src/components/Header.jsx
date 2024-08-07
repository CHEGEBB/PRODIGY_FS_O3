import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import '../sass/Header.scss';

const Header = ({ selectedUser }) => {
    return (
        <header className="main-header">
            <div className="header-content">
                {selectedUser && (
                    <div className="selected-user-profile">
                        <img 
                            src={selectedUser.profilePic || 'https://via.placeholder.com/40'} 
                            alt={selectedUser.fullname} 
                            className="profile-pic"
                        />
                        <h2>{selectedUser.fullname}</h2>
                    </div>
                )}
                <div className="search-bar">
                    <FontAwesomeIcon icon={faSearch} />
                    <input type="text" placeholder="Search..." />
                </div>
                <div className="user-actions">
                    <FontAwesomeIcon icon={faBell} />
                    <FontAwesomeIcon icon={faUser} />
                </div>
            </div>
        </header>
    );
};

export default Header;