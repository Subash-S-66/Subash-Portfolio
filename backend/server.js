import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import { body, validationResult } from 'express-validator'
import { Resend } from 'resend'
import nodemailer from 'nodemailer'
import path from 'path'
import { fileURLToPath } from 'url'

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

// Resolve __dirname for ESM so static files are served relative to this file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
}))
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
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Nodemailer transporter (if SMTP env vars are provided)
let smtpTransporter = null
const usingSMTP = !!process.env.EMAIL_HOST && !!process.env.EMAIL_USER && !!process.env.EMAIL_PASSWORD
if (usingSMTP) {
  smtpTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })
}

const sendEmailWithResend = async (to, subject, html, replyTo = null) => {
  if (!resend) throw new Error('Resend API key not configured')

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
    console.log('Resend email sent successfully:', result.data?.id)
    return result
  } catch (error) {
    console.error('Resend email sending failed:', error.message)
    throw error
  }
}

const sendEmailWithSMTP = async (to, subject, html, replyTo = null) => {
  if (!smtpTransporter) throw new Error('SMTP transporter not configured')

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject,
    html
  }

  if (replyTo) mailOptions.replyTo = replyTo

  const info = await smtpTransporter.sendMail(mailOptions)
  console.log('SMTP email sent:', info.messageId)
  return info
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

      // Build main notification HTML
      const mainEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">New Contact Form Submission</h2>
          <div style="background-color: #f8fafc; padding: 18px; border-radius: 8px; margin: 18px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background-color: #ffffff; padding: 18px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #334155; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #475569;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <div style="margin-top: 18px; padding: 14px; background-color: #f0f9ff; border-radius: 8px; border-left: 4px solid #0ea5e9;">
            <p style="margin: 0; color: #0369a1; font-size: 13px;">
              Received: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `

      // Auto-reply HTML (friendly, professional template)
      const autoReplyHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; max-width:700px;margin:0 auto;">
          <div style="background:linear-gradient(90deg,#6d28d9,#ec4899);padding:24px;border-radius:8px;color:#fff;text-align:center;">
            <h2 style="margin:0;font-size:20px;">Thanks for contacting Subash</h2>
            <p style="margin:6px 0 0 0;opacity:0.95">I've received your message and will get back to you soon.</p>
          </div>
          <div style="background:#fff;padding:20px;border:1px solid #eef2ff;border-radius:8px;margin-top:16px;color:#0f172a;">
            <p style="margin:0 0 8px 0"><strong>Subject:</strong> ${subject}</p>
            <p style="margin:0 0 12px 0"><strong>Message:</strong></p>
            <div style="color:#475569;line-height:1.6;border-left:4px solid #eef2ff;padding-left:12px;margin-bottom:12px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <p style="margin:0;color:#334155;">If you need a faster reply, you can reply to this email or reach me at <strong>${process.env.EMAIL_TO || process.env.NOTIFICATION_EMAIL || 'subash.93450@gmail.com'}</strong>.</p>
          </div>
          <footer style="text-align:center;margin-top:14px;color:#94a3b8;font-size:12px;">— Subash | Full Stack Developer</footer>
        </div>
      `

      // Where to send the admin notification
      const notificationEmail = process.env.EMAIL_TO || process.env.NOTIFICATION_EMAIL || 'subash.93450@gmail.com'

      // Send using SMTP if configured, otherwise try Resend
      if (usingSMTP) {
        // Send notification to admin
        await sendEmailWithSMTP(notificationEmail, `Portfolio Contact: ${subject}`, mainEmailHtml, email)
        // Send auto-reply to sender
        try {
          await sendEmailWithSMTP(email, `Thanks for contacting Subash`, autoReplyHtml, notificationEmail)
        } catch (err) {
          console.warn('Auto-reply failed (SMTP):', err.message)
        }
      } else if (process.env.RESEND_API_KEY) {
        // Send notification via Resend
        await sendEmailWithResend(notificationEmail, `Portfolio Contact: ${subject}`, mainEmailHtml, email)
        // Send auto-reply via Resend
        try {
          await sendEmailWithResend(email, `Thanks for contacting Subash`, autoReplyHtml, notificationEmail)
        } catch (err) {
          console.warn('Auto-reply failed (Resend):', err.message)
        }
      } else {
        return res.status(500).json({
          success: false,
          message: 'Email service not configured. Please contact me directly.'
        })
      }

      res.json({
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
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

// Serve static files from the React app build directory (relative to this file)
app.use(express.static(path.join(__dirname, 'dist')))
// Also serve the same build when the app is hosted under a subpath (Zeabur uses /projects)
app.use('/projects', express.static(path.join(__dirname, 'dist')))

// Catch all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  // If the request starts with the Zeabur subpath, ensure we return the built index
  // so relative asset links resolve under /projects/* correctly.
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found'
  })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
