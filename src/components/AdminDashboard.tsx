'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Plus, Edit, Trash2, Save, X, Search, Filter, Eye, Settings, BarChart3, Users, FolderOpen, Menu } from 'lucide-react'

import { getAllProjects, getAllExperience, getAllSkills, getAllCategories, addProject, updateProject, deleteProject, addSkill, updateSkill, deleteSkill, addCategory, updateCategory, deleteCategory, getAllAITools, addAITool, updateAITool, deleteAITool } from '@/lib/adminService'
import { Project, Experience, Skill, Category, AITool } from '@/types/portfolio'

export default function AdminDashboard() {

  const handleLogout = async () => {
    try {
      const { signOut } = await import('firebase/auth')
      const { auth } = await import('@/lib/firebase')
      await signOut(auth)
      window.location.href = '/admin'
    } catch (error) {
      console.error('Logout error:', error)
      window.location.href = '/admin'
    }
  }
  const [activeTab, setActiveTab] = useState<'projects' | 'experience' | 'skills' | 'aitools'>('projects')
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [aiTools, setAITools] = useState<AITool[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingAITool, setEditingAITool] = useState<AITool | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [addingSkillToCategory, setAddingSkillToCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategoryFilter === 'all' || project.categoryId === selectedCategoryFilter
    return matchesSearch && matchesCategory
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const projectsData = await getAllProjects()
      const skillsData = await getAllSkills()
      const categoriesData = await getAllCategories()
      const aiToolsData = await getAllAITools()
      console.log('Loaded projects:', projectsData)
      console.log('Loaded categories:', categoriesData)
      setProjects(projectsData)
      setSkills(skillsData)
      setCategories(categoriesData)
      setAITools(aiToolsData)
    } catch (error) {
      console.error('Error loading data:', error)
    }
    setLoading(false)
  }

  const handleAddProject = async (projectData: Omit<Project, 'id'>) => {
    try {
      console.log('Adding project with data:', projectData)
      const projectId = await addProject(projectData)
      console.log('Project added successfully with ID:', projectId)
      
      // Reload data to refresh the UI
      const updatedProjects = await getAllProjects()
      console.log('Updated projects after add:', updatedProjects)
      setProjects(updatedProjects)
      
      setShowAddForm(false)
      alert('Project added successfully!')
    } catch (error) {
      console.error('Error adding project:', error)
      alert('Error adding project: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const handleAddSkill = async (skillData: Omit<Skill, 'id'>) => {
    try {
      await addSkill(skillData)
      loadData()
      setShowAddForm(false)
    } catch (error) {
      console.error('Error adding skill:', error)
    }
  }

  const handleUpdateSkill = async (skillData: Skill) => {
    try {
      await updateSkill(skillData.id, skillData)
      loadData()
      setEditingSkill(null)
    } catch (error) {
      console.error('Error updating skill:', error)
    }
  }

  const handleDeleteSkill = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(id)
        loadData()
      } catch (error) {
        console.error('Error deleting skill:', error)
      }
    }
  }

  const handleAddCategory = async (categoryData: Omit<Category, 'id'>) => {
    try {
      await addCategory(categoryData)
      loadData()
      setShowAddCategory(false)
    } catch (error) {
      console.error('Error adding category:', error)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id)
        loadData()
      } catch (error) {
        console.error('Error deleting category:', error)
      }
    }
  }

  const handleUpdateCategory = async (categoryData: Category) => {
    try {
      await updateCategory(categoryData.id, categoryData)
      loadData()
      setEditingCategory(null)
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }

  const handleUpdateProject = async (projectData: Project) => {
    try {
      await updateProject(projectData.id, projectData)
      loadData()
      setEditingProject(null)
    } catch (error) {
      console.error('Error updating project:', error)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id)
        loadData()
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen ${sidebarOpen ? 'w-64' : 'w-20'} glass-effect shadow-lg transition-all duration-300 z-10`}>
        <div className="p-9 py-10 border-b border-gray-700/50">
          <div className="flex items-center justify-between h-full">
            {sidebarOpen && <h1 className="text-xl font-bold text-white">Admin Panel</h1>}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white">
              <Menu size={20} />
            </button>
          </div>
        </div>
        
        <nav className="p-6 pb-20">
          {[{id: 'projects', label: 'Projects', icon: FolderOpen}, {id: 'experience', label: 'Experience', icon: BarChart3}, {id: 'skills', label: 'Skills', icon: Users}, {id: 'aitools', label: 'AI Tools', icon: Settings}].map((item) => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center ${sidebarOpen ? 'px-4' : 'justify-center px-2'} py-3 mb-3 rounded-lg transition-all ${
                  activeTab === item.id ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={20} className={sidebarOpen ? 'mr-3' : ''} />
                {sidebarOpen && <span>{item.label}</span>}
              </motion.button>
            )
          })}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700/50 glass-effect">
          <motion.button onClick={handleLogout} className={`w-full flex items-center ${sidebarOpen ? 'px-4' : 'justify-center px-2'} py-3 bg-red-600 text-white rounded-lg hover:bg-red-700`}>
            <LogOut size={20} className={sidebarOpen ? 'mr-2' : ''} />
            {sidebarOpen && <span>Logout</span>}
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="glass-effect shadow-sm border-b border-gray-700/50 px-6 py-8">
          <div className="flex justify-between items-center h-full">
            <div>
              <h2 className="text-2xl font-bold text-white capitalize">{activeTab} Dashboard</h2>
              <p className="text-gray-300 text-sm">Manage your {activeTab}</p>
            </div>
            <div className="flex space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{projects.length}</div>
                <div className="text-xs text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{projects.filter(p => p.featured).length}</div>
                <div className="text-xs text-gray-400">Featured</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{skills.length}</div>
                <div className="text-xs text-gray-400">Skills</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{categories.length}</div>
                <div className="text-xs text-gray-400">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{aiTools.length}</div>
                <div className="text-xs text-gray-400">AI Tools</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-6">

        <div className="glass-effect rounded-xl shadow-sm p-6">
          {/* Add Button */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white capitalize">{activeTab} Management</h2>
              <p className="text-gray-400 text-sm">Manage your {activeTab} with advanced controls</p>
            </div>
            
            {activeTab === 'projects' && (
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg text-sm focus:ring-2 focus:ring-primary-400 w-full sm:w-64"
                  />
                </div>
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg text-sm focus:ring-2 focus:ring-primary-400"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <div className="flex gap-2">
              <motion.button
                onClick={() => setShowAddCategory(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Plus size={16} className="mr-2" />
                Add Category
              </motion.button>
              {activeTab === 'projects' && (
                <motion.button
                  onClick={() => setShowAddForm(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                >
                  <Plus size={16} className="mr-2" />
                  Add Project
                </motion.button>
              )}
            </div>
          </div>

          {/* Projects List Grouped by Category */}
          {activeTab === 'projects' && (
            <div className="space-y-8">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400 mx-auto"></div>
                  <p className="text-gray-300 mt-4">Loading...</p>
                </div>
              ) : selectedCategoryFilter === 'all' ? (
                <div className="bg-gray-800/30 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">All Projects</h3>
                  </div>
                  <div className="space-y-3">
                    {filteredProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white mb-2">{project.title}</h4>
                            <p className="text-gray-300 mb-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {project.tech.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-1 bg-primary-600/20 text-primary-300 rounded text-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <div className="flex space-x-4 text-sm text-gray-400">
                              <span>Featured: {project.featured ? 'Yes' : 'No'}</span>
                              <span>Order: {project.order}</span>
                              <span>Category: {categories.find(c => c.id === project.categoryId)?.name || 'Uncategorized'}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <motion.button
                              onClick={() => setEditingProject(project)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              <Edit size={16} />
                            </motion.button>
                            <motion.button
                              onClick={() => handleDeleteProject(project.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                categories.filter(category => category.id === selectedCategoryFilter).map((category) => {
                  const categoryProjects = filteredProjects.filter(project => project.categoryId === category.id)
                  return (
                    <div key={category.id} className="bg-gray-800/30 rounded-xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">{category.name}</h3>
                        <div className="flex space-x-2">
                          <motion.button
                            onClick={() => {
                              setSelectedCategoryId(category.id)
                              setShowAddForm(true)
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                            title="Add Project"
                          >
                            <Plus size={16} />
                          </motion.button>
                          <motion.button
                            onClick={() => setEditingCategory(category)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            title="Edit Category"
                          >
                            <Edit size={16} />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDeleteCategory(category.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                            title="Delete Category"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {categoryProjects.map((project) => (
                          <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-white mb-2">{project.title}</h4>
                                <p className="text-gray-300 mb-3">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {project.tech.map((tech) => (
                                    <span
                                      key={tech}
                                      className="px-2 py-1 bg-primary-600/20 text-primary-300 rounded text-sm"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex space-x-4 text-sm text-gray-400">
                                  <span>Featured: {project.featured ? 'Yes' : 'No'}</span>
                                  <span>Order: {project.order}</span>
                                </div>
                              </div>
                              <div className="flex space-x-2 ml-4">
                                <motion.button
                                  onClick={() => setEditingProject(project)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                  <Edit size={16} />
                                </motion.button>
                                <motion.button
                                  onClick={() => handleDeleteProject(project.id)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                  <Trash2 size={16} />
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          )}

          {/* AI Tools List */}
          {activeTab === 'aitools' && (
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400 mx-auto"></div>
                  <p className="text-gray-300 mt-4">Loading...</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-end mb-4">
                    <motion.button
                      onClick={() => setShowAddForm(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                    >
                      <Plus size={16} className="mr-2" />
                      Add AI Tool
                    </motion.button>
                  </div>
                  {aiTools.map((tool) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="text-3xl mr-3">{tool.icon}</span>
                            <h4 className="text-lg font-semibold text-white">{tool.name}</h4>
                            {tool.featured && (
                              <span className="ml-2 px-2 py-1 bg-yellow-400 text-black text-xs rounded">Featured</span>
                            )}
                          </div>
                          <p className="text-gray-300 mb-2">{tool.description}</p>
                          <div className="flex space-x-4 text-sm text-gray-400">
                            <span>Category: {tool.category}</span>
                            <span>Order: {tool.order}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <motion.button
                            onClick={() => setEditingAITool(tool)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            <Edit size={16} />
                          </motion.button>
                          <motion.button
                            onClick={async () => {
                              if (confirm('Delete this AI tool?')) {
                                await deleteAITool(tool.id)
                                loadData()
                              }
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          )}

          {/* Skills List Grouped by Category */}
          {activeTab === 'skills' && (
            <div className="space-y-8">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400 mx-auto"></div>
                  <p className="text-gray-300 mt-4">Loading...</p>
                </div>
              ) : (
                categories.map((category) => {
                  const categorySkills = skills.filter(skill => skill.categoryId === category.id)
                  return (
                    <div key={category.id} className="bg-gray-800/30 rounded-xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">{category.name}</h3>
                        <div className="flex space-x-2">
                          <motion.button
                            onClick={() => setAddingSkillToCategory(category.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                            title="Add Skill"
                          >
                            <Plus size={16} />
                          </motion.button>
                          <motion.button
                            onClick={() => setEditingCategory(category)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            title="Edit Category"
                          >
                            <Edit size={16} />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDeleteCategory(category.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                            title="Delete Category"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {categorySkills.map((skill) => (
                          <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center mb-2">
                                  <span className="text-2xl mr-3">{skill.icon}</span>
                                  <h4 className="text-lg font-semibold text-white">{skill.name}</h4>
                                </div>
                                <div className="flex space-x-4 text-sm text-gray-400">
                                  <span>Level: {skill.level}%</span>
                                  <span>Order: {skill.order}</span>
                                </div>
                              </div>
                              <div className="flex space-x-2 ml-4">
                                <motion.button
                                  onClick={() => setEditingSkill(skill)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                  <Edit size={16} />
                                </motion.button>
                                <motion.button
                                  onClick={() => handleDeleteSkill(skill.id)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                  <Trash2 size={16} />
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          )}

        </div>
      </div>

      {/* Add Form Modal */}
      {showAddForm && activeTab === 'aitools' && (
        <AddAIToolForm
          onSubmit={async (data) => {
            await addAITool(data)
            loadData()
            setShowAddForm(false)
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {showAddForm && activeTab === 'projects' && (
        <AddProjectForm
          onSubmit={handleAddProject}
          onCancel={() => {
            setShowAddForm(false)
            setSelectedCategoryId(null)
          }}
          preSelectedCategoryId={selectedCategoryId}
        />
      )}
      
      {showAddCategory && (
        <AddCategoryForm
          onSubmit={handleAddCategory}
          onCancel={() => setShowAddCategory(false)}
        />
      )}
      
      {addingSkillToCategory && (
        <AddSkillForm
          categoryId={addingSkillToCategory}
          onSubmit={(skillData) => {
            handleAddSkill({ ...skillData, categoryId: addingSkillToCategory })
            setAddingSkillToCategory(null)
          }}
          onCancel={() => setAddingSkillToCategory(null)}
        />
      )}

      {/* Edit Form Modal */}
      {editingProject && (
        <EditProjectForm
          project={editingProject}
          onSubmit={handleUpdateProject}
          onCancel={() => setEditingProject(null)}
        />
      )}

      {editingSkill && (
        <EditSkillForm
          skill={editingSkill}
          onSubmit={handleUpdateSkill}
          onCancel={() => setEditingSkill(null)}
        />
      )}

      {editingCategory && (
        <EditCategoryForm
          category={editingCategory}
          onSubmit={handleUpdateCategory}
          onCancel={() => setEditingCategory(null)}
        />
      )}

      {editingAITool && (
        <EditAIToolForm
          tool={editingAITool}
          onSubmit={async (data) => {
            await updateAITool(data.id, data)
            loadData()
            setEditingAITool(null)
          }}
          onCancel={() => setEditingAITool(null)}
        />
      )}
        </div>
      </div>
  )
}

// Add AI Tool Form
const AddAIToolForm = ({ onSubmit, onCancel }: { onSubmit: (data: Omit<AITool, 'id'>) => void, onCancel: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tagline: '',
    icon: '',
    image: '',
    category: '',
    url: '',
    featured: false,
    order: 0
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Add AI Tool</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              placeholder="Short catchy tagline"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Icon (emoji)</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
                placeholder="🤖"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
                placeholder="https://example.com/image.png"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description - Optional</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category - Optional</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              placeholder="Coding, Design, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">URL - Optional</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="mr-2"
              />
              <span className="text-gray-300">Featured Tool</span>
            </label>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Add Tool
            </motion.button>
            <motion.button
              type="button"
              onClick={onCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// Edit AI Tool Form
const EditAIToolForm = ({ tool, onSubmit, onCancel }: { tool: AITool, onSubmit: (data: AITool) => void, onCancel: () => void }) => {
  const [formData, setFormData] = useState(tool)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Edit AI Tool</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              placeholder="Short catchy tagline"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description - Optional</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Icon (emoji) - Optional</label>
              <input
                type="text"
                value={formData.icon || ''}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
                placeholder="🤖"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Image URL - Optional</label>
              <input
                type="url"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
                placeholder="https://example.com/image.png"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category - Optional</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              placeholder="Coding, Design, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">URL - Optional</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="mr-2"
              />
              <span className="text-gray-300">Featured Tool</span>
            </label>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Update Tool
            </motion.button>
            <motion.button
              type="button"
              onClick={onCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// Edit Project Form Component
const EditProjectForm = ({ project, onSubmit, onCancel }: { project: Project, onSubmit: (data: Project) => void, onCancel: () => void }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState({
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.image || '',
    tech: project.tech.join(', '),
    github: project.github || '',
    live: project.live || '',
    featured: project.featured,
    order: project.order,
    categoryId: project.categoryId || '',
    presentationUrl: project.presentationUrl || '',
    documentationUrl: project.documentationUrl || '',
    readmeContent: project.readmeContent || '',
    presentationPasskey: project.presentationPasskey || ''
  })

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getAllCategories()
      setCategories(data)
    }
    loadCategories()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      tech: formData.tech.split(',').map(t => t.trim())
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Edit Project</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Technologies (comma-separated)</label>
            <input
              type="text"
              value={formData.tech}
              onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              placeholder="React, Node.js, MongoDB"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Live URL</label>
              <input
                type="url"
                value={formData.live}
                onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="mr-2"
              />
              <span className="text-gray-300">Featured Project</span>
            </label>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Presentation URL (Google Slides Embed)</label>
            <input
              type="url"
              value={formData.presentationUrl}
              onChange={(e) => setFormData({ ...formData, presentationUrl: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              placeholder="https://docs.google.com/presentation/d/e/[ID]/embed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Documentation URL</label>
            <input
              type="url"
              value={formData.documentationUrl}
              onChange={(e) => setFormData({ ...formData, documentationUrl: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              placeholder="https://github.com/user/repo/wiki"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">README Content</label>
            <textarea
              value={formData.readmeContent}
              onChange={(e) => setFormData({ ...formData, readmeContent: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400 font-mono text-sm"
              rows={8}
              placeholder="# Project Name\n\n## Description\n\nProject description here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Presentation Passkey</label>
            <input
              type="text"
              value={formData.presentationPasskey}
              onChange={(e) => setFormData({ ...formData, presentationPasskey: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              placeholder="Enter passkey to protect presentation (leave blank for no protection)"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Update Project
            </motion.button>
            <motion.button
              type="button"
              onClick={onCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}





// Edit Skill Form Component
const EditSkillForm = ({ skill, onSubmit, onCancel }: { skill: Skill, onSubmit: (data: Skill) => void, onCancel: () => void }) => {
  const [formData, setFormData] = useState({
    id: skill.id,
    name: skill.name,
    icon: skill.icon || '',
    level: skill.level,
    categoryId: skill.categoryId,
    order: skill.order
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Edit Skill</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Icon (emoji)</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              placeholder="⚛️"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Level (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Update Skill
            </motion.button>
            <motion.button
              type="button"
              onClick={onCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// Edit Category Form Component
const EditCategoryForm = ({ category, onSubmit, onCancel }: { category: Category, onSubmit: (data: Category) => void, onCancel: () => void }) => {
  const [name, setName] = useState(category.name)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...category, name })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Edit Category</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              required
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Update Category
            </motion.button>
            <motion.button
              type="button"
              onClick={onCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// Add Category Form Component
const AddCategoryForm = ({ onSubmit, onCancel }: { onSubmit: (data: Omit<Category, 'id'>) => void, onCancel: () => void }) => {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, order: 0 })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Add New Category</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              placeholder="Frontend, Backend, Tools..."
              required
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Add Category
            </motion.button>
            <motion.button
              type="button"
              onClick={onCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// Add Skill Form Component
const AddSkillForm = ({ categoryId, onSubmit, onCancel }: { 
  categoryId: string,
  onSubmit: (data: Omit<Skill, 'id'>) => void, 
  onCancel: () => void 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    level: 0,
    categoryId,
    order: 0
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Add New Skill</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Icon (emoji)</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              placeholder="⚛️"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Level (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Add Skill
            </motion.button>
            <motion.button
              type="button"
              onClick={onCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// Add Project Form Component
const AddProjectForm = ({ onSubmit, onCancel, preSelectedCategoryId }: { onSubmit: (data: Omit<Project, 'id'>) => void, onCancel: () => void, preSelectedCategoryId?: string | null }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tech: '',
    github: '',
    live: '',
    featured: false,
    order: 0,
    categoryId: preSelectedCategoryId || '',
    presentationUrl: '',
    documentationUrl: '',
    readmeContent: '',
    presentationPasskey: ''
  })

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getAllCategories()
      setCategories(data)
    }
    loadCategories()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.categoryId) {
      alert('Please select a category')
      return
    }
    const projectData = {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      tech: formData.tech.split(',').map(t => t.trim()),
      github: formData.github || '',
      live: formData.live || '',
      featured: formData.featured,
      order: formData.order,
      categoryId: formData.categoryId,
      presentationUrl: formData.presentationUrl || '',
      documentationUrl: formData.documentationUrl || '',
      readmeContent: formData.readmeContent || '',
      presentationPasskey: formData.presentationPasskey || ''
    }
    console.log('Submitting project data:', projectData)
    onSubmit(projectData)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Add New Project</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Technologies (comma-separated)</label>
            <input
              type="text"
              value={formData.tech}
              onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              placeholder="React, Node.js, MongoDB"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Live URL</label>
              <input
                type="url"
                value={formData.live}
                onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="mr-2"
              />
              <span className="text-gray-300">Featured Project</span>
            </label>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Presentation URL (Google Slides Embed)</label>
            <input
              type="url"
              value={formData.presentationUrl}
              onChange={(e) => setFormData({ ...formData, presentationUrl: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              placeholder="https://docs.google.com/presentation/d/e/[ID]/embed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Documentation URL</label>
            <input
              type="url"
              value={formData.documentationUrl}
              onChange={(e) => setFormData({ ...formData, documentationUrl: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              placeholder="https://github.com/user/repo/wiki"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">README Content</label>
            <textarea
              value={formData.readmeContent}
              onChange={(e) => setFormData({ ...formData, readmeContent: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400 font-mono text-sm"
              rows={8}
              placeholder="# Project Name\n\n## Description\n\nProject description here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Presentation Passkey</label>
            <input
              type="text"
              value={formData.presentationPasskey}
              onChange={(e) => setFormData({ ...formData, presentationPasskey: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400"
              placeholder="Enter passkey to protect presentation (leave blank for no protection)"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Add Project
            </motion.button>
            <motion.button
              type="button"
              onClick={onCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}