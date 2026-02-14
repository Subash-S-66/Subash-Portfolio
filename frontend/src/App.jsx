import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.1,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
    })

    window.__portfolioLenis = lenis

    let rafId = 0
    const frame = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)

    lenis.on('scroll', ScrollTrigger.update)

    const revealElements = gsap.utils.toArray('[data-reveal]')

    revealElements.forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => {
      delete window.__portfolioLenis
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  // Wake up Zeabur backend on site load
  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        await fetch('/api/health', { method: 'GET' })
        console.log('Backend wakeup request sent to /api/health')
      } catch (error) {
        console.log('Backend wakeup failed (this is normal if backend is starting):', error.message)
      }
    }
    wakeUpBackend()
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-28 top-20 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-16 left-1/3 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="soft-grid absolute inset-0 opacity-30" />
      </div>
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
