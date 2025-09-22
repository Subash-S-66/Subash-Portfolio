import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, Phone, MapPin, Code, Palette, Zap, Sparkles } from 'lucide-react'

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.querySelector('#about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Professional gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
      
      {/* Professional floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 bg-blue-500/20 rounded-full"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-12 h-12 bg-indigo-500/20 rounded-full"
          animate={{ 
            y: [0, 20, 0],
            x: [0, 10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-8 h-8 bg-cyan-500/20 rounded-full"
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-20 h-20 bg-slate-500/20 rounded-full"
          animate={{ 
            y: [0, 25, 0],
            x: [0, -15, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <div className="container-custom section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Icon showcase */}
            <motion.div
              className="flex justify-center lg:justify-start mb-6"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="flex space-x-4">
                <motion.div
                  className="p-3 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Code className="w-8 h-8 text-blue-300" />
                </motion.div>
                <motion.div
                  className="p-3 bg-indigo-500/20 backdrop-blur-sm rounded-full border border-indigo-400/30"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Palette className="w-8 h-8 text-indigo-300" />
                </motion.div>
                <motion.div
                  className="p-3 bg-cyan-500/20 backdrop-blur-sm rounded-full border border-cyan-400/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Zap className="w-8 h-8 text-cyan-300" />
                </motion.div>
                <motion.div
                  className="p-3 bg-slate-500/20 backdrop-blur-sm rounded-full border border-slate-400/30"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Sparkles className="w-8 h-8 text-slate-300" />
                </motion.div>
              </div>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  Subash S
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/90 font-medium"
              >
                B.Tech Computer Science Student
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg text-white/80"
              >
                Full Stack Developer using MERN Stack
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg text-white/80 leading-relaxed max-w-lg"
            >
              Computer Science Engineering student with practical experience in full-stack web development, 
              focusing on the MERN stack. Currently doing an internship at Postulate Info Tech, 
              contributing to real-world projects.
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 text-white/90">
                <Phone className="h-5 w-5 text-yellow-400" />
                <span>+91-9345081127</span>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <Mail className="h-5 w-5 text-pink-400" />
                <span>subash.93450@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <MapPin className="h-5 w-5 text-purple-400" />
                <span>Chennai, India</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={scrollToAbout}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More About Me
              </motion.button>
              <motion.a
                href="#projects"
                className="border-2 border-blue-400/50 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex space-x-4"
            >
              <motion.a
                href="https://github.com/Subash-S-66"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-500/20 backdrop-blur-sm hover:bg-blue-500/30 text-blue-300 rounded-full transition-all duration-200 border border-blue-400/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/subash-s-514aa9373"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-indigo-500/20 backdrop-blur-sm hover:bg-indigo-500/30 text-indigo-300 rounded-full transition-all duration-200 border border-indigo-400/30"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-6 w-6" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-800 rounded-full flex items-center justify-center shadow-2xl border border-blue-500/20">
                <div className="w-72 h-72 bg-gradient-to-br from-blue-700 to-indigo-700 rounded-full flex items-center justify-center border border-blue-400/30">
                  <div className="w-64 h-64 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full flex items-center justify-center border border-cyan-400/30">
                    <span className="text-6xl font-bold text-white">SS</span>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/40 rounded-full border border-blue-400/50"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-500/40 rounded-full border border-cyan-400/50"
                animate={{ 
                  y: [0, 10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute top-1/2 -left-8 w-4 h-4 bg-indigo-500/40 rounded-full border border-indigo-400/50"
                animate={{ 
                  x: [0, 10, 0],
                  rotate: [0, -180, -360]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToAbout}
          className="flex flex-col items-center space-y-2 text-blue-300 hover:text-white transition-colors duration-200 p-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  )
}

export default Hero
