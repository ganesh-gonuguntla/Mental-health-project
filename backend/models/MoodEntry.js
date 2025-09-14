import db from '../config/database.js';

export class MoodEntry {
  static async create(moodData) {
    const { userId, moodScore, stressLevel, anxietyLevel, notes } = moodData;
    
    return new Promise((resolve, reject) => {
      db.getConnection().run(
        'INSERT INTO mood_entries (user_id, mood_score, stress_level, anxiety_level, notes) VALUES (?, ?, ?, ?, ?)',
        [userId, moodScore, stressLevel, anxietyLevel, notes],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ 
              id: this.lastID, 
              userId, 
              moodScore, 
              stressLevel, 
              anxietyLevel, 
              notes 
            });
          }
        }
      );
    });
  }

  static async findByUserId(userId, days = 30) {
    return new Promise((resolve, reject) => {
      db.getConnection().all(
        `SELECT * FROM mood_entries 
         WHERE user_id = ? AND created_at >= datetime('now', '-${days} days')
         ORDER BY created_at DESC`,
        [userId],
        (err, entries) => {
          if (err) {
            reject(err);
          } else {
            resolve(entries);
          }
        }
      );
    });
  }

  static async getStreakDays(userId) {
    return new Promise((resolve, reject) => {
      db.getConnection().all(
        'SELECT * FROM mood_entries WHERE user_id = ? ORDER BY created_at DESC',
        [userId],
        (err, entries) => {
          if (err) {
            reject(err);
          } else {
            if (entries.length === 0) {
              resolve(0);
              return;
            }
            
            let streak = 0;
            let currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            for (const entry of entries) {
              const entryDate = new Date(entry.created_at);
              entryDate.setHours(0, 0, 0, 0);
              
              const diffTime = currentDate - entryDate;
              const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
              
              if (diffDays === streak) {
                streak++;
              } else if (diffDays === streak + 1) {
                currentDate = entryDate;
                streak++;
              } else {
                break;
              }
            }
            
            resolve(streak);
          }
        }
      );
    });
  }
}
