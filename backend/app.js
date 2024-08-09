import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import messageRoutes from './routes/messageRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
const connectToMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB😊');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Only serve static files and use the catch-all route in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
    });
} else {
    // In development, we don't want to serve the frontend from the backend
    app.get('/', (req, res) => {
        res.send('Hello from the server!');
    });
}

// Start server
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await connectToMongoDb();
});