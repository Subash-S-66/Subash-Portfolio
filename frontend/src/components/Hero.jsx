import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

const roles = [
  'Full-Stack Developer',
  'MERN Engineer',
  'AI Product Builder',
  'Mobile App Creator',
]

const Hero = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        id: index,
        size: (index % 4) + 2,
        x: (index * 13) % 100,
        y: (index * 17) % 100,
        delay: (index % 7) * 0.4,
        duration: 5 + (index % 6),
      })),
    []
  )

  const [typedText, setTypedText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = roles[roleIndex]
    const shouldPause = !isDeleting && typedText === currentWord
    const shouldSwitch = isDeleting && typedText === ''

    if (shouldPause) {
      const pause = setTimeout(() => setIsDeleting(true), 1100)
      return () => clearTimeout(pause)
    }

    if (shouldSwitch) {
      setIsDeleting(false)
      setRoleIndex((previous) => (previous + 1) % roles.length)
      return
    }

    const timeout = setTimeout(
      () => {
        const nextText = isDeleting
          ? currentWord.slice(0, typedText.length - 1)
          : currentWord.slice(0, typedText.length + 1)
        setTypedText(nextText)
      },
      isDeleting ? 45 : 95
    )

    return () => clearTimeout(timeout)
  }, [typedText, roleIndex, isDeleting])

  const smoothScrollTo = (selector) => {
    const target = document.querySelector(selector)
    if (!target) return

    const lenis = window.__portfolioLenis
    if (lenis) {
      lenis.scrollTo(target, { offset: -88, duration: 1.1 })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pb-16 pt-36 md:pt-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(43,196,255,0.22),transparent_25%),radial-gradient(circle_at_78%_12%,rgba(147,86,255,0.24),transparent_28%),radial-gradient(circle_at_55%_70%,rgba(59,255,214,0.13),transparent_32%)]" />

        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-cyan-200/70"
            style={{
              width: particle.size,
              height: particle.size,
              top: `${particle.y}%`,
              left: `${particle.x}%`,
            }}
            animate={{ y: [0, -24, 0], opacity: [0.2, 0.95, 0.2] }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8" data-reveal>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200"
            >
              Digital Craftsmanship
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-['Space_Grotesk'] text-4xl font-bold leading-tight text-slate-50 sm:text-5xl md:text-6xl xl:text-7xl"
            >
              Building immersive
              <br />
              web products with
              <span className="text-gradient"> precision.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-2xl text-lg leading-relaxed text-slate-300"
            >
              I&apos;m <span className="font-semibold text-white">Subash S</span>, a developer focused on fast,
              modern, and polished full-stack experiences.
            </motion.p>

            <div className="rounded-2xl border border-white/10 bg-slate-900/50 px-5 py-4 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Current Focus</p>
              <p className="mt-2 font-['Space_Grotesk'] text-2xl text-cyan-200">
                {typedText}
                <span className="animate-pulse text-fuchsia-300">|</span>
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <button
                type="button"
                onClick={() => smoothScrollTo('#projects')}
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-300/60 bg-gradient-to-r from-cyan-500/70 to-indigo-500/70 px-7 py-3 font-semibold text-white shadow-xl shadow-cyan-900/40 transition-all hover:scale-[1.02] hover:shadow-cyan-500/30"
              >
                Explore Projects
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={() => smoothScrollTo('#contact')}
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-7 py-3 font-semibold text-slate-100 transition-all hover:border-white/40 hover:bg-white/10"
              >
                Let&apos;s Work Together
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="https://github.com/Subash-S-66"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/10 bg-slate-900/60 p-3 text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-200"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/subash-s-514aa9373"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/10 bg-slate-900/60 p-3 text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:subash.93450@gmail.com"
                className="rounded-xl border border-white/10 bg-slate-900/60 p-3 text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-200"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </motion.div>
          </div>

          <motion.aside
            data-reveal
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="glass-panel relative overflow-hidden p-7 sm:p-8"
          >
            <div className="absolute -right-14 -top-16 h-36 w-36 rounded-full bg-cyan-400/30 blur-3xl" />
            <div className="absolute -bottom-14 -left-12 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />

            <div className="relative">
              <div className="mb-8 rounded-2xl border border-white/10 bg-slate-950/50 p-6">
                <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full border border-cyan-300/40 bg-gradient-to-br from-cyan-500/30 to-violet-500/30 neon-ring">
                  <span className="font-['Space_Grotesk'] text-3xl font-bold text-cyan-100">SS</span>
                </div>
                <h2 className="text-center text-2xl font-semibold text-white">Subash S</h2>
                <p className="mt-2 text-center text-sm uppercase tracking-[0.2em] text-slate-400">Full-Stack Engineer</p>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <Phone className="h-4 w-4 text-cyan-300" />
                  <span>+91-9345081127</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <Mail className="h-4 w-4 text-cyan-300" />
                  <span>subash.93450@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <MapPin className="h-4 w-4 text-cyan-300" />
                  <span>Chennai, India</span>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>

        <motion.button
          type="button"
          onClick={() => smoothScrollTo('#about')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mx-auto mt-14 flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm text-slate-300 transition hover:border-cyan-300/60 hover:text-cyan-100"
        >
          Scroll for More
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </motion.button>
      </div>
    </section>
  )
}

export default Hero
