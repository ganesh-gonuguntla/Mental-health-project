import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    // For development, we'll use a test account
    // In production, you would use real SMTP credentials
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'ethereal.user@ethereal.email',
        pass: 'ethereal.pass'
      }
    });
  }

  async sendWelcomeEmail(userData) {
    const { firstName, lastName, email, university } = userData;
    
    const mailOptions = {
      from: '"Mindful Campus" <welcome@mindfulcampus.com>',
      to: email,
      subject: '🎉 Welcome to Mindful Campus - Your Mental Health Journey Starts Here!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Mindful Campus</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .container {
              background: white;
              border-radius: 20px;
              padding: 40px;
              box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 2.5em;
              font-weight: bold;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 10px;
            }
            .welcome-text {
              font-size: 1.8em;
              color: #4a5568;
              margin-bottom: 20px;
            }
            .content {
              margin-bottom: 30px;
            }
            .feature {
              display: flex;
              align-items: center;
              margin: 15px 0;
              padding: 15px;
              background: #f7fafc;
              border-radius: 10px;
              border-left: 4px solid #667eea;
            }
            .feature-icon {
              font-size: 1.5em;
              margin-right: 15px;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 25px;
              font-weight: bold;
              text-align: center;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              color: #718096;
              font-size: 0.9em;
            }
            .crisis-info {
              background: #fed7d7;
              border: 1px solid #feb2b2;
              border-radius: 10px;
              padding: 15px;
              margin: 20px 0;
              text-align: center;
            }
            .crisis-info strong {
              color: #c53030;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🧠 Mindful Campus</div>
              <div class="welcome-text">Welcome, ${firstName}! 🌟</div>
            </div>
            
            <div class="content">
              <p>Dear ${firstName} ${lastName},</p>
              
              <p>Welcome to <strong>Mindful Campus</strong> - your personal mental health companion for your journey at <strong>${university}</strong>! We're thrilled to have you join our community of students who prioritize their mental well-being.</p>
              
              <p>Your mental health matters, and we're here to support you every step of the way. Here's what you can explore:</p>
              
              <div class="feature">
                <span class="feature-icon">💬</span>
                <div>
                  <strong>AI Chat Support</strong><br>
                  Talk to our empathetic AI companion anytime you need someone to listen
                </div>
              </div>
              
              <div class="feature">
                <span class="feature-icon">📊</span>
                <div>
                  <strong>Mood Tracking</strong><br>
                  Track your daily mood and discover patterns in your mental health
                </div>
              </div>
              
              <div class="feature">
                <span class="feature-icon">📚</span>
                <div>
                  <strong>Mental Health Resources</strong><br>
                  Access articles, exercises, and coping strategies
                </div>
              </div>
              
              <div class="feature">
                <span class="feature-icon">👥</span>
                <div>
                  <strong>Professional Counselors</strong><br>
                  Connect with licensed mental health professionals
                </div>
              </div>
              
              <div class="feature">
                <span class="feature-icon">🏆</span>
                <div>
                  <strong>Achievement System</strong><br>
                  Celebrate your progress with our gamified wellness tracking
                </div>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="http://localhost:3000/login" class="cta-button">
                  Start Your Journey Now 🚀
                </a>
              </div>
              
              <div class="crisis-info">
                <strong>Need Immediate Help?</strong><br>
                If you're in crisis, please reach out to:<br>
                <strong>National Suicide Prevention Lifeline: 988</strong><br>
                <strong>Crisis Text Line: Text HOME to 741741</strong>
              </div>
              
              <p>Remember, taking care of your mental health is not a luxury - it's a necessity. You're taking an important step by joining our community.</p>
              
              <p>We're here for you, ${firstName}. Your journey to better mental health starts now! 💙</p>
              
              <p>With warm regards,<br>
              The Mindful Campus Team</p>
            </div>
            
            <div class="footer">
              <p>This email was sent to ${email} because you registered for Mindful Campus.</p>
              <p>© 2024 Mindful Campus. All rights reserved.</p>
              <p>Privacy-focused • 100% Free • Your data stays secure</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
      // For development, we'll just log the email
      // In production, you would use: await this.transporter.sendMail(mailOptions);
      console.log('📧 Welcome email would be sent to:', email);
      console.log('📧 Email subject:', mailOptions.subject);
      console.log('📧 Email preview:', {
        to: mailOptions.to,
        from: mailOptions.from,
        subject: mailOptions.subject
      });
      
      // In a real implementation, you would uncomment this:
      // const info = await this.transporter.sendMail(mailOptions);
      // console.log('Email sent successfully:', info.messageId);
      
      return { success: true, message: 'Welcome email sent successfully' };
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new EmailService();
