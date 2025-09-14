import db from '../config/database.js';

export class Resource {
  static async create(resourceData) {
    const { title, content, type, category } = resourceData;
    
    return new Promise((resolve, reject) => {
      db.getConnection().run(
        'INSERT INTO resources (title, content, type, category) VALUES (?, ?, ?, ?)',
        [title, content, type, category],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ 
              id: this.lastID, 
              title, 
              content, 
              type, 
              category 
            });
          }
        }
      );
    });
  }

  static async findAll(filters = {}) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM resources';
      const params = [];
      const conditions = [];

      if (filters.category) {
        conditions.push('category = ?');
        params.push(filters.category);
      }

      if (filters.type) {
        conditions.push('type = ?');
        params.push(filters.type);
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      query += ' ORDER BY created_at DESC';

      db.getConnection().all(query, params, (err, resources) => {
        if (err) {
          reject(err);
        } else {
          resolve(resources);
        }
      });
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.getConnection().get(
        'SELECT * FROM resources WHERE id = ?',
        [id],
        (err, resource) => {
          if (err) {
            reject(err);
          } else {
            resolve(resource);
          }
        }
      );
    });
  }

  static async getCount() {
    return new Promise((resolve, reject) => {
      db.getConnection().get(
        'SELECT COUNT(*) as count FROM resources',
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
