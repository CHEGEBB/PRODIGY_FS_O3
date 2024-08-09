import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000'; // Updated to port 5000

let socket;

export const initSocket = () => {
  socket = io(SOCKET_URL, {
    withCredentials: true
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized. Call initSocket first.');
  }
  return socket;
};