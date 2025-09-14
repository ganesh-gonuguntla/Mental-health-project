import db from '../config/database.js';

export class Appointment {
  static async create(appointmentData) {
    const { userId, counselorId, appointmentDate, appointmentTime, notes } = appointmentData;
    
    return new Promise((resolve, reject) => {
      db.getConnection().run(
        'INSERT INTO appointments (user_id, counselor_id, appointment_date, appointment_time, notes) VALUES (?, ?, ?, ?, ?)',
        [userId, counselorId, appointmentDate, appointmentTime, notes],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ 
              id: this.lastID, 
              userId, 
              counselorId, 
              appointmentDate, 
              appointmentTime, 
              notes,
              status: 'scheduled'
            });
          }
        }
      );
    });
  }

  static async findByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.getConnection().all(
        `SELECT a.*, c.name as counselor_name, c.specialization 
         FROM appointments a 
         JOIN counselors c ON a.counselor_id = c.id 
         WHERE a.user_id = ? 
         ORDER BY a.appointment_date, a.appointment_time`,
        [userId],
        (err, appointments) => {
          if (err) {
            reject(err);
          } else {
            resolve(appointments);
          }
        }
      );
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.getConnection().get(
        'SELECT * FROM appointments WHERE id = ?',
        [id],
        (err, appointment) => {
          if (err) {
            reject(err);
          } else {
            resolve(appointment);
          }
        }
      );
    });
  }

  static async updateStatus(id, status) {
    return new Promise((resolve, reject) => {
      db.getConnection().run(
        'UPDATE appointments SET status = ? WHERE id = ?',
        [status, id],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id, status });
          }
        }
      );
    });
  }
}
