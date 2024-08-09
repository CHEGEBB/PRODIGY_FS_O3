import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="home-page glassmorphism">
      <h1>Welcome to ChatApp</h1>
      <p>A real-time chat application with a glassmorphism design.</p>
      {user ? (
        <Link to="/chat" className="btn">Start Chatting</Link>
      ) : (
        <div>
          <Link to="/login" className="btn">Login</Link>
          <Link to="/signup" className="btn">Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;