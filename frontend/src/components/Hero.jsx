import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, Phone, MapPin, Sparkles, Code, Palette, Zap } from 'lucide-react'

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
          className="absolute top-20 left-4 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 bg-blue-500/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-4 sm:right-20 w-8 h-8 sm:w-12 sm:h-12 bg-indigo-500/20 rounded-full"
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-4 sm:left-20 w-6 h-6 sm:w-8 sm:h-8 bg-cyan-500/20 rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-4 sm:right-10 w-16 h-16 sm:w-20 sm:h-20 bg-slate-500/20 rounded-full"
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <div className="container-custom section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight px-2"
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
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-medium px-2"
              >
                B.Tech Computer Science Student
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-sm sm:text-base md:text-lg text-white/80 px-2"
              >
                Full Stack Developer using MERN Stack
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed max-w-lg px-2"
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
              className="flex flex-wrap gap-3 sm:gap-4"
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
              <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-800 rounded-full flex items-center justify-center shadow-2xl border border-blue-500/20">
                <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-gradient-to-br from-blue-700 to-indigo-700 rounded-full flex items-center justify-center border border-blue-400/30">
                  <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full flex items-center justify-center border border-cyan-400/30">
                    <span className="text-3xl sm:text-5xl md:text-6xl font-bold text-white">SS</span>
                  </div>
                </div>
              </div>
              {/* Floating elements - Hidden on mobile to prevent overflow */}
              <div className="hidden sm:block">
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
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute top-1/2 -left-8 w-4 h-4 bg-indigo-500/40 rounded-full border border-indigo-400/50"
                animate={{ 
                  x: [0, 10, 0],
                  rotate: [0, -180, -360]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Additional background bubbles */}
              <motion.div 
                className="absolute top-8 -right-12 w-5 h-5 bg-blue-400/30 rounded-full border border-blue-300/40"
                animate={{ 
                  y: [0, -8, 0],
                  x: [0, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -top-8 left-8 w-3 h-3 bg-cyan-400/30 rounded-full border border-cyan-300/40"
                animate={{ 
                  y: [0, 6, 0],
                  x: [0, 4, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute bottom-8 -right-8 w-4 h-4 bg-indigo-400/30 rounded-full border border-indigo-300/40"
                animate={{ 
                  y: [0, -6, 0],
                  x: [0, 5, 0],
                  rotate: [0, 90, 180]
                }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -bottom-8 right-12 w-3 h-3 bg-slate-400/30 rounded-full border border-slate-300/40"
                animate={{ 
                  y: [0, 8, 0],
                  x: [0, -3, 0],
                  scale: [1, 0.9, 1]
                }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute top-1/3 -right-16 w-2 h-2 bg-blue-300/40 rounded-full border border-blue-200/50"
                animate={{ 
                  x: [0, -8, 0],
                  y: [0, -4, 0],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute bottom-1/3 -left-16 w-2 h-2 bg-cyan-300/40 rounded-full border border-cyan-200/50"
                animate={{ 
                  x: [0, 6, 0],
                  y: [0, 5, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute top-1/4 left-4 w-2 h-2 bg-indigo-300/40 rounded-full border border-indigo-200/50"
                animate={{ 
                  x: [0, 8, 0],
                  y: [0, -6, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute bottom-1/4 right-4 w-2 h-2 bg-slate-300/40 rounded-full border border-slate-200/50"
                animate={{ 
                  x: [0, -6, 0],
                  y: [0, 7, 0],
                  opacity: [0.5, 0.9, 0.5]
                }}
                transition={{ duration: 2.9, repeat: Infinity, ease: "easeInOut" }}
              />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - Perfectly centered horizontally */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-1 left-0 right-0 z-20 flex items-center justify-center w-full sm:bottom-8"
      >
        <motion.button
          onClick={scrollToAbout}
          className="group flex flex-col items-center justify-center space-y-1 w-26 h-12 sm:w-30 sm:h-14 bg-white/15 backdrop-blur-md rounded-full border border-white/30 hover:border-white/50 hover:bg-white/25 transition-all duration-300 cursor-pointer px-4 py-3 shadow-lg"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-white leading-tight text-center">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  )
}

export default Hero
