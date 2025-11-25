'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'

const Experience = () => {
  const skillPaths = [
    {
      title: 'Frontend Technologies',
      company: 'Expert Level',
      location: 'Hands-On',
      period: '2020 - Present',
      description: [
        'Mastered responsive design and modern CSS frameworks',
        'Built interactive UIs with advanced animations',
        'Optimized performance and accessibility standards',
        'Created reusable component libraries'
      ],
      tech: ['HTML/CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS']
    },{
      title: 'Full-Stack Development',
      company: 'Advanced Level',
      location: 'Self-Taught',
      period: '2022 - Present',
      description: [
        'Mastered modern web development frameworks and libraries',
        'Built scalable applications with React, Next.js, and Node.js',
        'Implemented database design with Firebase and MongoDB',
        'Deployed applications using cloud platforms and CI/CD'
      ],
      tech: ['React', 'Next.js', 'Node.js', 'Firebase', 'MongoDB']
    },
    
    {
      title: 'Mobile App Development',
      company: 'Intermediate Level',
      location: 'Project-Based',
      period: '2021 - Present',
      description: [
        'Developed native Android applications using Kotlin',
        'Integrated APIs and third-party services like Spotify',
        'Implemented modern UI/UX design patterns',
        'Published apps with proper testing and optimization'
      ],
      tech: ['Kotlin', 'Android Studio', 'REST APIs', 'Material Design']
    }
  ]

  return (
    <section id="experience" className="py-20 relative overflow-hidden">

      <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Skill </span><span className="text-primary-400">Path</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My learning journey and technical expertise gained through hands-on 
            projects and continuous skill development.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-primary-400"></div>

          {skillPaths.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary-400 rounded-full border-4 border-gray-800 shadow-lg z-10"></div>

              {/* Content Card */}
              <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass-effect p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <Calendar size={16} className="mr-1" />
                    {exp.period}
                    <MapPin size={16} className="ml-4 mr-1" />
                    {exp.location}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                  <h4 className="text-lg font-semibold text-primary-400 mb-4">{exp.company}</h4>
                  
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-gray-300 flex items-start">
                        <span className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary-600/20 text-primary-300 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://www.linkedin.com/in/sanjay-ram-j"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors"
          >
            Download Resume
          </motion.a>
        </motion.div>
      </div>
      </div>
    </section>
  )
}

export default Experience