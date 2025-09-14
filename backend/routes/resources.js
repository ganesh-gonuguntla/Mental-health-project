import express from 'express';
import { ResourceController } from '../controllers/resourceController.js';
import { authenticateToken } from '../config/auth.js';

const router = express.Router();

// Public routes
router.get('/', ResourceController.getResources);
router.get('/:id', ResourceController.getResourceById);

// Protected routes (admin functionality)
router.post('/', authenticateToken, ResourceController.createResource);

export default router;
