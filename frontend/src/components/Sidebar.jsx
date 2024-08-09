import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faComments, faSignInAlt, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="sidebar">
      <div className="logo">ChatApp</div>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
        {user ? (
          <>
            <Link to="/chat" className={location.pathname === '/chat' ? 'active' : ''}>
              <FontAwesomeIcon icon={faComments} /> Chat
            </Link>
            <a onClick={logout} href="#">
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </a>
          </>
        ) : (
          <>
            <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Link>
            <Link to="/signup" className={location.pathname === '/signup' ? 'active' : ''}>
              <FontAwesomeIcon icon={faUserPlus} /> Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;