'use client'

import { motion } from 'framer-motion'
import { Code, Palette, Zap, Users } from 'lucide-react'

const About = () => {
  const skills = [
    { icon: Code, title: 'Development', desc: 'Full-stack web development with modern frameworks' },
    { icon: Palette, title: 'Design', desc: 'UI/UX design with focus on user experience' },
    { icon: Zap, title: 'Performance', desc: 'Optimized, fast-loading applications' },
    { icon: Users, title: 'Collaboration', desc: 'Team player with excellent communication' },
  ]

  return (
    <section id="about" className="py-20 relative overflow-hidden scroll-mt-20">

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
            <span className="text-white">About </span><span className="text-primary-400">Me</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate developer with expertise in creating scalable web applications 
            and beautiful user interfaces that deliver exceptional user experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">My Journey</h3>
            <p className="text-gray-300 mb-4">
              I am a passionate Computer Engineer with hands-on experience with technical stacks and have learned by working on real-world projects. My journey began with simple curiosity—experimenting with web development and design—and evolved into building full-stack projects, cloud-integrated applications, and AI-powered tools.
            </p>
            {/* <p className="text-gray-300 mb-4">
              Over the years, I have worked on projects ranging from music-streaming apps using Kotlin and Spotify APIs to chatbots integrated with Google Sheets and Firebase. I enjoy solving problems, exploring new technologies, and turning creative ideas into meaningful digital experiences.
            </p> */}
            <p className="text-gray-300 mb-6">
              I believe in continuous learning and stay committed to improving my skills in software development, cloud deployment, and research-oriented innovation.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Web Development', 'App Development', 'Frontend Development', 'Backend Development', 'FullStack', 'DataBase Management'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            {/* Geometric Frame Container */}
            <div className="relative">
              {/* Animated Border Corners */}
              <div className="absolute -inset-4 opacity-50">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary-500"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-purple-500"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-purple-500"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary-500"></div>
              </div>
              
              {/* Main Frame */}
              <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-2xl border border-white/10 shadow-2xl">
                {/* Accent Lines */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                
                {/* Photo Container */}
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                  
                  {/* Protected Image */}
                  <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl protected-image">
                    <img 
                      src="/Src.png" 
                      alt="Profile" 
                      className="w-full h-full object-cover pointer-events-none select-none"
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    {/* Overlay Protection */}
                    <div className="absolute inset-0 bg-transparent" onContextMenu={(e) => e.preventDefault()}></div>
                  </div>
                  
                  {/* Decorative Dots */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary-500 rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-500 rounded-full"></div>
                </div>
                
                {/* Info Section */}
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-1">Sanjay Ram</h3>
                  <p className="text-primary-400 font-medium tracking-wide">The Tech Brother</p>
                  <div className="mt-4 flex justify-center gap-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-effect p-6 rounded-2xl depth-shadow hover:shadow-2xl transition-all duration-500 floating"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <skill.icon className="text-white" size={24} />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-white">{skill.title}</h4>
              <p className="text-gray-300">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}

export default About