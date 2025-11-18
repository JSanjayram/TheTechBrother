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
    <section id="about" className="py-20 relative overflow-hidden">

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
            {/* Multi-layer Glow Effects */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-96 h-96 bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
            </div>
            
            {/* Expert Photo Frame */}
            <div className="relative pulse-glow">
              {/* Outer Hexagon with Enhanced Gradients */}
              <div 
                className="w-80 h-80 bg-gradient-to-br from-primary-400 via-purple-500 via-pink-500 to-primary-600 p-2 depth-shadow"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  background: 'linear-gradient(45deg, rgb(37, 99, 235), rgb(139, 92, 246), rgb(236, 72, 153), rgb(37, 99, 235))'
                }}
              >
                {/* Middle Layer */}
                <div 
                  className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 p-1 relative"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                  }}
                >
                  {/* Inner Hexagon */}
                  <div 
                    className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden group"
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    }}
                  >
                    {/* Expert Shimmer Effect */}
                    <div 
                      className="absolute inset-0 expert-shimmer"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.4), transparent)',
                        backgroundSize: '200% 100%'
                      }}
                    ></div>
                    
                    {/* Rotating Particle Effect */}
                    <div className="absolute inset-0">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-primary-400 rounded-full"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: `rotate(${i * 60}deg) translateY(-120px)`,
                            animation: `spin ${12 + i * 2}s linear infinite`
                          }}
                        ></div>
                      ))}
                    </div>
                    
                    {/* Photo Content with Enhanced Styling */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="text-center">
                        <div className="relative mb-6">
                          <div className="w-28 h-28 bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center shadow-2xl overflow-hidden">
                            <img 
                              src="/IMG20240320140726.jpg" 
                              alt="Sanjay Ram" 
                              className="w-full h-full object-cover rounded-full relative z-10"
                            />
                          </div>
                          {/* Orbiting Elements */}
                          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                            <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary-400 rounded-full transform -translate-x-1/2 -translate-y-2"></div>
                            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2 translate-y-2"></div>
                          </div>
                        </div>
                        <p className="text-white font-bold text-xl mb-1">Sanjay Ram</p>
                        <p className="text-primary-300 text-sm font-medium tracking-wider uppercase">Tech Brother</p>
                        <div className="mt-3 flex justify-center space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-1 h-1 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                          ))}
                        </div>
                      </div>
                    </div>
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