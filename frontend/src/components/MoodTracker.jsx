import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, Calendar, TrendingUp, Award, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function MoodTracker() {
  const [moodData, setMoodData] = useState([]);
  const [currentMood, setCurrentMood] = useState({
    moodScore: 0,
    stressLevel: 0,
    anxietyLevel: 0,
    notes: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const moodEmojis = [
    { score: 1, emoji: '😢', label: 'Very Low' },
    { score: 2, emoji: '😔', label: 'Low' },
    { score: 3, emoji: '😐', label: 'Below Average' },
    { score: 4, emoji: '🙁', label: 'Below Average' },
    { score: 5, emoji: '😑', label: 'Neutral' },
    { score: 6, emoji: '🙂', label: 'Above Average' },
    { score: 7, emoji: '😊', label: 'Good' },
    { score: 8, emoji: '😄', label: 'Very Good' },
    { score: 9, emoji: '🤩', label: 'Excellent' },
    { score: 10, emoji: '🥰', label: 'Amazing' }
  ];

  useEffect(() => {
    fetchMoodData();
  }, []);

  const fetchMoodData = async () => {
    try {
      const response = await axios.get('/api/mood?days=30');
      setMoodData(response.data);
    } catch (error) {
      console.error('Error fetching mood data:', error);
    }
  };

  const handleMoodSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/mood', currentMood);
      setSubmitted(true);
      setShowForm(false);
      setCurrentMood({ moodScore: 0, stressLevel: 0, anxietyLevel: 0, notes: '' });
      
      // Refresh data
      await fetchMoodData();
      
      // Show success message for 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting mood:', error);
      alert('Failed to save mood entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getMoodColor = (score) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-blue-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStreakDays = () => {
    if (moodData.length === 0) return 0;
    
    const sortedEntries = moodData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
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

  const getAverageMood = () => {
    if (moodData.length === 0) return 0;
    return Math.round((moodData.reduce((sum, entry) => sum + entry.mood_score, 0) / moodData.length) * 10) / 10;
  };

  const chartData = moodData.slice(0, 14).reverse().map(entry => ({
    date: new Date(entry.created_at).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }),
    mood: entry.mood_score,
    stress: entry.stress_level,
    anxiety: entry.anxiety_level
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mood Tracker</h1>
        <p className="text-lg text-gray-600">Track your emotional well-being and build healthy habits</p>
      </div>

      {/* Success Message */}
      {submitted && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
            <p className="text-green-800 font-medium">Mood entry saved successfully! 🎉</p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Streak</p>
              <p className="text-2xl font-bold text-orange-600">{getStreakDays()} days</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Mood</p>
              <p className="text-2xl font-bold text-blue-600">{getAverageMood()}/10</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Entries</p>
              <p className="text-2xl font-bold text-purple-600">{moodData.length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Heart className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Check-in Button */}
      {!showForm && (
        <div className="text-center mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Heart className="inline-block h-6 w-6 mr-2" />
            Check In Now
          </button>
        </div>
      )}

      {/* Mood Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How are you feeling today?</h2>
          
          <form onSubmit={handleMoodSubmit} className="space-y-6">
            {/* Mood Score */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-4">
                Overall Mood (1-10)
              </label>
              <div className="grid grid-cols-5 gap-4">
                {moodEmojis.map((mood) => (
                  <button
                    key={mood.score}
                    type="button"
                    onClick={() => setCurrentMood({...currentMood, moodScore: mood.score})}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      currentMood.moodScore === mood.score
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{mood.emoji}</div>
                    <div className="text-sm font-medium text-gray-700">{mood.score}</div>
                    <div className="text-xs text-gray-500">{mood.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Stress Level */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Stress Level (1-10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={currentMood.stressLevel}
                onChange={(e) => setCurrentMood({...currentMood, stressLevel: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Low</span>
                <span className="font-medium">{currentMood.stressLevel}</span>
                <span>High</span>
              </div>
            </div>

            {/* Anxiety Level */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Anxiety Level (1-10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={currentMood.anxietyLevel}
                onChange={(e) => setCurrentMood({...currentMood, anxietyLevel: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Low</span>
                <span className="font-medium">{currentMood.anxietyLevel}</span>
                <span>High</span>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={currentMood.notes}
                onChange={(e) => setCurrentMood({...currentMood, notes: e.target.value})}
                placeholder="How are you feeling? What's on your mind?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows="3"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading || currentMood.moodScore === 0}
                className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Entry'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 btn-secondary py-3"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mood Chart */}
      {moodData.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Mood Trend (Last 14 Days)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
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
                  name="Mood"
                />
                <Line 
                  type="monotone" 
                  dataKey="stress" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
                  name="Stress"
                />
                <Line 
                  type="monotone" 
                  dataKey="anxiety" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
                  name="Anxiety"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recent Entries */}
      {moodData.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Entries</h2>
          <div className="space-y-4">
            {moodData.slice(0, 5).map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{moodEmojis.find(m => m.score === entry.mood_score)?.emoji}</div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Mood: <span className={getMoodColor(entry.mood_score)}>{entry.mood_score}/10</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Stress: {entry.stress_level}/10 • Anxiety: {entry.anxiety_level}/10
                    </p>
                    {entry.notes && (
                      <p className="text-sm text-gray-700 mt-1 italic">"{entry.notes}"</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {new Date(entry.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(entry.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MoodTracker;
