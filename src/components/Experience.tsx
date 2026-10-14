'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Sparkles, CheckCircle2, Download, Code, Smartphone, Rocket, Linkedin } from 'lucide-react'

const Experience = () => {
  const skillPaths = [
    {
      title: 'Full-Stack Development',
      company: 'Advanced Level',
      location: 'Self-Taught & Projects',
      period: '2022 - Present',
      icon: Rocket,
      description: [
        'Mastered modern web development frameworks including React and Next.js',
        'Built scalable full-stack applications with React, Next.js, and Node.js',
        'Implemented database design and real-time syncing with Firebase and MongoDB',
        'Deployed applications using cloud platforms and continuous delivery workflows'
      ],
      tech: ['React', 'Next.js', 'Node.js', 'Firebase', 'MongoDB', 'TypeScript']
    },
    {
      title: 'Frontend Technologies',
      company: 'Expert Level',
      location: 'Hands-On Practice',
      period: '2020 - Present',
      icon: Code,
      description: [
        'Mastered responsive design and modern CSS frameworks with Tailwind CSS',
        'Built interactive user interfaces with advanced animations and motion design',
        'Optimized performance and accessibility standards across multiple devices',
        'Created reusable modular component libraries with strict quality standards'
      ],
      tech: ['HTML/CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
    },
    {
      title: 'Mobile App Development',
      company: 'Intermediate Level',
      location: 'Project-Based',
      period: '2021 - Present',
      icon: Smartphone,
      description: [
        'Developed native Android applications using Kotlin and Android Studio',
        'Integrated REST APIs and third-party services like Spotify developer APIs',
        'Implemented modern UI/UX design patterns adhering to Material Design',
        'Published and tested mobile applications with proper optimization'
      ],
      tech: ['Kotlin', 'Android Studio', 'REST APIs', 'Material Design']
    }
  ]

  return (
    <section id="experience" className="py-24 relative overflow-hidden scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-royal text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">
            <Sparkles size={14} className="text-blue-400" />
            <span>Learning Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Skill <span className="text-gradient">Path</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mt-3">
            My learning journey and technical expertise gained through hands-on projects and continuous skill development.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Center Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-indigo-500/40 to-purple-500/50" />
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-indigo-500/40 to-purple-500/50" />

          <div className="space-y-12">
            {skillPaths.map((exp, index) => {
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''
                    }`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-blue-600/35 flex items-center justify-center">
                      <div className="w-full h-full bg-[#080a15] rounded-[14px] flex items-center justify-center text-white">
                        <exp.icon size={18} className="text-blue-400" />
                      </div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${isEven ? 'md:pl-10' : 'md:pr-10'}`}>
                    <div className="glass-card rounded-3xl p-6 sm:p-7 hover:border-blue-400/40 transition-all duration-300 group border border-blue-500/20">

                      {/* Meta Pill bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium badge-royal">
                          <Calendar size={13} className="text-blue-400" />
                          <span>{exp.period}</span>
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                          <MapPin size={13} className="text-blue-400" />
                          <span>{exp.location}</span>
                        </span>
                      </div>

                      {/* Title & Level */}
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {exp.title}
                      </h3>
                      <h4 className="text-sm font-semibold text-blue-400 mb-4">
                        {exp.company}
                      </h4>

                      {/* Description List */}
                      <ul className="space-y-2 mb-5 text-sm text-slate-300">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                        {exp.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-[#0d1226] border border-blue-500/20 text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Resume Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="https://www.linkedin.com/in/sanjay-ram-j"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-royal inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-sm sm:text-base shadow-lg"
          >
            <Linkedin size={18} />
            <span>View Linkedin</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience