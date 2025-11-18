'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowLeft, Tag, FileText, Book, Presentation, Lock, Eye, EyeOff } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getProjectById, getAllCategories } from '@/lib/adminService'
import { Project, Category } from '@/types/portfolio'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const PresentationSection = ({ presentationUrl, passkey }: { presentationUrl: string, passkey?: string }) => {
  const [isUnlocked, setIsUnlocked] = useState(!passkey)
  const [inputPasskey, setInputPasskey] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleUnlock = () => {
    if (inputPasskey === passkey) {
      setIsUnlocked(true)
      setError('')
    } else {
      setError('Invalid passkey')
    }
  }

  if (!isUnlocked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="glass-effect rounded-2xl p-8 mb-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Lock className="mr-3 text-primary-400" size={24} />
          Protected Presentation
        </h2>
        <div className="text-center py-12">
          <Lock className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-300 mb-6">This presentation is password protected</p>
          <div className="max-w-sm mx-auto">
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                value={inputPasskey}
                onChange={(e) => setInputPasskey(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
                placeholder="Enter passkey"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <button
              onClick={handleUnlock}
              className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Unlock Presentation
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="glass-effect rounded-2xl p-8 mb-12"
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Presentation className="mr-3 text-primary-400" size={24} />
        Project Presentation
      </h2>
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <iframe
          src={presentationUrl}
          className="w-full h-full border-0"
          allowFullScreen
          title="Project Presentation"
        />
      </div>
    </motion.div>
  )
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      if (params.id) {
        try {
          const [projectData, categoriesData] = await Promise.all([
            getProjectById(params.id as string),
            getAllCategories()
          ])
          
          if (projectData) {
            setProject(projectData)
            const projectCategory = categoriesData.find(cat => cat.id === projectData.categoryId)
            setCategory(projectCategory || null)
          }
        } catch (error) {
          console.error('Error fetching project:', error)
        }
        setLoading(false)
      }
    }
    fetchProject()
  }, [params.id])

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
            <p className="text-gray-300 mt-4">Loading project...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!project) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Project Not Found</h1>
            <p className="text-gray-300 mb-6">The project you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/projects')}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Back to Projects
            </button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="py-20 relative overflow-hidden">
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => router.push('/projects')}
              className="flex items-center text-gray-300 hover:text-primary-400 transition-colors mb-8 group"
            >
              <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                {category && (
                  <span className="px-3 py-1 bg-primary-600 text-white text-sm rounded-full flex items-center">
                    <Tag size={14} className="mr-1" />
                    {category.name}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-white">{project.title}</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                {project.description}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Github size={20} className="mr-2" />
                    View Code
                  </motion.a>
                )}
                
                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <ExternalLink size={20} className="mr-2" />
                    Live Demo
                  </motion.a>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Technologies Used
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {project.tech.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="px-4 py-2 bg-gray-800/50 border border-gray-600 text-gray-300 rounded-lg hover:border-primary-400 transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass-effect rounded-2xl p-8 mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Project Details</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-primary-400 mb-3">Overview</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-400 mb-3">Key Features</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Modern and responsive design
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Built with latest technologies
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Optimized for performance
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Presentation Section */}
            {project.presentationUrl && (
              <PresentationSection 
                presentationUrl={project.presentationUrl}
                passkey={project.presentationPasskey}
              />
            )}

            {/* Documentation Section */}
            {project.documentationUrl && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="glass-effect rounded-2xl p-8 mb-12"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Book className="mr-3 text-primary-400" size={24} />
                  Documentation
                </h2>
                <div className="text-center">
                  <p className="text-gray-300 mb-6">
                    Access the complete project documentation for detailed information about implementation, setup, and usage.
                  </p>
                  <motion.a
                    href={project.documentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <FileText size={20} className="mr-2" />
                    View Documentation
                  </motion.a>
                </div>
              </motion.div>
            )}

            {/* README Section */}
            {project.readmeContent && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="glass-effect rounded-2xl p-8 mb-12"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FileText className="mr-3 text-primary-400" size={24} />
                  README
                </h2>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                  <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed overflow-x-auto">
                    {project.readmeContent}
                  </pre>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}