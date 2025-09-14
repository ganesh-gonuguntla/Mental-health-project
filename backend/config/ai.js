import natural from 'natural';

export const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
export const stemmer = natural.PorterStemmer;
export const tokenizer = new natural.WordTokenizer();

export const crisisKeywords = [
  'kill myself', 'suicide', 'end it all', 'not worth living', 'want to die',
  'harm myself', 'hurt myself', 'end my life', 'no point', 'hopeless'
];

export const RESPONSE_TEMPLATES = {
  crisis: {
    message: "I'm really concerned about what you're sharing with me. You don't have to go through this alone. Please reach out to a counselor or crisis hotline right away. The National Suicide Prevention Lifeline is 988 (available 24/7). Your life has value, and there are people who want to help you through this difficult time.",
    suggestions: ["Call 988 (National Suicide Prevention Lifeline)", "Text HOME to 741741 (Crisis Text Line)", "Contact your university counseling center"]
  },
  stress: {
    message: "I hear that you're feeling stressed and overwhelmed. That's a really tough place to be. Remember, it's okay to take things one step at a time. You don't have to handle everything all at once. 💙",
    suggestions: ["Try the 4-7-8 breathing technique", "Take a 5-minute walk outside", "Break your tasks into smaller chunks"]
  },
  sadness: {
    message: "I'm sorry you're feeling sad right now. These feelings are valid, and it takes courage to share them. You're not alone in this, and these feelings won't last forever. 🌱",
    suggestions: ["Write down 3 things you're grateful for", "Reach out to a friend", "Try a guided meditation"]
  },
  anxiety: {
    message: "Anxiety can feel really overwhelming. You're doing great by reaching out and talking about it. Remember to breathe and take things one moment at a time. ✨",
    suggestions: ["Try the 5-4-3-2-1 grounding technique", "Practice progressive muscle relaxation", "Take slow, deep breaths"]
  },
  academic: {
    message: "Academic pressure can be really challenging. You're not alone in feeling this way. Remember that your worth isn't defined by grades or performance. 💙",
    suggestions: ["Break assignments into smaller tasks", "Take regular study breaks", "Reach out to professors or tutors"]
  },
  social: {
    message: "Social situations can feel difficult sometimes. It's completely normal to feel this way, and you're doing great by acknowledging these feelings. 🌱",
    suggestions: ["Start with small social interactions", "Join clubs or groups with similar interests", "Practice self-compassion"]
  },
  sleep: {
    message: "Sleep issues can really affect how you feel. You're taking a positive step by talking about it. Good sleep is so important for your mental health. ✨",
    suggestions: ["Create a consistent bedtime routine", "Avoid screens 1 hour before bed", "Try relaxation techniques before sleep"]
  },
  default: {
    message: "Thank you for sharing that with me. I'm here to listen and support you. How are you feeling right now? Sometimes just talking about what's on your mind can help lighten the load. 💙",
    suggestions: ["Take a moment to breathe deeply", "Consider what would feel good right now", "Remember that it's okay to ask for help"]
  }
};
