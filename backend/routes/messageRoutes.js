import express from 'express';
import { sendMessage } from '../controllers/messageController.js';

const router = express.Router();

// TODO: Implement routes for creating, reading, updating, and deleting messages

router.post('/send/:id',protectRoute, sendMessage);

export default router;