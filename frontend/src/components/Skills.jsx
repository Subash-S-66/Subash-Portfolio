import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Code2, 
  Database, 
  Palette, 
  Smartphone, 
  Server, 
  GitBranch,
  Zap,
  Globe,
  Terminal,
  Star,
  Award,
  Rocket,
  Target
} from 'lucide-react'

// Move data outside component to prevent recreation on every render
const skillCategories = [
    {
      title: 'Programming Languages',
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-100 to-cyan-100',
      skills: [
        { name: 'JavaScript', level: 90, description: 'ES6+, Async/Await, DOM Manipulation - 1+ years' },
        { name: 'Python', level: 85, description: 'Flask, Data Processing, Regex - 1+ years' },
      ]
    },
    {
      title: 'Frontend Development',
      icon: Palette,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-100 to-pink-100',
      skills: [
        { name: 'React.js', level: 90, description: 'Hooks, State Management, Component Architecture - 5+ projects' },
        { name: 'HTML5', level: 95, description: 'Semantic HTML, Accessibility - 100% compliance' },
        { name: 'CSS3', level: 90, description: 'Flexbox, Grid, Animations - 1+ years' },
        { name: 'Tailwind CSS', level: 90, description: 'Utility-first, Responsive Design - 4+ projects' },
      ]
    },
    {
      title: 'Backend Development',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-100 to-emerald-100',
      skills: [
        { name: 'Node.js', level: 85, description: 'Event-driven, Non-blocking I/O ' },
        { name: 'Express.js', level: 80, description: 'RESTful APIs, Middleware - 5+ endpoints' },
        { name: 'Flask', level: 75, description: 'Python Web Framework' },
      ]
    },
    {
      title: 'Database',
      icon: Database,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-100 to-red-100',
      skills: [
        { name: 'MySQL', level: 90, description: 'Relational Database, Queries, Joins' },
        { name: 'MongoDB', level: 70, description: 'NoSQL, Document-based' },
        { name: 'PostgreSQL', level: 50, description: 'Advanced SQL, JSON support, Extensions' },
      ]
    },
    {
      title: 'Tools & Technologies',
      icon: Terminal,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-100 to-purple-100',
      skills: [
        { name: 'Git & GitHub', level: 95, description: 'Version Control, Collaboration' },
        { name: 'Razorpay', level: 70, description: 'Payment Gateway Integration' },
        { name: 'Recharts', level: 70, description: 'Data Visualization' },
      ]
    },
    {
      title: 'Soft Skills',
      icon: Zap,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-100 to-rose-100',
      skills: [
        { name: 'Problem Solving', level: 90, description: 'Analytical thinking, Debugging' },
        { name: 'Teamwork', level: 95, description: 'Collaboration, Communication' },
        { name: 'Communication', level: 90, description: 'Technical writing, Presentations' },
      ]
    }
  ]

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const SkillBar = ({ skill, index, categoryColor }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-6 p-4 bg-white/50 rounded-xl backdrop-blur-sm border border-white/20"
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-gray-800 flex items-center">
          <Star className="h-4 w-4 mr-2 text-yellow-500" />
          {skill.name}
        </h4>
        <motion.span 
          className={`text-sm bg-gradient-to-r ${categoryColor} bg-clip-text text-transparent font-bold`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.5, delay: index * 0.1 + 0.5, ease: "easeOut" }}
          className={`bg-gradient-to-r ${categoryColor} h-3 rounded-full shadow-lg relative overflow-hidden`}
        >
          <motion.div
            className="absolute inset-0 bg-white/30 rounded-full"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
      <p className="text-sm text-gray-600 mt-2 flex items-center">
        <Target className="h-3 w-3 mr-1 text-gray-400" />
        {skill.description}
      </p>
    </motion.div>
  )

  return (
    <section id="skills" className="section-padding bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">
            My <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
            A comprehensive overview of my technical skills and expertise in full-stack development, 
            with proficiency levels based on practical experience and project work.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className={`bg-gradient-to-br ${category.bgColor} p-3 sm:p-4 md:p-6 lg:p-8 rounded-2xl shadow-xl border border-white/50 backdrop-blur-sm`}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <motion.div 
                  className={`p-4 rounded-xl bg-gradient-to-r ${category.color} shadow-lg`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <category.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-purple-500" />
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar 
                    key={skillIndex} 
                    skill={skill} 
                    index={categoryIndex * category.skills.length + skillIndex}
                    categoryColor={category.color}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <motion.div 
            className="text-center p-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-xl text-white"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Globe className="h-12 w-12 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2 flex items-center justify-center">
              <Rocket className="h-5 w-5 mr-2" />
              Web Development
            </h3>
            <p className="text-white/90">
              Building responsive, interactive web applications with modern frameworks and best practices.
            </p>
          </motion.div>
          
          <motion.div 
            className="text-center p-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl text-white"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Smartphone className="h-12 w-12 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2 flex items-center justify-center">
              <Star className="h-5 w-5 mr-2" />
              Mobile-First Design
            </h3>
            <p className="text-white/90">
              Creating mobile-friendly interfaces that work seamlessly across all devices and screen sizes.
            </p>
          </motion.div>
          
          <motion.div 
            className="text-center p-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-xl text-white"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <GitBranch className="h-12 w-12 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2 flex items-center justify-center">
              <Target className="h-5 w-5 mr-2" />
              Version Control
            </h3>
            <p className="text-white/90">
              Experienced with Git workflows, collaborative development, and maintaining clean code repositories.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
