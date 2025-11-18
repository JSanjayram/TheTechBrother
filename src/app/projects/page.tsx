'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Search, Grid, List } from 'lucide-react'
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
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
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
    <main className="min-h-screen">
      <Navbar />
      
      <section className="py-20 relative overflow-hidden">
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-white">All </span><span className="text-primary-400">Projects</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Explore my complete portfolio with advanced search and filtering.
              </p>
              
              {/* Search and Filter Bar */}
              <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search projects, technologies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 bg-gray-800/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  
                  <div className="flex bg-gray-800/50 border border-gray-600 rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'} rounded-l-lg transition-colors`}
                    >
                      <Grid size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'} rounded-r-lg transition-colors`}
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Results Count */}
              <p className="text-gray-400 mt-4">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
              </p>
            </motion.div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
                <p className="text-gray-300 mt-4">Loading projects...</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredProjects.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
                  </div>
                ) : (
                  filteredProjects.map((project, index) => {
                    const category = categories.find(cat => cat.id === project.categoryId)
                    
                    return viewMode === 'grid' ? (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="glass-effect rounded-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 cursor-pointer"
                        onClick={() => window.location.href = `/projects/${project.id}`}
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 bg-primary-600 text-white text-xs rounded-full">
                              {category?.name}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                            {project.github && (
                              <motion.a
                                href={project.github}
                                whileHover={{ scale: 1.1 }}
                                className="p-3 bg-white rounded-full text-gray-800 hover:bg-gray-100"
                              >
                                <Github size={20} />
                              </motion.a>
                            )}
                            {project.live && (
                              <motion.a
                                href={project.live}
                                whileHover={{ scale: 1.1 }}
                                className="p-3 bg-white rounded-full text-gray-800 hover:bg-gray-100"
                              >
                                <ExternalLink size={20} />
                              </motion.a>
                            )}
                          </div>
                        </div>
                        
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                          <p className="text-gray-300 text-sm mb-3 line-clamp-2">{project.description}</p>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {project.tech.slice(0, 3).map((tech) => (
                              <span key={tech} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                                {tech}
                              </span>
                            ))}
                            {project.tech.length > 3 && (
                              <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                                +{project.tech.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        className="glass-effect rounded-lg p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
                        onClick={() => window.location.href = `/projects/${project.id}`}
                      >
                        <div className="flex gap-4">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-bold text-white">{project.title}</h3>
                                <span className="text-xs text-primary-400">{category?.name}</span>
                              </div>
                              <div className="flex space-x-2">
                                {project.github && (
                                  <a href={project.github} className="text-gray-400 hover:text-white">
                                    <Github size={16} />
                                  </a>
                                )}
                                {project.live && (
                                  <a href={project.live} className="text-gray-400 hover:text-white">
                                    <ExternalLink size={16} />
                                  </a>
                                )}
                              </div>
                            </div>
                            <p className="text-gray-300 text-sm mb-2 line-clamp-1">{project.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {project.tech.slice(0, 4).map((tech) => (
                                <span key={tech} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}