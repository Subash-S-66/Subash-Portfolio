import React from 'react'
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/Subash-S-66' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/subash-s-514aa9373' },
  { icon: Mail, label: 'Email', href: 'mailto:subash.93450@gmail.com' },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (href) => {
    const target = document.querySelector(href)
    if (!target) return

    const lenis = window.__portfolioLenis
    if (lenis) {
      lenis.scrollTo(target, { offset: -88, duration: 1.1 })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="border-t border-white/10 bg-slate-950/70 py-12 backdrop-blur-xl">
      <div className="container-custom">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Subash S</p>
            <h3 className="mt-3 font-['Space_Grotesk'] text-2xl font-bold text-slate-100">Full-Stack Developer</h3>
            <p className="mt-3 max-w-xl leading-relaxed text-slate-300">
              Building polished digital products with strong engineering fundamentals and modern visual design.
            </p>
            <a
              href="mailto:subash.93450@gmail.com"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-cyan-100"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="text-sm uppercase tracking-[0.2em] text-slate-400">Navigation</h4>
              <div className="mt-3 space-y-2">
                {links.map((link) => (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="block text-sm text-slate-300 transition hover:text-cyan-200"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-[0.2em] text-slate-400">Social</h4>
              <div className="mt-3 space-y-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-cyan-200"
                  >
                    <social.icon className="h-4 w-4" />
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-5 text-sm text-slate-400">
          <p>© {currentYear} Subash S. Built with React, Tailwind, Motion, and Express.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

