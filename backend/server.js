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
// Helmet + CSP: allow Zeabur host and Google Fonts for styles and fonts
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      // Allow stylesheet links (external and element-level) from known deployment hosts and Google Fonts
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://fonts.googleapis.com",
        process.env.CLIENT_URL || 'https://subash-portfolio.zeabur.app',
        process.env.ZEABUR_URL || 'https://subash-portfolio.zeabur.app',
        process.env.GITHUB_PAGES_URL || 'https://subash-s-66.github.io'
      ],
      styleSrcElem: [
        "'self'",
        "https://fonts.googleapis.com",
        process.env.CLIENT_URL || 'https://subash-portfolio.zeabur.app',
        process.env.ZEABUR_URL || 'https://subash-portfolio.zeabur.app',
        process.env.GITHUB_PAGES_URL || 'https://subash-s-66.github.io'
      ],
      // Allow scripts from self; keep unsafe-inline/eval to support some libs if needed
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      imgSrc: ["'self'", "data:", "https:"],
      // Allow API connections from the app origin (Zeabur) and any configured API URL
      connectSrc: [
        "'self'",
        process.env.API_URL || process.env.CLIENT_URL || process.env.ZEABUR_URL || 'https://subash-portfolio.zeabur.app',
        process.env.ZEABUR_URL || 'https://subash-portfolio.zeabur.app'
      ],
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
    'https://subash-s-66.github.io',
    process.env.ZEABUR_URL || 'https://subash-portfolio.zeabur.app'
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

// Debug endpoints (temporary) to help verify CSP and the served index
app.get('/_debug/csp', (req, res) => {
  const csp = res.getHeader('content-security-policy') || res.getHeader('Content-Security-Policy') || 'not-set'
  res.json({ csp })
})

app.get('/_debug/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
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
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
            body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; }
            .container { max-width: 700px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 30px; text-align: center; color: white; }
            .header h2 { margin: 0; font-size: 24px; font-weight: 600; }
            .header p { margin: 8px 0 0 0; font-size: 14px; opacity: 0.9; }
            .content { padding: 30px; }
            .contact-info { background-color: #f8fafc; border-left: 4px solid #0ea5e9; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .contact-info h3 { margin: 0 0 15px 0; color: #1a202c; font-size: 18px; }
            .contact-info p { margin: 8px 0; color: #4a5568; font-size: 14px; }
            .contact-info strong { color: #2d3748; }
            .message-section { background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .message-section h3 { margin: 0 0 15px 0; color: #334155; font-size: 16px; }
            .message-text { color: #475569; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word; }
            .timestamp { background-color: #f0f9ff; border: 1px solid #90cdf4; border-radius: 8px; padding: 15px; margin: 20px 0; }
            .timestamp p { margin: 0; color: #0369a1; font-size: 13px; text-align: center; }
            .footer { background-color: #2d3748; color: #a0aec0; padding: 20px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
              <p>You have received a new message from your portfolio website</p>
            </div>
            <div class="content">
              <div class="contact-info">
                <h3>Contact Information</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a></p>
                <p><strong>Subject:</strong> ${subject}</p>
              </div>
              <div class="message-section">
                <h3>Message</h3>
                <div class="message-text">${message.replace(/\n/g, '<br>')}</div>
              </div>
              <div class="timestamp">
                <p><strong>Received:</strong> ${new Date().toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  timeZoneName: 'short'
                })}</p>
              </div>
            </div>
            <div class="footer">
              <p>This notification was sent from your portfolio contact form.</p>
            </div>
          </div>
        </body>
        </html>
      `

      // Simple auto-reply HTML for sender confirmation
      // Auto-reply HTML (professional, branded template)
      const autoReplyHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for contacting Subash</title>
          <style>
            body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; color: white; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
            .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
            .content { padding: 40px 30px; }
            .message-summary { background-color: #f8fafc; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 4px; }
            .message-summary h3 { margin: 0 0 10px 0; color: #1a202c; font-size: 18px; }
            .message-summary p { margin: 5px 0; color: #4a5568; }
            .message-content { background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0; }
            .message-content h4 { margin: 0 0 15px 0; color: #2d3748; font-size: 16px; }
            .message-text { color: #4a5568; line-height: 1.6; white-space: pre-line; }
            .response-info { background-color: #ebf8ff; border: 1px solid #90cdf4; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .response-info h4 { margin: 0 0 10px 0; color: #2b6cb0; font-size: 16px; }
            .response-info p { margin: 0; color: #2c5282; line-height: 1.5; }
            .contact-options { background-color: #f0fff4; border: 1px solid #9ae6b4; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .contact-options h4 { margin: 0 0 15px 0; color: #22543d; font-size: 16px; }
            .contact-links { margin: 15px 0; }
            .contact-links a { display: inline-block; margin: 5px 10px 5px 0; padding: 8px 16px; background-color: #667eea; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; }
            .contact-links a:hover { background-color: #5a67d8; }
            .footer { background-color: #2d3748; color: #a0aec0; padding: 30px; text-align: center; font-size: 14px; }
            .footer h5 { margin: 0 0 10px 0; color: #e2e8f0; font-size: 16px; }
            .footer p { margin: 5px 0; }
            .social-links { margin: 15px 0; }
            .social-links a { display: inline-block; margin: 0 8px; color: #a0aec0; text-decoration: none; font-size: 18px; }
            .social-links a:hover { color: #667eea; }
            .divider { border-top: 1px solid #e2e8f0; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <h1>Thank You for Reaching Out!</h1>
              <p>I've received your message and appreciate you taking the time to connect.</p>
            </div>

            <!-- Content -->
            <div class="content">
              <div class="message-summary">
                <h3>Message Summary</h3>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Received:</strong> ${new Date().toLocaleString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>

              <div class="message-content">
                <h4>Your Message</h4>
                <div class="message-text">${message.replace(/\n/g, '<br>')}</div>
              </div>

              <div class="response-info">
                <h4>Response Time</h4>
                <p>I typically respond to all messages within 24-48 hours. For urgent inquiries, feel free to follow up on this email.</p>
              </div>

              <div class="contact-options">
                <h4>Alternative Ways to Connect</h4>
                <p>While you wait for my response, you can also reach me through:</p>
                <div class="contact-links">
                  <a href="https://www.linkedin.com/in/subash-s-514aa9373" target="_blank">LinkedIn</a>
                  <a href="https://github.com/Subash-S-66" target="_blank">GitHub</a>
                  <a href="mailto:${process.env.EMAIL_TO || process.env.NOTIFICATION_EMAIL || 'subash.93450@gmail.com'}">Direct Email</a>
                </div>
              </div>

              <div class="divider"></div>

              <p style="color: #4a5568; text-align: center; margin: 20px 0;">
                Looking forward to connecting with you soon!
              </p>
            </div>

            <!-- Footer -->
            <div class="footer">
              <h5>Subash S</h5>
              <p>Full Stack Developer | B.Tech Computer Science Student</p>
              <p>Dr. M.G.R. Educational and Research Institute, Chennai</p>
              <div class="social-links">
                <a href="https://github.com/Subash-S-66" target="_blank">GitHub</a> |
                <a href="https://www.linkedin.com/in/subash-s-514aa9373" target="_blank">LinkedIn</a> |
                <a href="mailto:${process.env.EMAIL_TO || process.env.NOTIFICATION_EMAIL || 'subash.93450@gmail.com'}">Email</a>
              </div>
              <p style="font-size: 12px; margin-top: 20px; color: #718096;">
                This is an automated response. Please do not reply to this email directly.
              </p>
            </div>
          </div>
        </body>
        </html>
      `

      // Where to send the admin notification
      const notificationEmail = process.env.EMAIL_TO || process.env.NOTIFICATION_EMAIL || 'subash.93450@gmail.com'

      // Send notification to admin using SMTP if configured, otherwise try Resend
      if (usingSMTP) {
        // Send notification to admin
        await sendEmailWithSMTP(notificationEmail, `Portfolio Contact: ${subject}`, mainEmailHtml, email)
        // Send auto-reply to sender via SMTP (not third-party)
        try {
          await sendEmailWithSMTP(email, `Thank you for contacting me - ${subject}`, autoReplyHtml, notificationEmail)
        } catch (err) {
          console.warn('Auto-reply failed (SMTP):', err.message)
        }
      } else if (process.env.RESEND_API_KEY) {
        // Send notification via Resend (only admin, no auto-reply to avoid third-party for sender)
        await sendEmailWithResend(notificationEmail, `Portfolio Contact: ${subject}`, mainEmailHtml, email)
        console.log('Auto-reply not sent to sender (Resend is third-party service)')
      } else {
        console.log('No email service configured. Message received but not sent via email.')
        console.log('Name:', name, 'Email:', email, 'Subject:', subject, 'Message:', message)
      }

      res.json({
        success: true,
        message: 'Message received! I\'ll get back to you soon.'
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
// Serve Android APK files from the root-level "Android app" folder
app.use('/apk', express.static(path.join(__dirname, '..', 'Android app')))
app.use('/projects/apk', express.static(path.join(__dirname, '..', 'Android app')))

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
