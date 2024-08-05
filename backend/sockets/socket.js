// Import required modules
import { Server } from "socket.io";
import http from "http";
import express from "express";

// Initialize Express app
const app = express();

// Create HTTP server and Socket.io instance
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"], // Allow connections from this origin
        methods: ["GET", "POST"], // Allow these HTTP methods
    },
});

// Object to store user ID to socket ID mappings
const userSocketMap = {}; // {userId: socketId}

// Function to get a user's socket ID by their user ID
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

// Handle new socket connections
io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    // Get user ID from the connection query parameters
    const userId = socket.handshake.query.userId;
    
    // If userId is valid, store the mapping
    if (userId !== "undefined") userSocketMap[userId] = socket.id;

    // Broadcast the list of online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Handle socket disconnection
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        // Remove the user from the socket map
        delete userSocketMap[userId];
        // Update all clients with the new list of online users
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// Export the app, io, and server for use in other parts of the application
export { app, io, server };