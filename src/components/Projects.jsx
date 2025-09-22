import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Code, Database, Palette, Zap, Star, Award, Rocket } from 'lucide-react'

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
      gradient: 'from-blue-500 to-purple-600',
      accentColor: 'from-cyan-400 to-blue-500',
      bgPattern: 'from-blue-100 to-purple-100'
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
      gradient: 'from-green-500 to-teal-600',
      accentColor: 'from-emerald-400 to-green-500',
      bgPattern: 'from-green-100 to-teal-100'
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
      gradient: 'from-orange-500 to-red-600',
      accentColor: 'from-yellow-400 to-orange-500',
      bgPattern: 'from-orange-100 to-red-100'
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
    <section id="projects" className="section-padding bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            My <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
              className={`bg-gradient-to-r ${project.bgPattern} p-8 rounded-2xl shadow-xl border border-white/50 backdrop-blur-sm`}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Project Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <motion.div 
                        className={`p-4 rounded-xl bg-gradient-to-r ${project.gradient} shadow-lg`}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <project.icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                        <p className={`text-sm bg-gradient-to-r ${project.accentColor} bg-clip-text text-transparent font-medium`}>
                          {project.role}
                        </p>
                      </div>
                    </div>
                    <motion.span 
                      className={`px-4 py-2 bg-gradient-to-r ${project.gradient} text-white rounded-full text-sm font-medium shadow-md`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {project.category}
                    </motion.span>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {project.description}
                  </p>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-500" />
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          className="flex items-start space-x-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: index * 0.2 + featureIndex * 0.1 }}
                        >
                          <div className={`w-2 h-2 bg-gradient-to-r ${project.accentColor} rounded-full mt-2 flex-shrink-0`}></div>
                          <span className="text-gray-600">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Rocket className="h-5 w-5 mr-2 text-purple-500" />
                      Tech Stack:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className={`px-3 py-1 bg-gradient-to-r ${project.gradient} text-white rounded-full text-sm font-medium shadow-md`}
                          whileHover={{ scale: 1.1, y: -2 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Visual */}
                <div className="lg:col-span-1">
                  <motion.div 
                    className={`h-64 bg-gradient-to-br ${project.gradient} rounded-xl flex items-center justify-center relative overflow-hidden shadow-2xl`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-center text-white">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <project.icon className="h-16 w-16 mx-auto mb-4 opacity-90" />
                      </motion.div>
                      <h4 className="text-lg font-semibold mb-2">{project.title.split(' - ')[0]}</h4>
                      <p className="text-sm opacity-90">{project.category} Project</p>
                    </div>
                    {/* Animated decorative elements */}
                    <motion.div 
                      className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div 
                      className="absolute bottom-4 left-4 w-6 h-6 bg-white/20 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div 
                      className="absolute top-1/2 left-4 w-4 h-4 bg-white/20 rounded-full"
                      animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  <div className="mt-4 flex space-x-3">
                    <motion.button 
                      className={`flex-1 bg-gradient-to-r ${project.gradient} text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 shadow-lg`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Demo</span>
                    </motion.button>
                    <motion.button 
                      className="flex-1 border-2 border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:border-gray-400 transition-colors"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="h-4 w-4" />
                      <span>Code</span>
                    </motion.button>
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
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-2xl shadow-xl">
            <p className="text-lg text-white/90 mb-6">
              Interested in seeing more of my work?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://github.com/Subash-S-66"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold inline-flex items-center justify-center space-x-2 shadow-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-5 w-5" />
                <span>View All Projects</span>
              </motion.a>
              <motion.a
                href="#contact"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold inline-flex items-center justify-center hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Discuss Your Project
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
