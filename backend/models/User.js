import db from '../config/database.js';
import { hashPassword, comparePassword } from '../config/auth.js';

export class User {
  static async create(userData) {
    const { email, password, firstName, lastName, university } = userData;
    const hashedPassword = hashPassword(password);
    
    return new Promise((resolve, reject) => {
      db.getConnection().run(
        'INSERT INTO users (email, password, first_name, last_name, university) VALUES (?, ?, ?, ?, ?)',
        [email, hashedPassword, firstName, lastName, university],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, email, firstName, lastName, university });
          }
        }
      );
    });
  }

  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.getConnection().get(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, user) => {
          if (err) {
            reject(err);
          } else {
            resolve(user);
          }
        }
      );
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.getConnection().get(
        'SELECT id, email, first_name, last_name, university, created_at FROM users WHERE id = ?',
        [id],
        (err, user) => {
          if (err) {
            reject(err);
          } else {
            resolve(user);
          }
        }
      );
    });
  }

  static async validatePassword(user, password) {
    return comparePassword(password, user.password);
  }
}
