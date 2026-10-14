'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowLeft, Tag, FileText, Book, Presentation, Lock, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react'
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
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-3xl p-8 mb-12 border border-blue-500/20 text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto mb-4">
          <Lock size={26} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Protected Presentation
        </h2>
        <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
          This project presentation requires authorized clearance. Please enter the passkey to unlock the interactive deck.
        </p>

        <div className="max-w-sm mx-auto">
          <div className="relative mb-3">
            <input
              type={showPassword ? 'text' : 'password'}
              value={inputPasskey}
              onChange={(e) => setInputPasskey(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
              placeholder="Enter access passkey..."
              className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm placeholder-slate-500 focus:outline-none pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && <p className="text-red-400 text-xs mb-3 font-medium">{error}</p>}
          <button
            onClick={handleUnlock}
            className="btn-royal w-full py-3 px-6 rounded-xl font-bold text-sm shadow-lg"
          >
            Unlock Deck
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-3xl p-6 sm:p-8 mb-12 border border-blue-500/20"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
          <Presentation size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Interactive Presentation</h2>
          <p className="text-xs text-blue-400 font-medium">Slide deck and architecture walkthrough</p>
        </div>
      </div>
      <div className="relative w-full h-96 sm:h-[480px] rounded-2xl overflow-hidden border border-blue-500/20 bg-black">
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
      <main className="min-h-screen bg-[#080a15] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Loading project showcase...</p>
        </div>
      </main>
    )
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-[#080a15] relative overflow-hidden flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto text-center px-4 py-36">
          <div className="glass-card rounded-3xl p-8 border border-blue-500/20">
            <h1 className="text-2xl font-bold text-white mb-2">Project Not Found</h1>
            <p className="text-slate-400 text-sm mb-6">The project details you're looking for do not exist or have moved.</p>
            <button
              onClick={() => router.push('/projects')}
              className="btn-royal px-6 py-3 rounded-xl font-bold text-sm"
            >
              Browse All Projects
            </button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#080a15]">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute -top-32 -left-32 w-[32rem] h-[32rem] bg-blue-600/20 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-32 w-[32rem] h-[32rem] bg-purple-600/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="pt-36 pb-24 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            
            {/* Back button */}
            <motion.button
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => router.push('/projects')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:border-blue-400/40 text-xs font-semibold text-slate-300 hover:text-white mb-8 group transition-all hover:scale-105"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Projects Archive</span>
            </motion.button>

            {/* Project Header */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              {category && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full badge-royal text-xs font-medium mb-4">
                  <Tag size={12} className="text-blue-400" />
                  <span>{category.name}</span>
                </div>
              )}

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
                {project.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card hover:bg-white/10 text-white font-semibold text-sm border border-slate-700 transition-all hover:scale-105"
                  >
                    <Github size={18} />
                    <span>View Repository</span>
                  </a>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-royal flex items-center gap-2 px-7 py-3 rounded-2xl font-bold text-sm shadow-lg transition-all"
                  >
                    <ExternalLink size={18} />
                    <span>Open Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-12"
            >
              <div className="glass-card rounded-3xl p-2 sm:p-3 overflow-hidden border border-blue-500/20 shadow-2xl">
                <img
                  src={project.image || '/spotify-tv-app-revamped-home-screen (1).png.jpg'}
                  alt={project.title}
                  className="w-full h-72 sm:h-[450px] object-cover rounded-2xl"
                />
              </div>
            </motion.div>

            {/* Technologies Grid */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mb-12 text-center"
            >
              <h2 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-4">
                Technologies Used
              </h2>
              <div className="flex flex-wrap justify-center gap-2">
                {project.tech?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-medium glass-card border border-blue-500/20 text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Overview & Key Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card rounded-3xl p-7 sm:p-9 mb-12 border border-blue-500/20"
            >
              <h2 className="text-xl font-bold text-white mb-6">Project Details</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-3">
                    Overview
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-blue-400 shrink-0" />
                      <span>Modern and responsive user experience</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-blue-400 shrink-0" />
                      <span>Engineered with latest full-stack technologies</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-blue-400 shrink-0" />
                      <span>Optimized for performance across all devices</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Interactive Presentation Deck */}
            {project.presentationUrl && (
              <PresentationSection
                presentationUrl={project.presentationUrl}
                passkey={project.presentationPasskey}
              />
            )}

            {/* Documentation Section */}
            {project.documentationUrl && (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-card rounded-3xl p-8 mb-12 text-center border border-blue-500/20"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Book size={22} />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Documentation</h2>
                <p className="text-slate-400 text-sm max-w-lg mx-auto mb-6">
                  Access the complete project documentation for detailed information about implementation, setup, and usage.
                </p>
                <a
                  href={project.documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-royal inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm shadow-md"
                >
                  <FileText size={16} />
                  <span>View Documentation</span>
                </a>
              </motion.div>
            )}

            {/* README Content */}
            {project.readmeContent && (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glass-card rounded-3xl p-7 sm:p-9 mb-12 border border-blue-500/20"
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <FileText className="text-blue-400" size={20} />
                  <h2 className="text-lg font-bold text-white">README</h2>
                </div>
                <div className="bg-[#0a0f26] rounded-2xl p-5 border border-blue-500/20 overflow-x-auto">
                  <pre className="text-slate-300 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                    {project.readmeContent}
                  </pre>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}