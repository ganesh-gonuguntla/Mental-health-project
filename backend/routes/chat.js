import express from 'express';
import { ChatController } from '../controllers/chatController.js';
import { authenticateToken } from '../config/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.post('/', ChatController.chat);
router.get('/conversations', ChatController.getConversations);

export default router;
