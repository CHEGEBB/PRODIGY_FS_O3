import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import '../sass/Header.scss';

const Header = () => {
    return (
        <header className="main-header">
            <div className="search-bar">
                <FontAwesomeIcon icon={faSearch} />
                <input type="text" placeholder="Search..." />
            </div>
            <div className="user-actions">
                <FontAwesomeIcon icon={faBell} />
                <FontAwesomeIcon icon={faUser} />
            </div>
        </header>
    );
};

export default Header;