import express from 'express';

const router = express.router();

// TODO: Implement routes for creating, reading, updating, and deleting messages

router.post('/send/:id', sendMessage);

export default router;