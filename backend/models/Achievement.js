import db from '../config/database.js';

export class Achievement {
  static async create(achievementData) {
    const { userId, achievementType, achievementName, points } = achievementData;
    
    return new Promise((resolve, reject) => {
      db.getConnection().run(
        'INSERT INTO achievements (user_id, achievement_type, achievement_name, points) VALUES (?, ?, ?, ?)',
        [userId, achievementType, achievementName, points],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ 
              id: this.lastID, 
              userId, 
              achievementType, 
              achievementName, 
              points 
            });
          }
        }
      );
    });
  }

  static async findByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.getConnection().all(
        'SELECT * FROM achievements WHERE user_id = ? ORDER BY created_at DESC',
        [userId],
        (err, achievements) => {
          if (err) {
            reject(err);
          } else {
            resolve(achievements);
          }
        }
      );
    });
  }

  static async getTotalPoints(userId) {
    return new Promise((resolve, reject) => {
      db.getConnection().get(
        'SELECT SUM(points) as total FROM achievements WHERE user_id = ?',
        [userId],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result?.total || 0);
          }
        }
      );
    });
  }
}
