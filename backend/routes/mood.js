import express from 'express';
import { MoodController } from '../controllers/moodController.js';
import { authenticateToken } from '../config/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.post('/', MoodController.createMoodEntry);
router.get('/', MoodController.getMoodEntries);
router.get('/stats', MoodController.getMoodStats);

export default router;
