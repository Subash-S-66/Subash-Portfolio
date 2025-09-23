import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Briefcase, Target, Users, Star, Award, Code2, Zap } from 'lucide-react'

// Move data outside component to prevent recreation on every render
const stats = [
    { icon: GraduationCap, label: 'Education', value: 'B.Tech CSE', subValue: 'CGPA: 7.7/10', color: 'from-blue-500 to-cyan-500' },
    { icon: Briefcase, label: 'Experience', value: '1+ Years', subValue: 'Internship + Projects', color: 'from-purple-500 to-pink-500' },
    { icon: Target, label: 'Focus', value: 'MERN Stack', subValue: '5+ Applications', color: 'from-green-500 to-emerald-500' },
    { icon: Users, label: 'Impact', value: '5+', subValue: 'Projects Completed', color: 'from-orange-500 to-red-500' },
  ]

const skills = [
    { category: 'Programming', items: ['JavaScript', 'Python'], color: 'from-blue-500 to-cyan-500', icon: Code2 },
    { category: 'Web Development', items: ['React.js', 'Node.js', 'Express.js', 'HTML', 'CSS', 'Tailwind CSS'], color: 'from-purple-500 to-pink-500', icon: Zap },
    { category: 'Database', items: ['MySQL','MongoDB','PostgreSQL'], color: 'from-green-500 to-emerald-500', icon: Target },
    { category: 'Tools', items: ['Git', 'GitHub'], color: 'from-orange-500 to-red-500', icon: Briefcase },
    { category: 'Other Skills', items: ['Problem Solving', 'Teamwork', 'Communication'], color: 'from-yellow-500 to-orange-500', icon: Star },
  ]

const languages = [
    { name: 'English', level: 'Fluent', color: 'from-blue-500 to-cyan-500' },
    { name: 'Tamil', level: 'Fluent', color: 'from-green-500 to-emerald-500' },
    { name: 'Hindi', level: 'Basics', color: 'from-purple-500 to-pink-500' },
  ]

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">
            About <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
            Computer Science Engineering student with practical experience in full-stack web development, 
            focusing on the MERN stack (using MySQL instead of MongoDB).
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-12 sm:mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r ${stat.color} rounded-full mb-3 sm:mb-4 shadow-lg`}>
                <stat.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">{stat.label}</p>
              <p className="text-xs sm:text-sm text-gray-500">{stat.subValue}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Profile Summary */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 sm:p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Award className="h-6 w-6 mr-2" />
                Profile Summary
              </h3>
              <div className="space-y-4 text-white/90 leading-relaxed">
                <p>
                  Currently interning at <strong className="text-yellow-300">Postulate Info Tech</strong>, contributing to real-world projects. 
                  Skilled in building web applications, RESTful APIs, responsive UIs, and database management with MySQL.
                </p>
                <p>
                  Focused on efficient code optimization and database indexing to improve application performance. 
                  Built 5+ full-stack applications using MERN stack, implemented responsive designs across multiple devices, and maintained clean, maintainable code with proper documentation.
                </p>
                <p>
                  <strong className="text-yellow-300">CGPA:</strong> 7.7/10 at Dr.M.G.R. Educational and Research Institute, Chennai
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Skills & Expertise</h3>
            <div className="space-y-6">
              {skills.map((skillGroup, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-3 sm:p-4 rounded-xl shadow-md border-l-4 border-gradient-to-b from-purple-500 to-pink-500"
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <skillGroup.icon className={`h-5 w-5 mr-2 text-transparent bg-gradient-to-r ${skillGroup.color} bg-clip-text`} />
                    {skillGroup.category}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        className={`px-3 py-1 bg-gradient-to-r ${skillGroup.color} text-white rounded-full text-sm font-medium shadow-md`}
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Languages</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {languages.map((language, index) => (
              <motion.div 
                key={index} 
                className={`text-center p-6 bg-gradient-to-r ${language.color} rounded-xl shadow-lg text-white`}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h4 className="font-semibold text-white mb-2">{language.name}</h4>
                <p className="text-white/90 font-medium">{language.level}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
