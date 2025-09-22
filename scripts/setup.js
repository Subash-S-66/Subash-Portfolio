#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 Setting up Subash S Portfolio...\n')

// Check if Node.js version is compatible
const nodeVersion = process.version
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0])

if (majorVersion < 16) {
  console.error('❌ Node.js version 16 or higher is required')
  console.error(`   Current version: ${nodeVersion}`)
  process.exit(1)
}

console.log(`✅ Node.js version: ${nodeVersion}`)

// Install frontend dependencies
console.log('\n📦 Installing frontend dependencies...')
try {
  execSync('npm install', { stdio: 'inherit' })
  console.log('✅ Frontend dependencies installed')
} catch (error) {
  console.error('❌ Failed to install frontend dependencies')
  process.exit(1)
}

// Install backend dependencies
console.log('\n📦 Installing backend dependencies...')
try {
  execSync('npm install', { cwd: 'server', stdio: 'inherit' })
  console.log('✅ Backend dependencies installed')
} catch (error) {
  console.error('❌ Failed to install backend dependencies')
  process.exit(1)
}

// Create .env file if it doesn't exist
const envPath = path.join('server', '.env')
const envExamplePath = path.join('server', 'env.example')

if (!fs.existsSync(envPath)) {
  console.log('\n📝 Creating environment file...')
  try {
    fs.copyFileSync(envExamplePath, envPath)
    console.log('✅ Created server/.env file')
    console.log('   Please edit server/.env with your email credentials')
  } catch (error) {
    console.error('❌ Failed to create .env file')
  }
} else {
  console.log('✅ Environment file already exists')
}

console.log('\n🎉 Setup complete!')
console.log('\n📋 Next steps:')
console.log('   1. Edit server/.env with your email credentials')
console.log('   2. Run "npm run dev:full" to start both frontend and backend')
console.log('   3. Open http://localhost:3000 in your browser')
console.log('\n📚 For more information, check the README.md file')
