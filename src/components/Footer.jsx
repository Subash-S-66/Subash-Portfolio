import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

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
    <footer className="bg-secondary-800 text-white">
      <div className="container-custom">
        <div className="py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Code2 className="h-8 w-8 text-primary-400" />
                <span className="text-xl font-bold">Subash S</span>
              </div>
              <p className="text-secondary-300 leading-relaxed mb-6 max-w-md">
                B.Tech Computer Science Student & Full Stack Developer specializing in MERN stack. 
                Passionate about creating innovative web solutions and contributing to real-world projects.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-secondary-300">
                  <Phone className="h-4 w-4 text-primary-400" />
                  <span>+91-9345081127</span>
                </div>
                <div className="flex items-center space-x-3 text-secondary-300">
                  <Mail className="h-4 w-4 text-primary-400" />
                  <span>subash.93450@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-secondary-300">
                  <MapPin className="h-4 w-4 text-primary-400" />
                  <span>Chennai, India</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-secondary-700 hover:bg-primary-600 rounded-lg transition-colors duration-200 group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-secondary-300 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary-400 text-sm">
              © {currentYear} Subash S. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-secondary-400">
              <span>Built with React & Tailwind CSS</span>
              <span>•</span>
              <span>Made with ❤️ in Chennai</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
