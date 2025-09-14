import { Appointment } from '../models/Appointment.js';

export class AppointmentController {
  static async createAppointment(req, res) {
    try {
      const { counselorId, appointmentDate, appointmentTime, notes } = req.body;
      const userId = req.user.id;

      const appointment = await Appointment.create({
        userId,
        counselorId,
        appointmentDate,
        appointmentTime,
        notes
      });

      res.status(201).json({ success: true, id: appointment.id });
    } catch (error) {
      console.error('Create appointment error:', error);
      res.status(500).json({ error: 'Failed to book appointment' });
    }
  }

  static async getAppointments(req, res) {
    try {
      const appointments = await Appointment.findByUserId(req.user.id);
      res.json(appointments);
    } catch (error) {
      console.error('Get appointments error:', error);
      res.status(500).json({ error: 'Failed to get appointments' });
    }
  }

  static async getAppointmentById(req, res) {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findById(id);
      
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      res.json(appointment);
    } catch (error) {
      console.error('Get appointment by ID error:', error);
      res.status(500).json({ error: 'Failed to get appointment' });
    }
  }

  static async updateAppointmentStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const appointment = await Appointment.updateStatus(id, status);
      res.json({ success: true, appointment });
    } catch (error) {
      console.error('Update appointment status error:', error);
      res.status(500).json({ error: 'Failed to update appointment' });
    }
  }
}
