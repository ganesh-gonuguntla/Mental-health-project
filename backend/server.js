
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import moodRoutes from './routes/mood.js';
import resourceRoutes from './routes/resources.js';
import counselorRoutes from './routes/counselors.js';
import appointmentRoutes from './routes/appointments.js';
import achievementRoutes from './routes/achievements.js';

// Import database and initialization
import db from './config/database.js';
import { Resource } from './models/Resource.js';
import { Counselor } from './models/Counselor.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/counselors', counselorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/achievements', achievementRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Mental Health Support Server is running',
    version: '1.0.0',
    aiProvider: 'rule-based'
  });
});

// Initialize sample data
async function initializeSampleData() {
  try {
    const resourceCount = await Resource.getCount();
    if (resourceCount === 0) {
      const resources = [
        { title: '4-7-8 Breathing Technique', content: 'Inhale for 4 counts, hold for 7 counts, exhale for 8 counts. Repeat 4 times.', type: 'exercise', category: 'breathing' },
        { title: '5-4-3-2-1 Grounding Technique', content: 'Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.', type: 'exercise', category: 'grounding' },
        { title: 'Managing Academic Stress', content: 'Break tasks into smaller chunks, use a planner, take regular breaks, and remember that perfection is not required.', type: 'article', category: 'stress' },
        { title: 'Building Healthy Sleep Habits', content: 'Maintain a consistent sleep schedule, avoid screens 1 hour before bed, and create a relaxing bedtime routine.', type: 'article', category: 'sleep' }
      ];
      for (const resource of resources) await Resource.create(resource);
    }

    const counselorCount = await Counselor.getCount();
    if (counselorCount === 0) {
      const counselors = [
        { name: 'Dr. Sarah Johnson', email: 'sarah.johnson@university.edu', specialization: 'Anxiety & Depression', university: 'University Counseling Center', availability: 'Monday-Friday, 9AM-5PM', bio: 'Licensed clinical psychologist with 10 years of experience helping students with anxiety, depression, and academic stress.' },
        { name: 'Dr. Michael Chen', email: 'michael.chen@university.edu', specialization: 'Academic & Career Counseling', university: 'University Counseling Center', availability: 'Tuesday-Thursday, 10AM-6PM', bio: 'Specializes in helping students navigate academic challenges, career planning, and work-life balance.' },
        { name: 'Dr. Emily Rodriguez', email: 'emily.rodriguez@university.edu', specialization: 'Trauma & Crisis Intervention', university: 'University Counseling Center', availability: 'Monday-Wednesday-Friday, 8AM-4PM', bio: 'Expert in trauma therapy and crisis intervention, providing immediate support for students in distress.' }
      ];
      for (const counselor of counselors) await Counselor.create(counselor);
    }
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
}

// Start server
app.listen(port, () => {
  console.log(`🧠 Mental Health Support Server running on port ${port}`);
  console.log(`💚 AI Provider: Rule-based (100% Free)`);
  console.log(`🔒 Privacy: All data stays on your server`);
  console.log(`📊 Features: Mood tracking, Chat support, Resources, Counselor booking`);
  
  // Initialize sample data
  initializeSampleData();
});
