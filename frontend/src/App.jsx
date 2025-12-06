import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  // Wake up Render backend on site load
  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        const backendBase = import.meta.env.VITE_API_BASE || 'https://subash-portfolio-backend.onrender.com'
        await fetch(`${backendBase}/api/health`, {
          method: 'GET',
        })
        console.log('Backend wakeup request sent to', backendBase)
      } catch (error) {
        console.log('Backend wakeup failed (this is normal if backend is starting):', error.message)
      }
    }

    wakeUpBackend()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
