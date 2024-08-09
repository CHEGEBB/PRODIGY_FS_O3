import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Updated to port 5000

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
  return response.data;
};

export const signup = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/auth/signup`, { name, email, password }, { withCredentials: true });
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
  return response.data;
};

export const getConversations = async () => {
  const response = await axios.get(`${API_URL}/users`, { withCredentials: true });
  return response.data;
};

export const getMessages = async (receiverId) => {
  const response = await axios.get(`${API_URL}/messages/${receiverId}`, { withCredentials: true });
  return response.data;
};

export const sendMessage = async (receiverId, message) => {
  const response = await axios.post(`${API_URL}/messages/send/${receiverId}`, { message }, { withCredentials: true });
  return response.data;
};