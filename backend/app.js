import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT;

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

// Routes
app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

// Start server
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await connectToMongoDb();
});