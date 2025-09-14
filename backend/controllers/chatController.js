import { Conversation } from '../models/Conversation.js';
import { Achievement } from '../models/Achievement.js';
import { analyzer, stemmer, tokenizer, crisisKeywords, RESPONSE_TEMPLATES } from '../config/ai.js';

export class ChatController {
  static detectCrisis(text) {
    const lowerText = text.toLowerCase();
    return crisisKeywords.some(keyword => lowerText.includes(keyword));
  }

  static analyzeSentiment(text) {
    const tokens = tokenizer.tokenize(text);
    const stems = tokens.map(token => stemmer.stem(token));
    const score = analyzer.getSentiment(stems);
    
    if (score > 0.1) return 'positive';
    if (score < -0.1) return 'negative';
    return 'neutral';
  }

  static detectEmotionCategory(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    if (this.detectCrisis(lowerMessage)) return 'crisis';
    if (lowerMessage.includes('school') || lowerMessage.includes('exam') || lowerMessage.includes('grade') || lowerMessage.includes('study')) return 'academic';
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia')) return 'sleep';
    if (lowerMessage.includes('social') || lowerMessage.includes('friend') || lowerMessage.includes('lonely')) return 'social';
    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure')) return 'stress';
    if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('panic')) return 'anxiety';
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) return 'sadness';
    
    return 'default';
  }

  static generateResponse(userMessage) {
    const emotionCategory = this.detectEmotionCategory(userMessage);
    const responseTemplate = RESPONSE_TEMPLATES[emotionCategory];
    
    return {
      message: responseTemplate.message,
      isCrisis: emotionCategory === 'crisis',
      suggestions: responseTemplate.suggestions
    };
  }

  static async chat(req, res) {
    try {
      const { message } = req.body;
      const userId = req.user.id;

      const response = this.generateResponse(message);
      
      // Save conversation
      const fullConversation = [
        { role: 'user', content: message },
        { role: 'assistant', content: response.message }
      ];
      
      const sentiment = this.analyzeSentiment(message);
      const crisisDetected = this.detectCrisis(message);
      
      await Conversation.create({
        userId,
        title: 'Mental Health Chat',
        messages: fullConversation,
        sentiment,
        crisisDetected
      });

      // Award achievement for chatting
      try {
        await Achievement.create({
          userId,
          achievementType: 'chat',
          achievementName: 'Active Communicator',
          points: 5
        });
      } catch (error) {
        console.error('Error awarding achievement:', error);
      }
      
      res.json(response);
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ error: 'Failed to generate response' });
    }
  }

  static async getConversations(req, res) {
    try {
      const conversations = await Conversation.findByUserId(req.user.id);
      res.json(conversations);
    } catch (error) {
      console.error('Get conversations error:', error);
      res.status(500).json({ error: 'Failed to get conversations' });
    }
  }
}
