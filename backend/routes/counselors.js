import express from 'express';
import { CounselorController } from '../controllers/counselorController.js';
import { authenticateToken } from '../config/auth.js';

const router = express.Router();

// Public routes
router.get('/', CounselorController.getCounselors);
router.get('/:id', CounselorController.getCounselorById);

// Protected routes (admin functionality)
router.post('/', authenticateToken, CounselorController.createCounselor);

export default router;
