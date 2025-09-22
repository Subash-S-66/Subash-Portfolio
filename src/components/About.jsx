import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Briefcase, Target, Users } from 'lucide-react'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    { icon: GraduationCap, label: 'Education', value: 'B.Tech CSE', subValue: '2022-2026' },
    { icon: Briefcase, label: 'Experience', value: 'Internship', subValue: 'Postulate Info Tech' },
    { icon: Target, label: 'Focus', value: 'MERN Stack', subValue: 'Full Stack Dev' },
    { icon: Users, label: 'Projects', value: '3+', subValue: 'Completed' },
  ]

  const skills = [
    { category: 'Programming', items: ['JavaScript', 'Python'] },
    { category: 'Web Development', items: ['React.js', 'Node.js', 'Express.js', 'HTML', 'CSS', 'Tailwind CSS'] },
    { category: 'Database', items: ['MySQL'] },
    { category: 'Tools', items: ['Git', 'GitHub'] },
    { category: 'Other Skills', items: ['Problem Solving', 'Teamwork', 'Communication'] },
  ]

  const languages = [
    { name: 'English', level: 'Fluent' },
    { name: 'Tamil', level: 'Fluent' },
    { name: 'Hindi', level: 'Basics' },
  ]

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
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
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <stat.icon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-800 mb-1">{stat.value}</h3>
              <p className="text-secondary-600 font-medium">{stat.label}</p>
              <p className="text-sm text-secondary-500">{stat.subValue}</p>
            </div>
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
            <h3 className="text-2xl font-bold text-secondary-800 mb-6">Profile Summary</h3>
            <div className="space-y-4 text-secondary-600 leading-relaxed">
              <p>
                Currently doing an internship at <strong>Postulate Info Tech</strong>, contributing to real-world projects. 
                Skilled in building web applications, RESTful APIs, responsive UIs, and database management with MySQL.
              </p>
              <p>
                Seeking opportunities to grow as a full-stack developer and contribute to innovative projects 
                that make a real impact in the tech industry.
              </p>
              <p>
                <strong>CGPA:</strong> 7.7/10 at Dr.M.G.R. Educational and Research Institute, Chennai
              </p>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-secondary-800 mb-6">Skills & Expertise</h3>
            <div className="space-y-6">
              {skills.map((skillGroup, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-secondary-700 mb-2">{skillGroup.category}:</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
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
          <h3 className="text-2xl font-bold text-secondary-800 mb-8 text-center">Languages</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {languages.map((language, index) => (
              <div key={index} className="text-center p-6 bg-secondary-50 rounded-lg">
                <h4 className="font-semibold text-secondary-800 mb-2">{language.name}</h4>
                <p className="text-primary-600 font-medium">{language.level}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
