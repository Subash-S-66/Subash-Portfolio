import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Database, Globe, Server, Terminal } from 'lucide-react'

const skillGroups = [
  {
    title: 'Frontend',
    icon: Globe,
    items: [
      { name: 'React.js', level: 90 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 75 },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    items: [
      { name: 'Node.js', level: 86 },
      { name: 'Express.js', level: 86 },
      { name: 'Flask', level: 76 },
      { name: 'REST API Design', level: 88 },
    ],
  },
  {
    title: 'Database',
    icon: Database,
    items: [
      { name: 'MySQL', level: 90 },
      { name: 'MongoDB', level: 84 },
      { name: 'PostgreSQL', level: 78 },
      { name: 'Query Optimization', level: 80 },
    ],
  },
  {
    title: 'Workflow',
    icon: Terminal,
    items: [
      { name: 'Git / GitHub', level: 94 },
      { name: 'Deployment', level: 82 },
      { name: 'Debugging', level: 89 },
      { name: 'Documentation', level: 85 },
    ],
  },
]

const highlights = [
  'Production-first mindset',
  'Strong API + UI integration',
  'Performance-aware development',
  'Mobile-responsive by default',
  'Clean and maintainable code',
  'Fast iteration cycle',
]

const Skills = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        <div className="text-center" data-reveal>
          <h2 className="section-title">
            Skills <span className="text-gradient">Matrix</span>
          </h2>
          <p className="section-subtitle">
            A practical skill profile built through shipping full-stack products and solving real-world implementation
            challenges.
          </p>
        </div>

        <div className="mt-14 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-5 sm:grid-cols-2" data-reveal>
            {skillGroups.map((group) => (
              <motion.article
                key={group.title}
                whileHover={{ y: -4 }}
                className="glass-panel p-5 sm:p-6"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/40 bg-cyan-400/10 text-cyan-200">
                    <group.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-slate-100">{group.title}</h3>
                </div>

                <div className="space-y-4">
                  {group.items.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-slate-200">{skill.name}</span>
                        <span className="font-semibold text-cyan-200">{skill.level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          <motion.aside data-reveal whileHover={{ y: -4 }} className="glass-panel p-6 sm:p-8">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-violet-300/40 bg-violet-500/20 text-violet-200">
              <Code2 className="h-6 w-6" />
            </div>
            <h3 className="font-['Space_Grotesk'] text-2xl font-semibold text-white sm:text-3xl">Engineering Style</h3>
            <p className="mt-4 leading-relaxed text-slate-300">
              I build developer-friendly products with clean architecture, intentional UX, and scalable code
              organization.
            </p>
            <div className="mt-6 space-y-3">
              {highlights.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                  <span className="text-sm text-slate-200">{point}</span>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}

export default Skills

