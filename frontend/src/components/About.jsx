import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Rocket, Target } from 'lucide-react'

const stats = [
  { label: 'Experience', value: '1+ Years', icon: Briefcase },
  { label: 'Projects', value: '5+', icon: Rocket },
  { label: 'CGPA', value: '7.7 / 10', icon: GraduationCap },
  { label: 'Focus', value: 'MERN + AI', icon: Target },
]

const stackBadges = [
  'React',
  'Node.js',
  'Express',
  'MongoDB',
  'MySQL',
  'TypeScript',
  'Tailwind CSS',
  'Python',
  'Flask',
  'Capacitor',
  'JWT',
  'GSAP',
]

const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="text-center" data-reveal>
          <h2 className="section-title">
            About <span className="text-gradient">My Craft</span>
          </h2>
          <p className="section-subtitle">
            I design and ship full-stack applications with product-level polish, from architecture and APIs to
            visual interactions and deployment.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.article
            data-reveal
            whileHover={{ y: -4 }}
            className="glass-panel relative overflow-hidden p-7 sm:p-9"
          >
            <div className="absolute -right-20 top-0 h-44 w-44 rounded-full bg-cyan-500/15 blur-3xl" />
            <h3 className="font-['Space_Grotesk'] text-2xl font-semibold text-slate-100 md:text-3xl">Profile Summary</h3>
            <p className="mt-5 text-slate-300 leading-relaxed">
              I&apos;m a B.Tech Computer Science student at Dr. M.G.R. Educational and Research Institute, currently
              working on real-world systems during my internship at Postulate Info Tech.
            </p>
            <p className="mt-4 text-slate-300 leading-relaxed">
              My focus is delivering performant products with thoughtful UI, robust API design, and clean code
              architecture. I work across fintech, productivity, and AI-powered applications.
            </p>
            <p className="mt-4 text-slate-300 leading-relaxed">
              I enjoy building end-to-end solutions: requirements, database schema, API contracts, responsive UI,
              deployment, and post-release iteration.
            </p>
          </motion.article>

          <div className="grid gap-4 sm:grid-cols-2" data-reveal>
            {stats.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -4, scale: 1.01 }}
                className="glass-panel p-5"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-400/10 text-cyan-200">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="font-['Space_Grotesk'] text-2xl font-bold text-slate-100">{item.value}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-10 glass-panel p-6 sm:p-8" data-reveal>
          <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-slate-100 sm:text-2xl">Tech Orbit</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {stackBadges.map((badge) => (
              <motion.span
                key={badge}
                whileHover={{ y: -2, scale: 1.04 }}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200"
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
