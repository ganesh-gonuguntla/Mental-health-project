import db from '../config/database.js';

export class Counselor {
  static async create(counselorData) {
    const { name, email, specialization, university, availability, bio } = counselorData;
    
    return new Promise((resolve, reject) => {
      db.getConnection().run(
        'INSERT INTO counselors (name, email, specialization, university, availability, bio) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, specialization, university, availability, bio],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ 
              id: this.lastID, 
              name, 
              email, 
              specialization, 
              university, 
              availability, 
              bio 
            });
          }
        }
      );
    });
  }

  static async findAll() {
    return new Promise((resolve, reject) => {
      db.getConnection().all(
        'SELECT * FROM counselors ORDER BY name',
        (err, counselors) => {
          if (err) {
            reject(err);
          } else {
            resolve(counselors);
          }
        }
      );
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.getConnection().get(
        'SELECT * FROM counselors WHERE id = ?',
        [id],
        (err, counselor) => {
          if (err) {
            reject(err);
          } else {
            resolve(counselor);
          }
        }
      );
    });
  }

  static async getCount() {
    return new Promise((resolve, reject) => {
      db.getConnection().get(
        'SELECT COUNT(*) as count FROM counselors',
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.count);
          }
        }
      );
    });
  }
}
