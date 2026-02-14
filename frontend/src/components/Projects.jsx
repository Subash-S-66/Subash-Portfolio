import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Code, Database, Download, ExternalLink, Github, Sparkles, Zap } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'BOLT & BROOK - E-COMMERCE WEBSITE',
    role: 'FULL-STACK DEVELOPER (FRONTEND, BACKEND & DATABASE)',
    date: '2025-2026',
    description:
      'Developed a full-stack e-commerce website for selling dresses with integrated Razorpay payment gateway (test mode).',
    features: [
      'Role-based login system (Admin & Customer) for products, orders, and account operations',
      'Clean mobile-friendly UI built with Tailwind CSS for frictionless shopping',
      'REST APIs using Node.js and Express.js with MySQL-backed data flow',
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'MySQL', 'Razorpay (Test)'],
    category: 'Full Stack',
    icon: Code,
    gradient: 'from-sky-500/75 via-blue-500/70 to-indigo-500/75',
    accentColor: 'text-cyan-200',
    liveDemo: 'https://stage.boltandbrook.com/',
  },
  {
    id: 2,
    title: 'SERVIFY - FREELANCE BIDDING PLATFORM',
    role: 'FULL-STACK PROJECT',
    date: '2024-2025',
    description:
      'Developed a real-time freelance bidding platform enabling clients to post projects and freelancers to place competitive bids.',
    features: [
      'Interactive dashboards and responsive listings for project discovery',
      'Real-time bidding interactions for competitive proposal flow',
      'Designed UX for both clients and freelancers to reduce friction',
    ],
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    category: 'Full Stack',
    icon: Database,
    gradient: 'from-emerald-500/75 via-teal-500/70 to-cyan-500/75',
    accentColor: 'text-emerald-200',
    liveDemo: 'https://servify.zeabur.app/',
  },
  {
    id: 3,
    title: 'EXPENSE TRACKING SYSTEM',
    role: 'FULL-STACK DEVELOPER (FRONTEND, BACKEND & DATABASE)',
    date: '2025-2026',
    description:
      'Developed a full-stack Expense Tracker to simplify personal finance management by logging SMS-based transactions, loans, and salary data.',
    features: [
      'Flask APIs for SMS regex extraction, loan handling, and summary aggregation',
      'Responsive React UI with Tailwind CSS and charts using Recharts',
      'Dynamic filters and real-time update experience for daily monitoring',
    ],
    techStack: ['React.js', 'Flask', 'Python', 'Tailwind CSS', 'Recharts'],
    category: 'Full Stack',
    icon: Zap,
    gradient: 'from-orange-500/75 via-rose-500/70 to-pink-500/75',
    accentColor: 'text-orange-200',
    liveDemo: 'https://subash-s-66.github.io/expense-tracking-system/',
    apkDownloads: [
      {
        label: 'Expense Tracker',
        fileName: 'Expense Tracker.apk',
        url: '/apk/Expense%20Tracker.apk',
      },
    ],
  },
  {
    id: 4,
    title: 'FAIRSHARE',
    role: 'FULL-STACK DEVELOPER (WEB + MOBILE)',
    date: '2025-2026',
    description:
      'Built a debt-management product to track split bills, direct lends, settlements, and reminder workflows across web and mobile.',
    features: [
      'JWT auth flow with sign-up, login, and password reset support',
      'Split-bill and direct-lend workflows with partial payment tracking',
      'Automated reminder system with frequency and timezone controls',
    ],
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Capacitor'],
    category: 'Full Stack',
    icon: Database,
    gradient: 'from-violet-500/75 via-indigo-500/70 to-cyan-500/75',
    accentColor: 'text-violet-200',
    liveDemo: 'https://subash-s-66.github.io/FairSplit/',
    apkDownloads: [
      {
        label: 'Fair Split',
        fileName: 'Fair Split.apk',
        url: '/apk/Fair%20Split.apk',
      },
    ],
  },
  {
    id: 5,
    title: 'REAL-TIME INDIAN SIGN LANGUAGE TO TEXT TRANSLATOR',
    role: 'AI/ML + FULL-STACK DEVELOPER',
    date: '2025-2026',
    description:
      'Built a real-time AI system that translates Indian Sign Language gestures from webcam video into text using a temporal deep learning pipeline.',
    features: [
      'Live stream inference flow from React client to FastAPI backend using WebSocket',
      'MediaPipe keypoint extraction + ONNX LSTM inference with stabilization logic',
      'PyTorch training pipeline and ONNX Runtime deployment for production inference',
    ],
    techStack: ['React', 'Tailwind CSS', 'FastAPI', 'WebSocket', 'MediaPipe', 'PyTorch', 'LSTM', 'ONNX', 'ONNX Runtime'],
    category: 'Full Stack',
    icon: Zap,
    gradient: 'from-fuchsia-500/75 via-pink-500/70 to-rose-500/75',
    accentColor: 'text-fuchsia-200',
  },
]

const downloadApkFiles = (apkDownloads) => {
  if (!apkDownloads?.length) return

  const appList = apkDownloads.map((apk) => `- ${apk.label}`).join('\n')
  const title = apkDownloads.length > 1 ? 'Download Android apps?' : 'Download Android app?'
  const shouldDownload = window.confirm(`${title}\n\n${appList}`)

  if (!shouldDownload) return

  apkDownloads.forEach((apk) => {
    const link = document.createElement('a')
    link.href = apk.url
    link.download = apk.fileName
    document.body.appendChild(link)
    link.click()
    link.remove()
  })
}

const ProjectCard = ({ project, index }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const cardStyle = useMemo(
    () => ({
      transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      transformStyle: 'preserve-3d',
    }),
    [tilt]
  )

  const handleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8
    setTilt({ x: Number(y.toFixed(2)), y: Number(x.toFixed(2)) })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.article
      data-reveal
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: index * 0.06 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      className="glass-panel group relative overflow-hidden p-6 sm:p-8"
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -left-16 top-6 h-20 w-20 rounded-full bg-white/20 blur-2xl" />
      </div>

      <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
              <Sparkles className="h-3.5 w-3.5" />
              {project.category}
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-slate-400">{project.date}</span>
          </div>

          <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white sm:text-3xl">{project.title}</h3>
          <p className={`mt-2 text-sm font-semibold uppercase tracking-[0.16em] ${project.accentColor}`}>{project.role}</p>
          <p className="mt-4 leading-relaxed text-slate-300">{project.description}</p>

          <ul className="mt-6 space-y-3 text-sm text-slate-300">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-cyan-300" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ y: -2, scale: 1.03 }}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-100"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="relative h-52 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50">
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-70`} />
            <motion.div
              className="absolute -left-32 top-0 h-full w-1/2 -skew-x-12 bg-white/25 blur-2xl"
              initial={{ x: -120 }}
              whileHover={{ x: 360 }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
            />
            <div className="relative flex h-full items-center justify-center">
              <div className="text-center">
                <project.icon className="mx-auto h-12 w-12 text-white" />
                <p className="mt-4 font-['Space_Grotesk'] text-lg font-semibold text-white">Project Preview</p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {project.liveDemo ? (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-300/40 bg-cyan-500/20 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/30"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-500"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </button>
            )}

            <a
              href="https://github.com/Subash-S-66"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/40 hover:bg-white/15"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>

            {project.apkDownloads?.length ? (
              <button
                type="button"
                onClick={() => downloadApkFiles(project.apkDownloads)}
                className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl border border-violet-300/40 bg-violet-500/25 px-4 py-3 text-sm font-semibold text-violet-100 transition hover:bg-violet-500/30"
              >
                <Download className="h-4 w-4" />
                {project.apkDownloads.length === 1
                  ? `Download ${project.apkDownloads[0].label} APK`
                  : 'Download Android Apps'}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

const Projects = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <div className="text-center" data-reveal>
          <h2 className="section-title">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subtitle">
            Full-stack builds across fintech, AI, and SaaS experiences. Each project is designed with production-grade
            architecture and polished UX.
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div data-reveal className="mt-12 text-center">
          <a
            href="https://github.com/Subash-S-66"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 px-6 py-3 font-semibold text-cyan-100 transition hover:scale-[1.02] hover:border-cyan-300/70"
          >
            View All Projects
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects

