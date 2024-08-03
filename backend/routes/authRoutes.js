import express from 'express';
import { login, logout, signup } from '../controllers/auth.contollers.js';

const router = express.Router();


router.post('/api/auth/login', login);

router.post('/signup', signup);

router.post('/api/auth/logout', logout);


export default router;