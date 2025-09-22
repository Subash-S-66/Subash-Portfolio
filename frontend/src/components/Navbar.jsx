import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Code2, Sparkles, Star } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home', color: 'from-blue-500 to-indigo-500' },
    { name: 'About', href: '#about', color: 'from-slate-500 to-blue-500' },
    { name: 'Projects', href: '#projects', color: 'from-cyan-500 to-blue-500' },
    { name: 'Skills', href: '#skills', color: 'from-indigo-500 to-purple-500' },
    { name: 'Contact', href: '#contact', color: 'from-blue-600 to-indigo-600' },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200' 
          : 'bg-transparent backdrop-blur-md border-b-0'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Code2 className={`h-8 w-8 ${scrolled ? 'text-blue-700' : 'text-white'}`} />
            </motion.div>
            <span className={`text-xl font-bold ${scrolled ? 'bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent' : 'text-white'}`}>
              Subash S
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`${scrolled ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-white hover:text-blue-100 hover:bg-white/20'} font-medium transition-colors duration-200 px-4 py-2 rounded-md`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.name}
              </motion.button>
            ))}
            <motion.a
              href="https://github.com/Subash-S-66/Resume-link/blob/main/Subash%20S%20Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`${scrolled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white/10 hover:bg-white/30 text-white border border-white/30'} text-white px-6 py-2 rounded-full font-medium transition-colors duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Resume</span>
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`${scrolled ? 'text-gray-900 hover:text-blue-600 hover:bg-blue-50' : 'text-white hover:text-blue-100 hover:bg-white/20'} transition-colors duration-200 p-2 rounded-lg backdrop-blur-sm`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div 
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors duration-200"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.a
                href="https://github.com/Subash-S-66/Resume-link/blob/main/Subash%20S%20Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200 mt-4 flex items-center justify-center space-x-2 shadow-sm"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Sparkles className="h-4 w-4" />
                <span>Resume</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
