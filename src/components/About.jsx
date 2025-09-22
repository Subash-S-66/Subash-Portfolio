import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Briefcase, Target, Users, Star, Award, Code2, Zap } from 'lucide-react'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    { icon: GraduationCap, label: 'Education', value: 'B.Tech CSE', subValue: '2022-2026', color: 'from-blue-500 to-cyan-500' },
    { icon: Briefcase, label: 'Experience', value: 'Internship', subValue: 'Postulate Info Tech', color: 'from-purple-500 to-pink-500' },
    { icon: Target, label: 'Focus', value: 'MERN Stack', subValue: 'Full Stack Dev', color: 'from-green-500 to-emerald-500' },
    { icon: Users, label: 'Projects', value: '3+', subValue: 'Completed', color: 'from-orange-500 to-red-500' },
  ]

  const skills = [
    { category: 'Programming', items: ['JavaScript', 'Python'], color: 'from-blue-500 to-cyan-500', icon: Code2 },
    { category: 'Web Development', items: ['React.js', 'Node.js', 'Express.js', 'HTML', 'CSS', 'Tailwind CSS'], color: 'from-purple-500 to-pink-500', icon: Zap },
    { category: 'Database', items: ['MySQL'], color: 'from-green-500 to-emerald-500', icon: Target },
    { category: 'Tools', items: ['Git', 'GitHub'], color: 'from-orange-500 to-red-500', icon: Briefcase },
    { category: 'Other Skills', items: ['Problem Solving', 'Teamwork', 'Communication'], color: 'from-yellow-500 to-orange-500', icon: Star },
  ]

  const languages = [
    { name: 'English', level: 'Fluent', color: 'from-blue-500 to-cyan-500' },
    { name: 'Tamil', level: 'Fluent', color: 'from-green-500 to-emerald-500' },
    { name: 'Hindi', level: 'Basics', color: 'from-purple-500 to-pink-500' },
  ]

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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Computer Science Engineering student with practical experience in full-stack web development, 
            focusing on the MERN stack (using MySQL instead of MongoDB).
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full mb-4 shadow-lg`}>
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
              <p className="text-sm text-gray-500">{stat.subValue}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Profile Summary */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Award className="h-6 w-6 mr-2" />
                Profile Summary
              </h3>
              <div className="space-y-4 text-white/90 leading-relaxed">
                <p>
                  Currently doing an internship at <strong className="text-yellow-300">Postulate Info Tech</strong>, contributing to real-world projects. 
                  Skilled in building web applications, RESTful APIs, responsive UIs, and database management with MySQL.
                </p>
                <p>
                  Seeking opportunities to grow as a full-stack developer and contribute to innovative projects 
                  that make a real impact in the tech industry.
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
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Skills & Expertise</h3>
            <div className="space-y-6">
              {skills.map((skillGroup, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-md border-l-4 border-gradient-to-b from-purple-500 to-pink-500"
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
