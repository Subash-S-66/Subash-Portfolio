# Deployment Guide

This guide covers how to deploy the Subash S Portfolio to various platforms.

## 🚀 Frontend Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   vercel --prod
   ```

3. **Environment Variables**
   - Set `VITE_API_URL` to your backend URL

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repository

3. **Environment Variables**
   - Go to Site settings > Environment variables
   - Add `VITE_API_URL` with your backend URL

### GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

## 🔧 Backend Deployment

### Railway

1. **Connect Repository**
   - Go to [Railway](https://railway.app)
   - Connect your GitHub repository

2. **Environment Variables**
   - `PORT`: 5000
   - `NODE_ENV`: production
   - `CLIENT_URL`: your frontend URL
   - `EMAIL_USER`: your email
   - `EMAIL_PASS`: your app password

3. **Deploy**
   - Railway will automatically deploy from your repository

### Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set CLIENT_URL=https://your-frontend-url.com
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASS=your-app-password
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### DigitalOcean App Platform

1. **Create New App**
   - Go to DigitalOcean App Platform
   - Create new app from GitHub

2. **Configure**
   - Source: GitHub repository
   - Type: Web Service
   - Build Command: `npm install`
   - Run Command: `npm start`

3. **Environment Variables**
   - Add all required environment variables

## 🔗 Full Stack Deployment

### Vercel + Railway

1. **Deploy Backend to Railway**
   - Follow Railway deployment steps above
   - Note the backend URL

2. **Deploy Frontend to Vercel**
   - Set `VITE_API_URL` to your Railway backend URL
   - Deploy to Vercel

### Netlify + Heroku

1. **Deploy Backend to Heroku**
   - Follow Heroku deployment steps above
   - Note the backend URL

2. **Deploy Frontend to Netlify**
   - Set `VITE_API_URL` to your Heroku backend URL
   - Deploy to Netlify

## 📧 Email Configuration

### Gmail Setup

1. **Enable 2-Factor Authentication**
   - Go to Google Account settings
   - Enable 2FA

2. **Generate App Password**
   - Go to Security > App passwords
   - Generate password for "Mail"
   - Use this as `EMAIL_PASS`

3. **Environment Variables**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

### Other Email Providers

#### Outlook/Hotmail
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

#### Custom SMTP
```javascript
// In server.js, modify createTransporter()
const transporter = nodemailer.createTransporter({
  host: 'your-smtp-host',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})
```

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env` files
- Use strong, unique passwords
- Rotate credentials regularly

### Rate Limiting
- Contact form is rate-limited to 5 submissions per 15 minutes
- General API is rate-limited to 100 requests per 15 minutes

### CORS
- Backend only accepts requests from your frontend domain
- Update `CLIENT_URL` when deploying

## 📊 Monitoring

### Health Check
- Backend health: `https://your-backend-url.com/api/health`
- Frontend: Check browser console for errors

### Logs
- Railway: View logs in dashboard
- Heroku: `heroku logs --tail`
- Vercel: View function logs in dashboard

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `CLIENT_URL` in backend environment variables
   - Ensure frontend URL matches exactly

2. **Email Not Sending**
   - Verify email credentials
   - Check if 2FA is enabled for Gmail
   - Verify app password is correct

3. **Build Failures**
   - Check Node.js version (16+ required)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

4. **Environment Variables Not Loading**
   - Restart the application after adding variables
   - Check variable names match exactly
   - Ensure no spaces around `=` in .env files

### Debug Mode

Enable debug logging in development:
```javascript
// In server.js
console.log('Environment:', process.env.NODE_ENV)
console.log('Email configured:', !!process.env.EMAIL_USER)
```

## 📈 Performance Optimization

### Frontend
- Images are optimized automatically by Vite
- CSS is purged in production
- JavaScript is minified and tree-shaken

### Backend
- Rate limiting prevents abuse
- Helmet adds security headers
- CORS is properly configured

## 🔄 Updates

### Updating the Application
1. Make changes to your code
2. Test locally with `npm run dev:full`
3. Commit and push to your repository
4. Platform will automatically redeploy

### Database Considerations
- Currently uses in-memory storage
- For production, consider adding a database
- Implement proper data persistence

---

For more help, check the main README.md or open an issue on GitHub.
