import db from '../config/database.js';

export class Conversation {
  static async create(conversationData) {
    const { userId, title, messages, sentiment, crisisDetected } = conversationData;
    
    return new Promise((resolve, reject) => {
      db.getConnection().run(
        'INSERT INTO conversations (user_id, title, messages, sentiment, crisis_detected) VALUES (?, ?, ?, ?, ?)',
        [userId, title, JSON.stringify(messages), sentiment, crisisDetected],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ 
              id: this.lastID, 
              userId, 
              title, 
              messages, 
              sentiment, 
              crisisDetected 
            });
          }
        }
      );
    });
  }

  static async findByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.getConnection().all(
        'SELECT * FROM conversations WHERE user_id = ? ORDER BY created_at DESC',
        [userId],
        (err, conversations) => {
          if (err) {
            reject(err);
          } else {
            const formattedConversations = conversations.map(conv => ({
              ...conv,
              messages: JSON.parse(conv.messages)
            }));
            resolve(formattedConversations);
          }
        }
      );
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.getConnection().get(
        'SELECT * FROM conversations WHERE id = ?',
        [id],
        (err, conversation) => {
          if (err) {
            reject(err);
          } else if (conversation) {
            resolve({
              ...conversation,
              messages: JSON.parse(conversation.messages)
            });
          } else {
            resolve(null);
          }
        }
      );
    });
  }
}
