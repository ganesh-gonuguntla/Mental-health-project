import express from 'express';
import { AchievementController } from '../controllers/achievementController.js';
import { authenticateToken } from '../config/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.get('/', AchievementController.getAchievements);
router.post('/', AchievementController.createAchievement);

export default router;
