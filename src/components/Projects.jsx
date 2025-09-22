import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Code, Database, Palette, Zap } from 'lucide-react'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = [
    {
      id: 1,
      title: 'BOLT & BROOK - E-COMMERCE WEBSITE',
      role: 'FULL-STACK DEVELOPER (FRONTEND, BACKEND & DATABASE)',
      description: 'Developed a full-stack e-commerce website for selling dresses with integrated Razorpay payment gateway (test mode).',
      features: [
        'Role-based login system (Admin & Customer) to control access to product management, orders, and user accounts',
        'Clean, mobile-friendly UI using Tailwind CSS for smooth shopping experience',
        'Built backend APIs using Node.js and Express.js to handle user roles, product data, and orders with MySQL'
      ],
      techStack: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'MySQL', 'Razorpay (Test)'],
      category: 'Full Stack',
      icon: Code,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      title: 'SERVIFY - FREELANCE BIDDING PLATFORM',
      role: 'FRONT-END DEVELOPER',
      description: 'Developed a real-time freelance bidding platform enabling clients to post projects and freelancers to place competitive bids.',
      features: [
        'Built interactive dashboards and responsive product listings using React.js and CSS',
        'Real-time bidding system for project management',
        'User-friendly interface for both clients and freelancers'
      ],
      techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
      category: 'Frontend',
      icon: Database,
      gradient: 'from-green-500 to-teal-600'
    },
    {
      id: 3,
      title: 'EXPENSE TRACKING SYSTEM',
      role: 'FULL-STACK DEVELOPER (FRONTEND, BACKEND & DATABASE)',
      description: 'Developed a full-stack Expense Tracker to simplify personal finance management by logging SMS-based transactions, loans, and salary data.',
      features: [
        'Built Flask APIs to extract transaction amounts from SMS using regex, manage loans, and aggregate data',
        'Designed responsive React UI with Tailwind CSS and visualized expenses using Recharts',
        'Enabled dynamic filtering and real-time updates for seamless expense monitoring'
      ],
      techStack: ['React.js', 'Flask', 'Python', 'Tailwind CSS', 'Recharts'],
      category: 'Full Stack',
      icon: Zap,
      gradient: 'from-orange-500 to-red-600'
    }
  ]

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Frontend':
        return Palette
      case 'Backend':
        return Database
      case 'Full Stack':
        return Code
      default:
        return Code
    }
  }

  return (
    <section id="projects" className="section-padding bg-gradient-to-br from-secondary-50 to-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-6">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Here are some of the projects I've worked on, showcasing my skills in full-stack development, 
            UI/UX design, and problem-solving abilities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="card card-hover p-8"
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Project Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${project.gradient}`}>
                        <project.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-secondary-800">{project.title}</h3>
                        <p className="text-sm text-primary-600 font-medium">{project.role}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-secondary-600 leading-relaxed">
                    {project.description}
                  </p>

                  <div>
                    <h4 className="font-semibold text-secondary-800 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-secondary-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary-800 mb-3">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Visual */}
                <div className="lg:col-span-1">
                  <div className={`h-64 bg-gradient-to-br ${project.gradient} rounded-xl flex items-center justify-center relative overflow-hidden`}>
                    <div className="text-center text-white">
                      <project.icon className="h-16 w-16 mx-auto mb-4 opacity-80" />
                      <h4 className="text-lg font-semibold mb-2">{project.title.split(' - ')[0]}</h4>
                      <p className="text-sm opacity-90">{project.category} Project</p>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/20 rounded-full"></div>
                    <div className="absolute top-1/2 left-4 w-4 h-4 bg-white/20 rounded-full"></div>
                  </div>
                  
                  <div className="mt-4 flex space-x-3">
                    <button className="flex-1 btn-primary flex items-center justify-center space-x-2">
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Demo</span>
                    </button>
                    <button className="flex-1 btn-outline flex items-center justify-center space-x-2">
                      <Github className="h-4 w-4" />
                      <span>Code</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-secondary-600 mb-6">
            Interested in seeing more of my work?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/Subash-S-66"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center space-x-2"
            >
              <Github className="h-5 w-5" />
              <span>View All Projects</span>
            </a>
            <a
              href="#contact"
              className="btn-outline inline-flex items-center justify-center"
            >
              Let's Discuss Your Project
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
