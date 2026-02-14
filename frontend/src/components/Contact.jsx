import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Github, Instagram, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react'
import { API_ENDPOINTS } from '../config/api'

const contactCards = [
  {
    label: 'Phone',
    value: '+91-9345081127',
    href: 'tel:+919345081127',
    icon: Phone,
  },
  {
    label: 'Email',
    value: 'subash.93450@gmail.com',
    href: 'mailto:subash.93450@gmail.com',
    icon: Mail,
  },
  {
    label: 'Location',
    value: 'Chennai, India',
    href: '#contact',
    icon: MapPin,
  },
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Subash-S-66', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/subash-s-514aa9373', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/1__lucky_?igsh=MWR0bnR0Y29wOXRqMg==', icon: Instagram },
]

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
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

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) {
      setTimeout(() => setSubmitStatus(null), 3000)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
      if (!errorMessage) {
        setErrorMessage('Failed to send message. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <div className="text-center" data-reveal>
          <h2 className="section-title">
            Let&apos;s Build <span className="text-gradient">Something Great</span>
          </h2>
          <p className="section-subtitle">
            Have a project idea, collaboration opportunity, or role for me? Send a message and I&apos;ll reply soon.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6" data-reveal>
            <article className="glass-panel p-6 sm:p-8">
              <h3 className="font-['Space_Grotesk'] text-2xl font-semibold text-white">Contact Info</h3>
              <p className="mt-4 leading-relaxed text-slate-300">
                I work on full-stack web products and always welcome meaningful projects that need clean execution.
              </p>

              <div className="mt-6 space-y-3">
                {contactCards.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-300/40 hover:bg-white/10"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-500/15 text-cyan-200">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">{item.label}</span>
                      <span className="text-sm font-medium text-slate-100">{item.value}</span>
                    </span>
                  </a>
                ))}
              </div>
            </article>

            <article className="glass-panel p-6 sm:p-8">
              <h4 className="font-['Space_Grotesk'] text-xl font-semibold text-white">Social</h4>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-200"
                  >
                    <social.icon className="h-4 w-4" />
                    {social.label}
                  </a>
                ))}
              </div>
            </article>
          </div>

          <motion.article data-reveal whileHover={{ y: -3 }} className="glass-panel p-6 sm:p-8">
            <h3 className="font-['Space_Grotesk'] text-2xl font-semibold text-white">Send Message</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Your message is sent directly through the live contact API.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="peer w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 pb-3 pt-6 text-slate-100 outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
                  />
                  <label
                    htmlFor="name"
                    className="pointer-events-none absolute left-4 top-2 text-xs uppercase tracking-[0.16em] text-slate-400 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-cyan-200"
                  >
                    Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="peer w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 pb-3 pt-6 text-slate-100 outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
                  />
                  <label
                    htmlFor="email"
                    className="pointer-events-none absolute left-4 top-2 text-xs uppercase tracking-[0.16em] text-slate-400 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-cyan-200"
                  >
                    Email
                  </label>
                </div>
              </div>

              <div className="relative">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="peer w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 pb-3 pt-6 text-slate-100 outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
                />
                <label
                  htmlFor="subject"
                  className="pointer-events-none absolute left-4 top-2 text-xs uppercase tracking-[0.16em] text-slate-400 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-cyan-200"
                >
                  Subject
                </label>
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="peer w-full resize-none rounded-xl border border-white/15 bg-slate-900/70 px-4 pb-3 pt-6 text-slate-100 outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
                />
                <label
                  htmlFor="message"
                  className="pointer-events-none absolute left-4 top-2 text-xs uppercase tracking-[0.16em] text-slate-400 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-cyan-200"
                >
                  Message
                </label>
              </div>

              {submitStatus ? (
                <div
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
                    submitStatus === 'success'
                      ? 'border-emerald-300/40 bg-emerald-500/15 text-emerald-200'
                      : 'border-rose-300/40 bg-rose-500/15 text-rose-200'
                  }`}
                >
                  {submitStatus === 'success' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <span>
                    {submitStatus === 'success'
                      ? "Message sent successfully! I'll get back to you soon."
                      : errorMessage}
                  </span>
                </div>
              ) : null}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/50 bg-gradient-to-r from-cyan-500/30 to-violet-500/30 px-5 py-3.5 font-semibold text-cyan-100 transition hover:from-cyan-500/40 hover:to-violet-500/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-100 border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.article>
        </div>
      </div>
    </section>
  )
}

export default Contact

