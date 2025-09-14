import express from 'express';
import { AppointmentController } from '../controllers/appointmentController.js';
import { authenticateToken } from '../config/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.post('/', AppointmentController.createAppointment);
router.get('/', AppointmentController.getAppointments);
router.get('/:id', AppointmentController.getAppointmentById);
router.put('/:id/status', AppointmentController.updateAppointmentStatus);

export default router;
