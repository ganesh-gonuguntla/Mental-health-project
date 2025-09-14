# Mindful Campus - Mental Health Support System

A free, privacy-focused mental health support platform for students. Features rule-based empathetic chat, mood tracking, resources, and counselor booking - all running locally with no external API dependencies.

## 🌟 Features

- **🤖 Empathetic Chat**: Rule-based responses with crisis detection
- **📊 Mood Tracking**: Daily check-ins with beautiful charts
- **📚 Resource Library**: Mental health articles and exercises
- **👥 Counselor Booking**: Connect with licensed professionals
- **🏆 Achievements**: Gamified progress tracking
- **🔒 Privacy First**: All data stays on your server
- **💰 100% Free**: No API keys or subscriptions needed

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd hackathon-ai-chat
   
   # Install dependencies
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Setup environment**
   ```bash
   # In backend directory
   echo "JWT_SECRET=your_secret_key_here" > .env
   echo "PORT=5000" >> .env
   ```

3. **Start the application**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm start
   
   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

4. **Access the app**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 🏗️ Architecture

### Backend Structure
```
backend/
├── config/
│   ├── database.js     # SQLite database setup
│   ├── auth.js         # JWT authentication
│   └── ai.js           # Rule-based response templates
├── models/
│   ├── User.js         # User model
│   ├── Conversation.js # Chat history
│   ├── MoodEntry.js    # Mood tracking
│   ├── Achievement.js  # Gamification
│   ├── Resource.js     # Mental health resources
│   ├── Counselor.js    # Professional counselors
│   └── Appointment.js  # Booking system
├── controllers/
│   ├── authController.js
│   ├── chatController.js
│   ├── moodController.js
│   └── ... (other controllers)
├── routes/
│   ├── auth.js
│   ├── chat.js
│   └── ... (other routes)
└── server.js           # Main server file
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Chat.jsx
│   │   ├── MoodTracker.jsx
│   │   ├── Resources.jsx
│   │   ├── Counselor.jsx
│   │   └── Achievements.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   └── App.jsx
└── index.html
```

## 🔧 Key Features

### Chat System
- **Rule-based responses** tailored to 7 emotion categories
- **Crisis detection** with immediate emergency protocols
- **Empathetic tone** designed for mental health support
- **Contextual suggestions** for coping strategies

### Mood Tracking
- **Daily check-ins** with emoji selection (1-10 scale)
- **Stress & anxiety** level tracking
- **Visual charts** showing trends over time
- **Streak tracking** and achievement system

### Resources & Support
- **Mental health articles** and exercises
- **Counselor booking** system
- **Crisis resources** prominently displayed
- **Achievement gamification** for motivation

## 🔒 Privacy & Safety

- **100% Local**: All data stays on your server
- **No External APIs**: No data sent to third parties
- **Crisis Detection**: Immediate emergency response
- **Professional Boundaries**: Clear limitations and referrals

## 🛠️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User authentication |
| POST | `/api/chat` | Chat interaction |
| POST | `/api/mood` | Mood tracking entry |
| GET | `/api/mood` | Retrieve mood history |
| GET | `/api/resources` | Mental health resources |
| GET | `/api/counselors` | Available counselors |
| POST | `/api/appointments` | Book counselor session |

## 🚀 Deployment

### Local Development
```bash
# Start backend
cd backend && npm start

# Start frontend  
cd frontend && npm run dev
```

### Production
- Deploy backend to any Node.js hosting service
- Deploy frontend to Vercel, Netlify, or similar
- Update API URLs in frontend configuration

## 📄 License

MIT License - feel free to use and modify for your needs.

---

**⚠️ Important**: This platform supplements, not replaces, professional mental health care. Always seek professional help for serious concerns.
