import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Instagram,
  Send,
  CheckCircle,
  AlertCircle,
  Star,
  Heart,
  Sparkles,
  MessageCircle
} from 'lucide-react'
import { API_ENDPOINTS } from '../config/api'

// Move data outside component to prevent recreation on every render
const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91-9345081127',
      href: 'tel:+919345081127',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'subash.93450@gmail.com',
      href: 'mailto:subash.93450@gmail.com',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Chennai, India',
      href: '#',
      color: 'from-green-500 to-emerald-500'
    }
  ]

const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Subash-S-66',
      color: 'from-gray-700 to-gray-900',
      hoverColor: 'hover:from-gray-800 hover:to-black'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/subash-s-514aa9373',
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'hover:from-blue-700 hover:to-blue-800'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://www.instagram.com/1__lucky_?igsh=MWR0bnR0Y29wOXRqMg==',
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:from-pink-600 hover:to-purple-700'
    }
  ]

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    if (!formData.name.trim() || formData.name.trim().length < 2 || formData.name.trim().length > 50) {
      setSubmitStatus('error')
      setErrorMessage('Name must be between 2 and 50 characters')
      return false
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setSubmitStatus('error')
      setErrorMessage('Please provide a valid email address')
      return false
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 5 || formData.subject.trim().length > 100) {
      setSubmitStatus('error')
      setErrorMessage('Subject must be between 5 and 100 characters')
      return false
    }
    if (!formData.message.trim() || formData.message.trim().length < 10 || formData.message.trim().length > 1000) {
      setSubmitStatus('error')
      setErrorMessage('Message must be between 10 and 1000 characters')
      return false
    }
    setErrorMessage('')
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setTimeout(() => setSubmitStatus(null), 3000)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">
            Get In <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
            I'm always interested in new opportunities and exciting projects. 
            Let's discuss how we can work together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Heart className="h-6 w-6 mr-2 text-yellow-300" />
                Let's Connect
              </h3>
              <p className="text-white/90 leading-relaxed mb-8">
                I'm a passionate full-stack developer with 1+ years of experience and 5+ completed projects. 
                I'm ready to help you build amazing web solutions and bring your ideas to life. 
                Whether you have a question, want to collaborate, or just want to say hi, 
                I'd love to hear from you!
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-xl hover:shadow-lg transition-all duration-200 border border-white/50"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <motion.div 
                    className={`p-4 rounded-xl bg-gradient-to-r ${info.color} shadow-lg`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <info.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      {info.label}
                    </p>
                    <p className="font-medium text-gray-800">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className={`p-4 bg-gradient-to-r ${social.color} rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group`}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-200" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-white to-blue-50 p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl border border-white/50 backdrop-blur-sm"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <MessageCircle className="h-8 w-8 mr-3 text-purple-500" />
              Send me a message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Star className="h-4 w-4 mr-1 text-purple-500" />
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Star className="h-4 w-4 mr-1 text-pink-500" />
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-base font-medium text-gray-700 mb-3 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-blue-500" />
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-base font-medium text-gray-700 mb-3 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-green-500" />
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={8}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none bg-white/80 backdrop-blur-sm"
                  placeholder="Tell me about your project or question..."
                />
              </div>

              {submitStatus && (
                <motion.div 
                  className={`flex items-center space-x-2 p-4 rounded-xl ${
                    submitStatus === 'success' 
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200' 
                      : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {submitStatus === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span>
                    {submitStatus === 'success' 
                      ? 'Message sent successfully! I\'ll get back to you soon.' 
                      : errorMessage || 'Failed to send message. Please try again.'}
                  </span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-5 rounded-xl font-semibold text-lg flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-6 w-6" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
