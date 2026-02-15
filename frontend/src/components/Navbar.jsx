import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Sparkles, ArrowUpRight, Globe } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

const portfolioLinks = [
  { name: 'Cosmic AI Theme', url: 'http://subash-dev-portfolio.zeabur.app/' },
  { name: 'Neural Network Theme', url: 'http://subash-s-portfolio.zeabur.app/' },
  { name: 'Game Theme', url: 'http://subash--portfolio.zeabur.app/' },
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isPortfolioMenuOpen, setIsPortfolioMenuOpen] = useState(false)
  const portfolioMenuRef = useRef(null)

  const scrollToSection = (href) => {
    const target = document.querySelector(href)
    if (!target) return

    const nextSection = href.replace('#', '')
    setActiveSection(nextSection)

    const lenis = window.__portfolioLenis

    if (lenis) {
      lenis.scrollTo(target, { offset: -92, duration: 1.1 })
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    setIsMenuOpen(false)
  }

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean)

    const updateNavbarState = () => {
      const scrollPosition = window.scrollY + 120
      setIsScrolled(window.scrollY > 20)

      let currentSection = 'home'

      sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
          currentSection = section.id
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', updateNavbarState, { passive: true })
    window.addEventListener('resize', updateNavbarState)
    updateNavbarState()

    return () => {
      window.removeEventListener('scroll', updateNavbarState)
      window.removeEventListener('resize', updateNavbarState)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!portfolioMenuRef.current) return
      if (!portfolioMenuRef.current.contains(event.target)) {
        setIsPortfolioMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container-custom pt-4">
        <nav
          className={`rounded-2xl border px-4 py-3 transition-all duration-300 md:px-6 ${
            isScrolled
              ? 'border-white/20 bg-slate-900/70 shadow-2xl backdrop-blur-2xl'
              : 'border-white/10 bg-slate-900/40 backdrop-blur-xl'
          }`}
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => scrollToSection('#home')}
              className="group inline-flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/40 bg-slate-900/70 text-cyan-300 shadow-lg">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="text-left">
                <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">Portfolio</span>
                <span className="font-['Space_Grotesk'] text-lg font-semibold text-slate-100">Subash S</span>
              </span>
            </button>

            <div className="hidden items-center gap-2 md:flex">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '')

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => scrollToSection(item.href)}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-white/15 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.2)]'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </button>
                )
              })}
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <div
                className="relative"
                ref={portfolioMenuRef}
                onMouseEnter={() => setIsPortfolioMenuOpen(true)}
                onMouseLeave={() => setIsPortfolioMenuOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsPortfolioMenuOpen((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10"
                >
                  <Globe className="h-4 w-4" />
                  Portfolios
                </button>

                <AnimatePresence>
                  {isPortfolioMenuOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute right-0 mt-2 w-60 rounded-xl border border-white/15 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl"
                    >
                      {portfolioLinks.map((portfolio) => (
                        <a
                          key={portfolio.url}
                          href={portfolio.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
                        >
                          {portfolio.name}
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <a
                href="https://github.com/Subash-S-66/Resume-link/blob/main/Subash%20S%20Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/40 bg-gradient-to-r from-cyan-500/30 to-violet-500/30 px-4 py-2 text-sm font-semibold text-cyan-100 transition-all hover:scale-[1.03] hover:border-cyan-300/70 hover:from-cyan-500/40 hover:to-violet-500/40"
              >
                Resume
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-slate-900/80 text-slate-100 md:hidden"
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <AnimatePresence>
            {isMenuOpen ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="mt-4 overflow-hidden border-t border-white/10 pt-4 md:hidden"
              >
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href.replace('#', '')

                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => scrollToSection(item.href)}
                        className={`w-full rounded-xl px-4 py-3 text-left text-sm transition ${
                          isActive
                            ? 'bg-white/15 text-white'
                            : 'text-slate-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {item.name}
                      </button>
                    )
                  })}

                  <a
                    href="https://github.com/Subash-S-66/Resume-link/blob/main/Subash%20S%20Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/40 bg-gradient-to-r from-cyan-500/30 to-violet-500/30 px-4 py-3 text-sm font-semibold text-cyan-100"
                  >
                    Resume
                    <ArrowUpRight className="h-4 w-4" />
                  </a>

                  {portfolioLinks.map((portfolio) => (
                    <a
                      key={portfolio.url}
                      href={portfolio.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
                    >
                      {portfolio.name}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </nav>
      </div>
    </motion.header>
  )
}

export default Navbar

