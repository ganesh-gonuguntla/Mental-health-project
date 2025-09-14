import { Counselor } from '../models/Counselor.js';

export class CounselorController {
  static async getCounselors(req, res) {
    try {
      const counselors = await Counselor.findAll();
      res.json(counselors);
    } catch (error) {
      console.error('Get counselors error:', error);
      res.status(500).json({ error: 'Failed to get counselors' });
    }
  }

  static async getCounselorById(req, res) {
    try {
      const { id } = req.params;
      const counselor = await Counselor.findById(id);
      
      if (!counselor) {
        return res.status(404).json({ error: 'Counselor not found' });
      }

      res.json(counselor);
    } catch (error) {
      console.error('Get counselor by ID error:', error);
      res.status(500).json({ error: 'Failed to get counselor' });
    }
  }

  static async createCounselor(req, res) {
    try {
      const { name, email, specialization, university, availability, bio } = req.body;
      
      const counselor = await Counselor.create({
        name,
        email,
        specialization,
        university,
        availability,
        bio
      });

      res.status(201).json(counselor);
    } catch (error) {
      console.error('Create counselor error:', error);
      res.status(500).json({ error: 'Failed to create counselor' });
    }
  }
}
