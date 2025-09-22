#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')

console.log('🚀 GitHub Deployment Script for Subash S Portfolio\n')

// Check if git is initialized
try {
  execSync('git status', { stdio: 'pipe' })
  console.log('✅ Git repository initialized')
} catch (error) {
  console.log('📝 Initializing git repository...')
  execSync('git init', { stdio: 'inherit' })
}

// Check if .gitignore exists
if (!fs.existsSync('.gitignore')) {
  console.log('📝 Creating .gitignore...')
  const gitignoreContent = `# Dependencies
node_modules/
server/node_modules/

# Production builds
dist/
build/

# Environment variables
.env
.env.local
.env.production

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.temp
`
  fs.writeFileSync('.gitignore', gitignoreContent)
  console.log('✅ .gitignore created')
}

// Check if package.json has homepage field
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
if (!packageJson.homepage) {
  console.log('📝 Adding homepage field to package.json...')
  packageJson.homepage = 'https://subash-s-66.github.io/subash-portfolio'
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2))
  console.log('✅ Homepage field added')
}

// Check if gh-pages is installed
if (!packageJson.devDependencies || !packageJson.devDependencies['gh-pages']) {
  console.log('📦 Installing gh-pages...')
  execSync('npm install --save-dev gh-pages', { stdio: 'inherit' })
  console.log('✅ gh-pages installed')
}

// Add deploy script if not exists
if (!packageJson.scripts.deploy) {
  console.log('📝 Adding deploy script...')
  packageJson.scripts.deploy = 'gh-pages -d dist'
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2))
  console.log('✅ Deploy script added')
}

console.log('\n🎯 Next Steps:')
console.log('1. Create a new repository on GitHub:')
console.log('   - Go to https://github.com/new')
console.log('   - Repository name: subash-portfolio')
console.log('   - Make it public')
console.log('   - Don\'t initialize with README (we already have one)')
console.log('')
console.log('2. Connect your local repository:')
console.log('   git remote add origin https://github.com/YOUR_USERNAME/subash-portfolio.git')
console.log('   git branch -M main')
console.log('   git add .')
console.log('   git commit -m "Initial commit: Portfolio website"')
console.log('   git push -u origin main')
console.log('')
console.log('3. Deploy to GitHub Pages:')
console.log('   npm run build')
console.log('   npm run deploy')
console.log('')
console.log('4. Your portfolio will be live at:')
console.log('   https://YOUR_USERNAME.github.io/subash-portfolio')
console.log('')
console.log('📚 For full-stack deployment with contact form:')
console.log('   - Use Vercel for frontend + Railway for backend')
console.log('   - See DEPLOYMENT.md for detailed instructions')

console.log('\n✨ Happy deploying!')
