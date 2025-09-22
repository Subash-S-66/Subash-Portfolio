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
  Terminal
} from 'lucide-react'

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: Code2,
      color: 'from-blue-500 to-blue-600',
      skills: [
        { name: 'JavaScript', level: 90, description: 'ES6+, Async/Await, DOM Manipulation' },
        { name: 'Python', level: 85, description: 'Flask, Data Processing, Regex' },
      ]
    },
    {
      title: 'Frontend Development',
      icon: Palette,
      color: 'from-purple-500 to-purple-600',
      skills: [
        { name: 'React.js', level: 90, description: 'Hooks, State Management, Component Architecture' },
        { name: 'HTML5', level: 95, description: 'Semantic HTML, Accessibility' },
        { name: 'CSS3', level: 90, description: 'Flexbox, Grid, Animations' },
        { name: 'Tailwind CSS', level: 85, description: 'Utility-first, Responsive Design' },
      ]
    },
    {
      title: 'Backend Development',
      icon: Server,
      color: 'from-green-500 to-green-600',
      skills: [
        { name: 'Node.js', level: 85, description: 'Event-driven, Non-blocking I/O' },
        { name: 'Express.js', level: 80, description: 'RESTful APIs, Middleware' },
        { name: 'Flask', level: 75, description: 'Python Web Framework' },
      ]
    },
    {
      title: 'Database',
      icon: Database,
      color: 'from-orange-500 to-orange-600',
      skills: [
        { name: 'MySQL', level: 80, description: 'Relational Database, Queries, Joins' },
        { name: 'MongoDB', level: 70, description: 'NoSQL, Document-based' },
      ]
    },
    {
      title: 'Tools & Technologies',
      icon: Terminal,
      color: 'from-gray-500 to-gray-600',
      skills: [
        { name: 'Git & GitHub', level: 85, description: 'Version Control, Collaboration' },
        { name: 'Razorpay', level: 70, description: 'Payment Gateway Integration' },
        { name: 'Recharts', level: 75, description: 'Data Visualization' },
      ]
    },
    {
      title: 'Soft Skills',
      icon: Zap,
      color: 'from-pink-500 to-pink-600',
      skills: [
        { name: 'Problem Solving', level: 90, description: 'Analytical thinking, Debugging' },
        { name: 'Teamwork', level: 85, description: 'Collaboration, Communication' },
        { name: 'Communication', level: 80, description: 'Technical writing, Presentations' },
      ]
    }
  ]

  const SkillBar = ({ skill, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-secondary-800">{skill.name}</h4>
        <span className="text-sm text-primary-600 font-medium">{skill.level}%</span>
      </div>
      <div className="w-full bg-secondary-200 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
        />
      </div>
      <p className="text-sm text-secondary-600 mt-1">{skill.description}</p>
    </motion.div>
  )

  return (
    <section id="skills" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-6">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and expertise in full-stack development, 
            with proficiency levels based on practical experience and project work.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="card p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-secondary-800">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar 
                    key={skillIndex} 
                    skill={skill} 
                    index={categoryIndex * category.skills.length + skillIndex}
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
          <div className="text-center p-6 bg-primary-50 rounded-xl">
            <Globe className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">Web Development</h3>
            <p className="text-secondary-600">
              Building responsive, interactive web applications with modern frameworks and best practices.
            </p>
          </div>
          
          <div className="text-center p-6 bg-secondary-50 rounded-xl">
            <Smartphone className="h-12 w-12 text-secondary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">Mobile-First Design</h3>
            <p className="text-secondary-600">
              Creating mobile-friendly interfaces that work seamlessly across all devices and screen sizes.
            </p>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <GitBranch className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">Version Control</h3>
            <p className="text-secondary-600">
              Experienced with Git workflows, collaborative development, and maintaining clean code repositories.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
