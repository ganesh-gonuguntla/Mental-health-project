import { MoodEntry } from '../models/MoodEntry.js';
import { Achievement } from '../models/Achievement.js';

export class MoodController {
  static async createMoodEntry(req, res) {
    try {
      const { moodScore, stressLevel, anxietyLevel, notes } = req.body;
      const userId = req.user.id;

      const moodEntry = await MoodEntry.create({
        userId,
        moodScore,
        stressLevel,
        anxietyLevel,
        notes
      });

      // Award achievement for mood tracking
      try {
        await Achievement.create({
          userId,
          achievementType: 'tracking',
          achievementName: 'Daily Check-in',
          points: 10
        });
      } catch (error) {
        console.error('Error awarding achievement:', error);
      }

      res.json({ success: true, id: moodEntry.id });
    } catch (error) {
      console.error('Create mood entry error:', error);
      res.status(500).json({ error: 'Failed to save mood entry' });
    }
  }

  static async getMoodEntries(req, res) {
    try {
      const { days = 30 } = req.query;
      const moodEntries = await MoodEntry.findByUserId(req.user.id, days);
      res.json(moodEntries);
    } catch (error) {
      console.error('Get mood entries error:', error);
      res.status(500).json({ error: 'Failed to get mood entries' });
    }
  }

  static async getMoodStats(req, res) {
    try {
      const { days = 30 } = req.query;
      const moodEntries = await MoodEntry.findByUserId(req.user.id, days);
      const streakDays = await MoodEntry.getStreakDays(req.user.id);

      const totalEntries = moodEntries.length;
      const averageMood = totalEntries > 0 
        ? moodEntries.reduce((sum, entry) => sum + entry.mood_score, 0) / totalEntries 
        : 0;

      res.json({
        totalEntries,
        streakDays,
        averageMood: Math.round(averageMood * 10) / 10,
        recentEntries: moodEntries.slice(0, 7)
      });
    } catch (error) {
      console.error('Get mood stats error:', error);
      res.status(500).json({ error: 'Failed to get mood statistics' });
    }
  }
}
