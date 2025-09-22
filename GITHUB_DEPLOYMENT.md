# 🚀 GitHub Deployment Guide

Quick guide to deploy your portfolio to GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Node.js installed

## 🎯 Quick Deployment (5 minutes)

### Step 1: Run the deployment script
```bash
npm run deploy:github
```

### Step 2: Create GitHub Repository
1. Go to [GitHub](https://github.com/new)
2. Repository name: `subash-portfolio`
3. Make it **Public** (required for free GitHub Pages)
4. **Don't** initialize with README
5. Click "Create repository"

### Step 3: Connect and Push
```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/subash-portfolio.git
git branch -M main
git add .
git commit -m "Initial commit: Portfolio website"
git push -u origin main
```

### Step 4: Deploy to GitHub Pages
```bash
npm run build
npm run deploy
```

### Step 5: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Source: **Deploy from a branch**
5. Branch: **gh-pages**
6. Folder: **/ (root)**
7. Click **Save**

## 🌐 Your Portfolio is Live!

Your portfolio will be available at:
```
https://YOUR_USERNAME.github.io/subash-portfolio
```

## 🔧 Troubleshooting

### If deployment fails:
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
npm run deploy
```

### If GitHub Pages doesn't work:
1. Check repository is **public**
2. Wait 5-10 minutes for GitHub to process
3. Check Actions tab for any errors

## 📧 Contact Form Note

GitHub Pages only hosts static files. For the contact form to work, you need to:

1. **Deploy backend separately** (Railway, Heroku, etc.)
2. **Update API URL** in your frontend
3. **Set up environment variables**

See `DEPLOYMENT.md` for full-stack deployment options.

## 🎨 Custom Domain (Optional)

To use a custom domain:
1. Add `CNAME` file in `public/` folder
2. Add your domain name in GitHub Pages settings
3. Update DNS records with your domain provider

## 📱 Mobile Testing

Test your deployed portfolio on:
- Mobile devices
- Different browsers
- Various screen sizes

## 🔄 Updates

To update your portfolio:
```bash
# Make changes to your code
git add .
git commit -m "Update portfolio"
git push origin main
npm run build
npm run deploy
```

## 🆘 Need Help?

- Check the main `README.md`
- See `DEPLOYMENT.md` for advanced options
- GitHub Pages documentation: https://pages.github.com

---

**Happy Deploying! 🎉**
