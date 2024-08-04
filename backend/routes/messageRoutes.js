import express from 'express';
import { sendMessage } from '../controllers/messageController';

const router = express.router();

// TODO: Implement routes for creating, reading, updating, and deleting messages

router.post('/send/:id', sendMessage);

export default router;