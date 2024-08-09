import React, { createContext, useState, useEffect } from 'react';
import { login, signup, logout } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async (email, password) => {
    const data = await login(email, password);
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const handleSignup = async (name, email, password) => {
    const data = await signup(name, email, password);
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, signup: handleSignup, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};