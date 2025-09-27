import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import { body, validationResult } from 'express-validator'
import { Resend } from 'resend'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Always log port information for debugging
console.log(`🔧 Environment PORT: ${process.env.PORT}`)
console.log(`🔧 Using PORT: ${PORT}`)
console.log(`🔧 RESEND_API_KEY: ${process.env.RESEND_API_KEY ? 'SET' : 'NOT SET'}`)
console.log(`🔧 NODE_ENV: ${process.env.NODE_ENV}`)

// Trust proxy for rate limiting (required for Render.com)
app.set('trust proxy', 1)

// Middleware
app.use(helmet())
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'https://subash-s-66.github.io/Subash-Portfolio',
    'https://subash-s-66.github.io'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})
app.use('/api/', limiter)

// Contact form rate limiting (more restrictive)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 contact form submissions per windowMs
  message: 'Too many contact form submissions, please try again later.'
})

// Resend email configuration
const resend = new Resend(process.env.RESEND_API_KEY)

// Note: Using Resend for both notification and auto-reply emails for better reliability

const sendEmail = async (to, subject, html, replyTo = null) => {
  try {
    const emailData = {
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [to],
      subject: subject,
      html: html
    }
    
    if (replyTo) {
      emailData.reply_to = replyTo
    }
    
    const result = await resend.emails.send(emailData)
    console.log('Email sent successfully:', result.data?.id)
    console.log('Full Resend response:', JSON.stringify(result, null, 2))
    return result
  } catch (error) {
    console.error('Email sending failed:', error.message)
    throw error
  }
}

const sendAutoReply = async (to, name, subject) => {
  try {
    const autoReplyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0ea5e9, #3b82f6); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Contacting Me!</h1>
        </div>
        
        <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-radius: 0 0 10px 10px;">
          <p style="font-size: 18px; color: #334155; margin-bottom: 20px;">Hi ${name},</p>
          
          <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
            Thank you for reaching out through my portfolio contact form! I've received your message about "<strong>${subject}</strong>" and I truly appreciate you taking the time to connect with me.
          </p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
            <p style="margin: 0; color: #0369a1; font-weight: 500;">
              📧 I'll review your message and get back to you within 24-48 hours.
            </p>
          </div>
          
          <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
            In the meantime, feel free to check out my latest projects on GitHub or connect with me on LinkedIn. I'm always excited to discuss new opportunities and interesting projects!
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://github.com/Subash-S-66" style="display: inline-block; background-color: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 0 10px; font-weight: 500;">GitHub</a>
            <a href="https://www.linkedin.com/in/subash-s-514aa9373" style="display: inline-block; background-color: #0077b5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 0 10px; font-weight: 500;">LinkedIn</a>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            Best regards,<br>
            <strong>Subash S</strong><br>
            B.Tech Computer Science Student<br>
            Full Stack Developer (MERN Stack)
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #94a3b8; font-size: 12px;">
          <p>This is an automated response. Please do not reply to this email.</p>
          <p>If you need immediate assistance, please contact me directly at subash.93450@gmail.com</p>
        </div>
      </div>
    `
    
    const emailData = {
      from: 'Subash S <onboarding@resend.dev>',
      to: [to],
      subject: `Re: ${subject} - Thank you for contacting Subash S`,
      html: autoReplyHtml
    }
    
    const result = await resend.emails.send(emailData)
    console.log('Auto-reply email sent successfully:', result.data?.id)
    return result
  } catch (error) {
    console.error('Auto-reply email sending failed:', error.message)
    throw error
  }
}

// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.sendStatus(200)
})

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Subash S Portfolio API',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
      portfolio: '/api/portfolio'
    },
    frontend: 'https://subash-s-66.github.io/Subash-Portfolio'
  })
})

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString()
  })
})

// Contact form endpoint
app.post('/api/contact', 
  contactLimiter,
  [
    body('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
    body('subject')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Subject must be between 5 and 100 characters'),
    body('message')
      .trim()
      .isLength({ min: 5, max: 1000 })
      .withMessage('Message must be between 10 and 1000 characters')
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        })
      }

      const { name, email, subject, message } = req.body

      // Check if Resend API key is configured
      if (!process.env.RESEND_API_KEY) {
        return res.status(500).json({
          success: false,
          message: 'Email service not configured. Please contact me directly.'
        })
      }


      // Send main email to you
      const mainEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">New Contact Form Submission</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #334155; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #475569;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #f0f9ff; border-radius: 8px; border-left: 4px solid #0ea5e9;">
            <p style="margin: 0; color: #0369a1; font-size: 14px;">
              This message was sent from your portfolio contact form at ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `
      
      // Send email notification to you
      const notificationEmail = process.env.NOTIFICATION_EMAIL || 'subash.93450@gmail.com'
      console.log('Sending email notification to:', notificationEmail)
      await sendEmail(notificationEmail, `Portfolio Contact: ${subject}`, mainEmailHtml, email)

      // Send auto-reply email to the user
      console.log('Sending auto-reply email to:', email)
      await sendAutoReply(email, name, subject)

      res.json({
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon. Check your email for a confirmation.'
      })

    } catch (error) {
      console.error('Contact form error:', error.message)
      
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.'
      })
    }
  }
)

// Portfolio data endpoint
app.get('/api/portfolio', (req, res) => {
  const portfolioData = {
    personal: {
      name: 'Subash S',
      title: 'B.Tech Computer Science Student',
      subtitle: 'Full Stack Developer using MERN Stack',
      email: 'your-email@gmail.com',
      phone: '+91-9345081127',
      location: 'Chennai, India',
      github: 'https://github.com/Subash-S-66',
      linkedin: 'https://www.linkedin.com/in/subash-s-514aa9373'
    },
    about: {
      summary: 'Computer Science Engineering student with practical experience in full-stack web development, focusing on the MERN stack (using MySQL instead of MongoDB). Currently doing an internship at Postulate Info Tech, contributing to real-world projects.',
      cgpa: '7.7/10',
      university: 'Dr.M.G.R. Educational and Research Institute, Chennai',
      graduationYear: '2022-2026'
    },
    skills: {
      programming: ['JavaScript', 'Python'],
      frontend: ['React.js', 'Node.js', 'Express.js', 'HTML', 'CSS', 'Tailwind CSS'],
      database: ['MySQL','PostgreSQL','MongoDB'],
      tools: ['Git', 'GitHub'],
      softSkills: ['Problem Solving', 'Teamwork', 'Communication']
    },
    languages: [
      { name: 'English', level: 'Fluent' },
      { name: 'Tamil', level: 'Fluent' },
      { name: 'Hindi', level: 'Basics' }
    ]
  }

  res.json(portfolioData)
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.message)
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
