'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getProjects } from '@/lib/portfolioService'
import { Project } from '@/types/portfolio'

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects()
      setProjects(data)
      setLoading(false)
    }
    fetchProjects()
  }, [])

  return (
    <section id="projects" className="py-20 relative overflow-hidden">

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
            <span className="text-white">Featured </span><span className="text-primary-400">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience 
            in building modern web applications.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
            <p className="text-gray-300 mt-4">Loading projects...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass-effect rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => window.location.href = `/projects/${project.id}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  {project.github ? (
                    <motion.a
                      href={project.github}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100"
                    >
                      <Github size={20} />
                    </motion.a>
                  ) : (
                    <div className="p-2 bg-gray-400 rounded-full text-gray-600 cursor-not-allowed opacity-50">
                      <Github size={20} />
                    </div>
                  )}
                  {project.live ? (
                    <motion.a
                      href={project.live}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  ) : (
                    <div className="p-2 bg-gray-400 rounded-full text-gray-600 cursor-not-allowed opacity-50">
                      <ExternalLink size={20} />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  {project.github ? (
                    <a
                      href={project.github}
                      className="flex items-center text-gray-300 hover:text-primary-400 transition-colors"
                    >
                      <Github size={16} className="mr-1" />
                      Code
                    </a>
                  ) : (
                    <span className="flex items-center text-gray-500 cursor-not-allowed">
                      <Github size={16} className="mr-1" />
                      Code
                    </span>
                  )}
                  {project.live ? (
                    <a
                      href={project.live}
                      className="flex items-center text-gray-300 hover:text-primary-400 transition-colors"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      Live Demo
                    </a>
                  ) : (
                    <span className="flex items-center text-gray-500 cursor-not-allowed">
                      <ExternalLink size={16} className="mr-1" />
                      Live Demo
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors"
          >
            View All Projects
          </motion.a>
        </motion.div>
      </div>
      </div>
    </section>
  )
}

export default Projects