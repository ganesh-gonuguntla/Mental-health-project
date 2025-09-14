import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Trophy, 
  Award, 
  Star, 
  Target, 
  Calendar, 
  Heart, 
  MessageCircle, 
  BookOpen,
  Zap,
  Crown,
  Medal,
  Gift
} from 'lucide-react';

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState({
    totalPoints: 0,
    totalAchievements: 0,
    currentStreak: 0,
    level: 1
  });

  const achievementTypes = {
    tracking: { icon: Heart, color: 'text-pink-600', bgColor: 'bg-pink-100' },
    chat: { icon: MessageCircle, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    resource: { icon: BookOpen, color: 'text-green-600', bgColor: 'bg-green-100' },
    streak: { icon: Zap, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    milestone: { icon: Crown, color: 'text-purple-600', bgColor: 'bg-purple-100' }
  };

  const predefinedAchievements = [
    {
      id: 'first_checkin',
      name: 'First Steps',
      description: 'Complete your first mood check-in',
      icon: Heart,
      points: 10,
      type: 'tracking',
      unlocked: false
    },
    {
      id: 'week_streak',
      name: 'Week Warrior',
      description: 'Maintain a 7-day mood tracking streak',
      icon: Calendar,
      points: 50,
      type: 'streak',
      unlocked: false
    },
    {
      id: 'month_streak',
      name: 'Monthly Master',
      description: 'Maintain a 30-day mood tracking streak',
      icon: Calendar,
      points: 100,
      type: 'streak',
      unlocked: false
    },
    {
      id: 'chat_explorer',
      name: 'Chat Explorer',
      description: 'Have 10 conversations with your AI companion',
      icon: MessageCircle,
      points: 25,
      type: 'chat',
      unlocked: false
    },
    {
      id: 'resource_reader',
      name: 'Knowledge Seeker',
      description: 'Explore 5 mental health resources',
      icon: BookOpen,
      points: 30,
      type: 'resource',
      unlocked: false
    },
    {
      id: 'consistent_tracker',
      name: 'Consistent Tracker',
      description: 'Track your mood for 14 consecutive days',
      icon: Target,
      points: 75,
      type: 'tracking',
      unlocked: false
    },
    {
      id: 'mindful_student',
      name: 'Mindful Student',
      description: 'Complete 20 mood check-ins',
      icon: Star,
      points: 40,
      type: 'tracking',
      unlocked: false
    },
    {
      id: 'wellness_champion',
      name: 'Wellness Champion',
      description: 'Achieve an average mood score of 8+ for a week',
      icon: Crown,
      points: 60,
      type: 'milestone',
      unlocked: false
    }
  ];

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await axios.get('/api/achievements');
      const userAchievements = response.data;
      
      setAchievements(userAchievements);
      
      // Calculate stats
      const totalPoints = userAchievements.reduce((sum, achievement) => sum + achievement.points, 0);
      const totalAchievements = userAchievements.length;
      const level = Math.floor(totalPoints / 100) + 1;
      
      setStats({
        totalPoints,
        totalAchievements,
        currentStreak: 0, // This would need to be calculated from mood data
        level
      });
      
      // Check for new achievements (this would need more sophisticated logic)
      checkForNewAchievements(userAchievements);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const checkForNewAchievements = (userAchievements) => {
    // This is a simplified version - in a real app, you'd check against actual user data
    // For now, we'll just show some predefined achievements as unlocked
    const unlockedAchievements = predefinedAchievements.map(achievement => ({
      ...achievement,
      unlocked: userAchievements.some(userAch => userAch.achievement_name === achievement.name)
    }));
    
    // You could trigger notifications here for newly unlocked achievements
  };

  const getLevelColor = (level) => {
    if (level >= 10) return 'text-purple-600';
    if (level >= 5) return 'text-blue-600';
    if (level >= 3) return 'text-green-600';
    return 'text-orange-600';
  };

  const getLevelTitle = (level) => {
    if (level >= 10) return 'Mental Health Master';
    if (level >= 5) return 'Wellness Warrior';
    if (level >= 3) return 'Mindful Explorer';
    return 'Wellness Beginner';
  };

  const getProgressToNextLevel = () => {
    const currentLevelPoints = (stats.level - 1) * 100;
    const nextLevelPoints = stats.level * 100;
    const progress = ((stats.totalPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
    return Math.min(progress, 100);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievements</h1>
        <p className="text-lg text-gray-600">Celebrate your mental health journey milestones</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Level</p>
              <p className={`text-2xl font-bold ${getLevelColor(stats.level)}`}>
                {stats.level}
              </p>
              <p className="text-xs text-gray-500">{getLevelTitle(stats.level)}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Crown className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Points</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalPoints}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-green-600">{stats.totalAchievements}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Trophy className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Streak</p>
              <p className="text-2xl font-bold text-orange-600">{stats.currentStreak} days</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Zap className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Level Progress</h2>
          <span className="text-sm text-gray-600">
            {stats.totalPoints}/{(stats.level) * 100} points to level {stats.level + 1}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${getProgressToNextLevel()}%` }}
          ></div>
        </div>
      </div>

      {/* Recent Achievements */}
      {achievements.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Achievements</h2>
          <div className="space-y-4">
            {achievements.slice(0, 5).map((achievement, index) => {
              const typeInfo = achievementTypes[achievement.achievement_type] || achievementTypes.tracking;
              const Icon = typeInfo.icon;
              return (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`p-3 rounded-lg ${typeInfo.bgColor}`}>
                    <Icon className={`h-6 w-6 ${typeInfo.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{achievement.achievement_name}</h3>
                    <p className="text-sm text-gray-600">+{achievement.points} points</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(achievement.created_at).toLocaleDateString()}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium text-yellow-600">Unlocked!</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All Available Achievements */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {predefinedAchievements.map((achievement, index) => {
            const typeInfo = achievementTypes[achievement.type];
            const Icon = achievement.icon;
            const isUnlocked = achievements.some(userAch => userAch.achievement_name === achievement.name);
            
            return (
              <div 
                key={index} 
                className={`p-6 rounded-xl border-2 transition-all ${
                  isUnlocked 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${isUnlocked ? typeInfo.bgColor : 'bg-gray-100'}`}>
                    <Icon className={`h-6 w-6 ${isUnlocked ? typeInfo.color : 'text-gray-400'}`} />
                  </div>
                  {isUnlocked && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-xs font-medium text-yellow-600">Unlocked</span>
                    </div>
                  )}
                </div>
                
                <h3 className={`font-semibold mb-2 ${isUnlocked ? 'text-gray-900' : 'text-gray-700'}`}>
                  {achievement.name}
                </h3>
                
                <p className={`text-sm mb-4 ${isUnlocked ? 'text-gray-600' : 'text-gray-500'}`}>
                  {achievement.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${isUnlocked ? 'text-green-600' : 'text-gray-500'}`}>
                    {achievement.points} points
                  </span>
                  {isUnlocked && (
                    <Medal className="h-5 w-5 text-yellow-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivation Section */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center">
        <Gift className="h-12 w-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Keep Going!</h2>
        <p className="text-blue-100 mb-4">
          Every step you take toward better mental health is worth celebrating. 
          Continue your journey and unlock more achievements!
        </p>
        <div className="text-sm text-blue-200">
          Next milestone: {100 - (stats.totalPoints % 100)} more points to level up!
        </div>
      </div>
    </div>
  );
}

export default Achievements;
