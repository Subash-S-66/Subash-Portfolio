#!/usr/bin/env node

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

console.log('🚀 Manual GitHub Pages Deployment\n')

try {
  // Check if we're in a git repository
  execSync('git status', { stdio: 'pipe' })
  console.log('✅ Git repository found')
} catch (error) {
  console.error('❌ Not a git repository. Please run "git init" first.')
  process.exit(1)
}

// Check if dist folder exists
if (!fs.existsSync('dist')) {
  console.log('📦 Building project...')
  execSync('npm run build', { stdio: 'inherit' })
  console.log('✅ Build completed')
}

// Create a temporary directory for gh-pages
const tempDir = 'temp-gh-pages'
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true })
}

console.log('📁 Creating temporary directory...')
fs.mkdirSync(tempDir)

// Copy dist contents to temp directory
console.log('📋 Copying build files...')
const distFiles = fs.readdirSync('dist')
distFiles.forEach(file => {
  const srcPath = path.join('dist', file)
  const destPath = path.join(tempDir, file)
  
  if (fs.statSync(srcPath).isDirectory()) {
    fs.cpSync(srcPath, destPath, { recursive: true })
  } else {
    fs.copyFileSync(srcPath, destPath)
  }
})

// Initialize git in temp directory
console.log('🔧 Setting up git in temp directory...')
process.chdir(tempDir)
execSync('git init', { stdio: 'pipe' })
execSync('git add .', { stdio: 'pipe' })
execSync('git commit -m "Deploy to GitHub Pages"', { stdio: 'pipe' })

// Add remote and push to gh-pages branch
console.log('🌐 Pushing to GitHub Pages...')
try {
  execSync('git remote add origin https://github.com/Subash-S-66/portfolio.git', { stdio: 'pipe' })
} catch (error) {
  // Remote might already exist
  console.log('ℹ️  Remote already exists')
}

execSync('git branch -M gh-pages', { stdio: 'pipe' })
execSync('git push -f origin gh-pages', { stdio: 'inherit' })

// Clean up
process.chdir('..')
fs.rmSync(tempDir, { recursive: true, force: true })

console.log('\n🎉 Deployment completed!')
console.log('📱 Your portfolio should be live at:')
console.log('   https://subash-s-66.github.io/portfolio')
console.log('\n⏰ It may take a few minutes for GitHub Pages to update.')
console.log('\n📋 Next steps:')
console.log('1. Go to your repository: https://github.com/Subash-S-66/portfolio')
console.log('2. Click Settings → Pages')
console.log('3. Source: Deploy from a branch')
console.log('4. Branch: gh-pages')
console.log('5. Save')
