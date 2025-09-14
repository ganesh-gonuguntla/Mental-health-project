import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Heart, 
  MessageCircle, 
  TrendingUp, 
  Calendar,
  Brain,
  Award,
  Activity,
  Moon,
  Sun,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [moodData, setMoodData] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState({
    totalCheckIns: 0,
    currentStreak: 0,
    avgMood: 0,
    totalChats: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [moodResponse, achievementsResponse] = await Promise.all([
        axios.get('/api/mood?days=7'),
        axios.get('/api/achievements')
      ]);

      setMoodData(moodResponse.data);
      setAchievements(achievementsResponse.data);

      // Calculate stats
      const totalCheckIns = moodResponse.data.length;
      const currentStreak = calculateStreak(moodResponse.data);
      const avgMood = totalCheckIns > 0 
        ? moodResponse.data.reduce((sum, entry) => sum + entry.mood_score, 0) / totalCheckIns 
        : 0;

      setStats({
        totalCheckIns,
        currentStreak,
        avgMood: Math.round(avgMood * 10) / 10,
        totalChats: achievementsResponse.data.filter(a => a.achievement_type === 'chat').length
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const calculateStreak = (entries) => {
    if (entries.length === 0) return 0;
    
    const sortedEntries = entries.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const entry of sortedEntries) {
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
    
    return streak;
  };

  const getMoodEmoji = (score) => {
    if (score >= 8) return '😊';
    if (score >= 6) return '🙂';
    if (score >= 4) return '😐';
    if (score >= 2) return '😔';
    return '😢';
  };

  const getMotivationalMessage = () => {
    const { currentStreak, avgMood } = stats;
    
    if (currentStreak >= 7) {
      return "Amazing! You've been checking in for a whole week! 🌟";
    } else if (currentStreak >= 3) {
      return "Great job maintaining your streak! Keep it up! 💪";
    } else if (avgMood >= 7) {
      return "Your mood has been positive lately! That's wonderful! ✨";
    } else if (avgMood >= 5) {
      return "You're doing well! Remember, it's okay to have ups and downs. 🌱";
    } else {
      return "Every step forward counts. You're stronger than you think. 💙";
    }
  };

  const quickActions = [
    {
      title: 'Check In',
      description: 'How are you feeling today?',
      icon: Heart,
      link: '/mood',
      color: 'bg-pink-500 hover:bg-pink-600'
    },
    {
      title: 'Chat Support',
      description: 'Talk to your AI companion',
      icon: MessageCircle,
      link: '/chat',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Resources',
      description: 'Explore helpful content',
      icon: Brain,
      link: '/resources',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-lg text-gray-600">
          {getMotivationalMessage()}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Streak</p>
              <p className="text-2xl font-bold text-gray-900">{stats.currentStreak} days</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Zap className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Mood</p>
              <p className="text-2xl font-bold text-gray-900 flex items-center">
                {stats.avgMood > 0 ? `${stats.avgMood}/10` : 'N/A'}
                {stats.avgMood > 0 && (
                  <span className="ml-2 text-2xl">{getMoodEmoji(stats.avgMood)}</span>
                )}
              </p>
            </div>
            <div className="p-3 bg-pink-100 rounded-lg">
              <Heart className="h-6 w-6 text-pink-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Check-ins</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCheckIns}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-gray-900">{achievements.length}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mood Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Mood Trend (Last 7 Days)</h2>
            <Link 
              to="/mood" 
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View Details →
            </Link>
          </div>
          
          {moodData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodData.map(entry => ({
                  date: new Date(entry.created_at).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  }),
                  mood: entry.mood_score,
                  stress: entry.stress_level,
                  anxiety: entry.anxiety_level
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis stroke="#666" domain={[0, 10]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="stress" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="anxiety" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">No mood data yet</p>
                <p className="text-sm">Start tracking your mood to see trends here</p>
                <Link 
                  to="/mood" 
                  className="inline-block mt-4 btn-primary"
                >
                  Check In Now
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.link}
                    className={`block p-4 rounded-lg text-white transition-colors ${action.color}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-6 w-6" />
                      <div>
                        <p className="font-medium">{action.title}</p>
                        <p className="text-sm opacity-90">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Achievements */}
          {achievements.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Achievements</h2>
              <div className="space-y-3">
                {achievements.slice(0, 3).map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{achievement.achievement_name}</p>
                      <p className="text-sm text-gray-600">+{achievement.points} points</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                to="/achievements" 
                className="block mt-4 text-center text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View All →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
