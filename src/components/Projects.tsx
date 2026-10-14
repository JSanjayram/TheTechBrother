'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight, FolderGit2, Sparkles, Layers } from 'lucide-react'
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
    <section id="projects" className="py-24 relative overflow-hidden scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-royal text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">
            <Sparkles size={14} className="text-blue-400" />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mt-3">
            A showcase of my recent web applications, mobile platforms, and AI tools crafted with precision.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="glass-card rounded-3xl p-5 space-y-4 animate-pulse"
              >
                <div className="w-full h-52 bg-slate-800/60 rounded-2xl" />
                <div className="h-6 w-3/4 bg-slate-800/60 rounded-md" />
                <div className="h-4 w-full bg-slate-800/40 rounded-md" />
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-16 bg-slate-800/50 rounded-full" />
                  <div className="h-6 w-16 bg-slate-800/50 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id || project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="glass-card rounded-3xl overflow-hidden group flex flex-col justify-between border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300"
              >
                <div>
                  {/* Image Frame */}
                  <div
                    className="relative w-full h-52 overflow-hidden bg-slate-900 cursor-pointer"
                    onClick={() => (window.location.href = `/projects/${project.id}`)}
                  >
                    <img
                      src={project.image || '/spotify-tv-app-revamped-home-screen (1).png.jpg'}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080a15] via-[#080a15]/30 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#080a15]/80 backdrop-blur-md border border-blue-500/20 text-blue-300 flex items-center gap-1.5 shadow-md">
                        <Layers size={12} />
                        <span>Project</span>
                      </span>

                      {project.featured && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold badge-royal shadow-md flex items-center gap-1">
                          <Sparkles size={11} className="text-blue-400" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3
                      onClick={() => (window.location.href = `/projects/${project.id}`)}
                      className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer flex items-center justify-between gap-2"
                    >
                      <span>{project.title}</span>
                      <ArrowUpRight
                        size={18}
                        className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-blue-400"
                      />
                    </h3>

                    <p className="text-slate-300 text-sm mt-2.5 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tech?.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-[#0d1226] border border-blue-500/20 text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech && project.tech.length > 4 && (
                        <span className="px-2 py-0.5 rounded-lg text-xs font-medium text-slate-400">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <a
                    href={`/projects/${project.id}`}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight size={14} />
                  </a>

                  <div className="flex items-center gap-2">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-[#0d1226] hover:bg-blue-600/20 border border-blue-500/20 text-slate-300 hover:text-white transition-all"
                        aria-label="GitHub Repository"
                        title="GitHub"
                      >
                        <Github size={16} />
                      </a>
                    ) : (
                      <span className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed">
                        <Github size={16} />
                      </span>
                    )}

                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-blue-600/25 hover:bg-blue-600/40 border border-blue-500/30 text-blue-300 hover:text-white transition-all shadow-sm"
                        aria-label="Live Demo"
                        title="Live Demo"
                      >
                        <ExternalLink size={16} />
                      </a>
                    ) : (
                      <span className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed">
                        <ExternalLink size={16} />
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="/projects"
            className="btn-royal inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-sm sm:text-base shadow-lg"
          >
            <FolderGit2 size={18} />
            <span>Explore All Projects Archive</span>
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects