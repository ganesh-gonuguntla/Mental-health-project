import { User } from '../models/User.js';
import { generateToken } from '../config/auth.js';
import emailService from '../services/emailService.js';

export class AuthController {
  static async register(req, res) {
    try {
      console.log('Registration request received:', req.body);
      const { email, password, firstName, lastName, university } = req.body;

      // Validate required fields
      if (!email || !password || !firstName || !lastName || !university) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Create new user
      console.log('Creating user with data:', { email, firstName, lastName, university });
      const user = await User.create({ email, password, firstName, lastName, university });
      console.log('User created successfully:', user);
      
      // Send welcome email
      try {
        const emailResult = await emailService.sendWelcomeEmail({ firstName, lastName, email, university });
        console.log('Welcome email result:', emailResult);
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
        // Don't fail registration if email fails
      }
      
      res.json({ success: true, user: { id: user.id, email: user.email } });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed: ' + error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      // Validate password
      const isValidPassword = await User.validatePassword(user, password);
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      // Generate token
      const token = generateToken({ id: user.id, email: user.email });
      res.json({ token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  }

  static async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ error: 'Failed to get profile' });
    }
  }
}
