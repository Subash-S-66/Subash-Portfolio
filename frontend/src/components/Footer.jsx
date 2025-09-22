import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Github, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/Subash-S-66',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/subash-s-514aa9373',
      label: 'LinkedIn'
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/1__lucky_?igsh=MWR0bnR0Y29wOXRqMg==',
      label: 'Instagram'
    },
    {
      icon: Mail,
      href: 'mailto:subash.93450@gmail.com',
      label: 'Email'
    }
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Code2 className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">Subash S</span>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-lg">
                B.Tech Computer Science Student & Full Stack Developer specializing in MERN stack. 
                Passionate about creating innovative web solutions and contributing to real-world projects.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-300">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <span>+91-9345081127</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span>subash.93450@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span>Chennai, India</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white">Connect</h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-slate-700 hover:bg-blue-600 rounded-xl transition-all duration-200 group hover:scale-105"
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6 text-slate-300 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © {currentYear} Subash S. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <span>Built with React , Tailwind CSS & Express</span>
              <span>•</span>
              <span>Made with ❤️</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
