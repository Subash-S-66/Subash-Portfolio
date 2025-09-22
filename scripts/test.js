#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🧪 Testing Portfolio Setup...\n')

const tests = [
  {
    name: 'Package.json exists',
    test: () => fs.existsSync('package.json')
  },
  {
    name: 'Server package.json exists',
    test: () => fs.existsSync('server/package.json')
  },
  {
    name: 'Vite config exists',
    test: () => fs.existsSync('vite.config.js')
  },
  {
    name: 'Tailwind config exists',
    test: () => fs.existsSync('tailwind.config.js')
  },
  {
    name: 'Main App component exists',
    test: () => fs.existsSync('src/App.jsx')
  },
  {
    name: 'All React components exist',
    test: () => {
      const components = [
        'src/components/Navbar.jsx',
        'src/components/Hero.jsx',
        'src/components/About.jsx',
        'src/components/Projects.jsx',
        'src/components/Skills.jsx',
        'src/components/Contact.jsx',
        'src/components/Footer.jsx'
      ]
      return components.every(comp => fs.existsSync(comp))
    }
  },
  {
    name: 'Server file exists',
    test: () => fs.existsSync('server/server.js')
  },
  {
    name: 'Environment example exists',
    test: () => fs.existsSync('server/env.example')
  },
  {
    name: 'README exists',
    test: () => fs.existsSync('README.md')
  },
  {
    name: 'Node modules installed (frontend)',
    test: () => fs.existsSync('node_modules')
  },
  {
    name: 'Node modules installed (backend)',
    test: () => fs.existsSync('server/node_modules')
  }
]

let passed = 0
let failed = 0

tests.forEach(({ name, test }) => {
  try {
    if (test()) {
      console.log(`✅ ${name}`)
      passed++
    } else {
      console.log(`❌ ${name}`)
      failed++
    }
  } catch (error) {
    console.log(`❌ ${name} - Error: ${error.message}`)
    failed++
  }
})

console.log(`\n📊 Test Results:`)
console.log(`   ✅ Passed: ${passed}`)
console.log(`   ❌ Failed: ${failed}`)
console.log(`   📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`)

if (failed === 0) {
  console.log('\n🎉 All tests passed! Your portfolio is ready to go.')
  console.log('\n🚀 Next steps:')
  console.log('   1. Run "npm run dev:full" to start the development server')
  console.log('   2. Open http://localhost:3000 in your browser')
  console.log('   3. Edit the content in src/components/ to personalize it')
} else {
  console.log('\n⚠️  Some tests failed. Please check the setup.')
  process.exit(1)
}
