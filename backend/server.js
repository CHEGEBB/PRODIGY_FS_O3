import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js";

const app = express();

const PORT =process.env.port

app.listen(PORT, (err, res) =>{
    if(err) throw err;
    console.log('Server running on port 5000');
})

app.use('/api/auth', authRoutes);