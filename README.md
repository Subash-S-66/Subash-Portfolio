# Subash S - Portfolio Website

A modern, responsive portfolio website built with React, Vite, Tailwind CSS, and Express.js. This portfolio showcases my skills, projects, and experience as a Full Stack Developer.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all devices
- **Interactive**: Smooth scrolling, hover effects, and animations
- **Contact Form**: Functional contact form with email integration
- **Project Showcase**: Detailed project descriptions with tech stacks
- **Skills Visualization**: Interactive skill bars and categories
- **SEO Optimized**: Meta tags and semantic HTML structure

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Backend
- **Express.js** - Web framework
- **Nodemailer** - Email service
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Express Rate Limit** - Rate limiting
- **Express Validator** - Input validation

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd subash-portfolio
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp server/env.example server/.env
   
   # Edit the .env file with your email credentials
   # For Gmail:
   # 1. Enable 2-factor authentication
   # 2. Generate an App Password
   # 3. Use the App Password as EMAIL_PASS
   ```

## 🚀 Running the Application

### Development Mode

1. **Start both frontend and backend simultaneously**
   ```bash
   npm run dev:full
   ```

   Or start them separately:

2. **Start the frontend (Terminal 1)**
   ```bash
   npm run dev
   ```

3. **Start the backend (Terminal 2)**
   ```bash
   npm run server
   ```

### Production Mode

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start the backend**
   ```bash
   cd server
   npm start
   ```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📁 Project Structure

```
subash-portfolio/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   ├── server.js
│   ├── package.json
│   └── env.example
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your primary colors
      },
      secondary: {
        // Your secondary colors
      }
    }
  }
}
```

### Content
Update the content in each component file:
- **Personal Info**: `src/components/Hero.jsx` and `src/components/About.jsx`
- **Projects**: `src/components/Projects.jsx`
- **Skills**: `src/components/Skills.jsx`
- **Contact Info**: `src/components/Contact.jsx` and `src/components/Footer.jsx`

### Styling
Modify `src/index.css` for global styles and custom CSS classes.

## 📧 Contact Form Setup

The contact form is fully functional and includes:

- **Input Validation**: Client and server-side validation
- **Rate Limiting**: Prevents spam submissions
- **Email Integration**: Sends emails using Nodemailer
- **Auto-reply**: Sends confirmation email to users
- **Error Handling**: Graceful error handling and user feedback

### Email Configuration

1. Set up your email credentials in `server/.env`
2. For Gmail:
   - Enable 2-factor authentication
   - Generate an App Password
   - Use the App Password as `EMAIL_PASS`

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service

### Backend (Railway/Heroku/DigitalOcean)
1. Set environment variables
2. Deploy the `server` folder
3. Update `CLIENT_URL` in production

## 📱 Features Overview

### Hero Section
- Animated introduction
- Contact information
- Social media links
- Call-to-action buttons

### About Section
- Personal summary
- Education details
- Skills overview
- Language proficiency

### Projects Section
- Detailed project descriptions
- Tech stack visualization
- Live demo and code links
- Responsive project cards

### Skills Section
- Interactive skill bars
- Categorized skills
- Proficiency levels
- Visual icons

### Contact Section
- Functional contact form
- Contact information
- Social media links
- Form validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Subash S**
- Email: subash.93450@gmail.com
- GitHub: [@Subash-S-66](https://github.com/Subash-S-66)
- LinkedIn: [Subash S](https://www.linkedin.com/in/subash-s-514aa9373)

---

⭐ If you like this portfolio, please give it a star!
