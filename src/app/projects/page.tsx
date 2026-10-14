'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Search, Grid, List, ArrowLeft, ArrowUpRight, Layers, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getAllProjects, getAllCategories } from '@/lib/adminService'
import { Project, Category } from '@/types/portfolio'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech?.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || project.categoryId === selectedCategory
    return matchesSearch && matchesCategory
  })

  useEffect(() => {
    const fetchData = async () => {
      const [projectsData, categoriesData] = await Promise.all([
        getAllProjects(),
        getAllCategories()
      ])
      setProjects(projectsData)
      setCategories(categoriesData)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#080a15]">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] bg-blue-600/20 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] bg-purple-600/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="pt-36 pb-24 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <a
                href="/"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card hover:border-blue-400/40 text-xs text-slate-300 font-medium mb-4 transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Return to Home</span>
              </a>

              <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
                Projects <span className="text-gradient">Archive</span>
              </h1>
              <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-8">
                Explore my complete engineering portfolio with real-time search, category filtering, and case studies.
              </p>

              {/* Search and Filter Bar */}
              <div className="flex flex-col md:flex-row gap-3 max-w-4xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search projects by title or technology..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl glass-input text-white text-sm placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 rounded-xl glass-input text-white text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="all" className="bg-[#0a0f26]">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id} className="bg-[#0a0f26]">
                        {category.name}
                      </option>
                    ))}
                  </select>

                  <div className="flex glass-pill p-1 rounded-xl border border-white/10">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === 'grid'
                          ? 'btn-royal text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      aria-label="Grid View"
                    >
                      <Grid size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === 'list'
                          ? 'btn-royal text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      aria-label="List View"
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <p className="text-slate-400 text-sm mt-4">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
              </p>
            </motion.div>

            {/* Loading State */}
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="glass-card rounded-2xl p-5 space-y-4 animate-pulse">
                    <div className="w-full h-48 bg-slate-800 rounded-xl" />
                    <div className="h-5 w-3/4 bg-slate-800 rounded" />
                    <div className="h-4 w-full bg-slate-800/60 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredProjects.length === 0 ? (
                  <div className="col-span-full text-center py-16 glass-card rounded-2xl max-w-md mx-auto">
                    <Layers size={36} className="text-blue-400 mx-auto mb-3 opacity-60" />
                    <p className="text-slate-300 font-bold">No projects found matching your criteria.</p>
                  </div>
                ) : (
                  filteredProjects.map((project, index) => {
                    const category = categories.find(cat => cat.id === project.categoryId)

                    return viewMode === 'grid' ? (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.04 }}
                        whileHover={{ y: -5 }}
                        className="glass-card rounded-3xl overflow-hidden group flex flex-col justify-between border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
                      >
                        <div>
                          {/* Image */}
                          <div
                            className="relative w-full h-48 overflow-hidden bg-slate-900 cursor-pointer"
                            onClick={() => (window.location.href = `/projects/${project.id}`)}
                          >
                            <img
                              src={project.image || '/spotify-tv-app-revamped-home-screen (1).png.jpg'}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080a15] via-[#080a15]/30 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

                            {category && (
                              <div className="absolute top-3 left-3">
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#080a15]/80 backdrop-blur-md border border-blue-500/20 text-blue-300">
                                  {category.name}
                                </span>
                              </div>
                            )}

                            {project.featured && (
                              <div className="absolute top-3 right-3">
                                <span className="px-2 py-0.5 rounded-full text-xs font-semibold badge-royal flex items-center gap-1">
                                  <Sparkles size={11} className="text-blue-400" />
                                  <span>Featured</span>
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Body */}
                          <div className="p-5">
                            <h3
                              onClick={() => (window.location.href = `/projects/${project.id}`)}
                              className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer flex items-center justify-between"
                            >
                              <span>{project.title}</span>
                              <ArrowUpRight size={16} className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h3>

                            <p className="text-slate-300 text-xs mt-2 line-clamp-2 leading-relaxed">
                              {project.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {project.tech?.slice(0, 3).map((tech) => (
                                <span key={tech} className="px-2 py-0.5 rounded text-xs font-medium bg-[#0d1226] border border-blue-500/20 text-slate-300">
                                  {tech}
                                </span>
                              ))}
                              {project.tech && project.tech.length > 3 && (
                                <span className="px-2 py-0.5 rounded text-xs font-medium text-slate-400">
                                  +{project.tech.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="px-5 pb-5 pt-2 border-t border-slate-800 flex items-center justify-between">
                          <a
                            href={`/projects/${project.id}`}
                            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                          >
                            <span>Read Case Study</span>
                            <ArrowUpRight size={13} />
                          </a>

                          <div className="flex items-center gap-2">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-xl bg-[#0d1226] hover:bg-slate-800 border border-blue-500/20 text-slate-300 hover:text-white transition-all"
                                aria-label="GitHub Repository"
                              >
                                <Github size={15} />
                              </a>
                            )}
                            {project.live && (
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-400 hover:text-white transition-all"
                                aria-label="Live Demo"
                              >
                                <ExternalLink size={15} />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.03 }}
                        whileHover={{ y: -3 }}
                        className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group cursor-pointer border border-blue-500/20 hover:border-blue-400/40 transition-all"
                        onClick={() => (window.location.href = `/projects/${project.id}`)}
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={project.image || '/spotify-tv-app-revamped-home-screen (1).png.jpg'}
                            alt={project.title}
                            className="w-16 h-16 rounded-xl object-cover shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                                {project.title}
                              </h3>
                              {category && (
                                <span className="text-xs text-blue-400 px-2 py-0.5 rounded-full bg-blue-600/10 border border-blue-500/20">
                                  {category.name}
                                </span>
                              )}
                            </div>
                            <p className="text-slate-300 text-xs line-clamp-1 mt-0.5">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {project.tech?.slice(0, 4).map((tech) => (
                                <span key={tech} className="px-1.5 py-0.5 rounded text-xs bg-[#0d1226] border border-blue-500/20 text-slate-300">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white"
                            >
                              <Github size={15} />
                            </a>
                          )}
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-400 hover:text-white"
                            >
                              <ExternalLink size={15} />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )
                  })
                )}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}