import { Achievement } from '../models/Achievement.js';

export class AchievementController {
  static async getAchievements(req, res) {
    try {
      const achievements = await Achievement.findByUserId(req.user.id);
      const totalPoints = await Achievement.getTotalPoints(req.user.id);
      
      res.json({
        achievements,
        totalPoints,
        totalCount: achievements.length
      });
    } catch (error) {
      console.error('Get achievements error:', error);
      res.status(500).json({ error: 'Failed to get achievements' });
    }
  }

  static async createAchievement(req, res) {
    try {
      const { achievementType, achievementName, points } = req.body;
      const userId = req.user.id;

      const achievement = await Achievement.create({
        userId,
        achievementType,
        achievementName,
        points
      });

      res.status(201).json(achievement);
    } catch (error) {
      console.error('Create achievement error:', error);
      res.status(500).json({ error: 'Failed to create achievement' });
    }
  }
}
