'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap } from 'lucide-react'
import { getAllAITools } from '@/lib/adminService'
import { AITool } from '@/types/portfolio'

export default function AITools() {
  const [tools, setTools] = useState<AITool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTools()
  }, [])

  const loadTools = async () => {
    try {
      const data = await getAllAITools()
      setTools(data)
    } catch (error) {
      console.error('Error loading AI tools:', error)
    }
    setLoading(false)
  }

  return (
    <section id="ai-tools" className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/5 to-transparent"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center justify-center mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="text-primary-400 mr-3" size={40} />
            <Zap className="text-yellow-400" size={40} />
          </motion.div>
          <h2 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Tools Arsenal
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Powered by cutting-edge artificial intelligence
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-400 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {tools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </div>
        )}

        {!loading && tools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No AI tools available</p>
          </div>
        )}
      </div>
    </section>
  )
}

function ToolCard({ tool, index }: { tool: AITool; index: number }) {
  return (
    <motion.a
      href={tool.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, type: "spring" }}
      whileHover={{ y: -12, rotateY: 5 }}
      className="group relative"
    >
      {/* Robot Head Container */}
      <div className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50 hover:border-primary-400/50 transition-all duration-300 overflow-hidden">
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-primary-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Robot Head */}
        <div className="relative mb-4">
          <div className="w-24 h-24 mx-auto relative">
            {tool.image ? (
              <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-primary-400/30 group-hover:border-primary-400 transition-all duration-300 shadow-lg shadow-primary-500/20">
                <img 
                  src={tool.image} 
                  alt={tool.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ) : tool.icon ? (
              <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-2xl border-4 border-primary-400/30 group-hover:border-primary-400 transition-all duration-300">
                {tool.icon}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-2xl border-4 border-primary-400/30 group-hover:border-primary-400 transition-all duration-300">
                <span className="text-4xl font-bold text-primary-400">{tool.name.charAt(0)}</span>
              </div>
            )}
            
            {/* Antenna */}
            <motion.div 
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gradient-to-t from-primary-400 to-transparent"
              animate={{ height: [16, 20, 16] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary-400 rounded-full shadow-lg shadow-primary-400/50"></div>
            </motion.div>
          </div>
        </div>

        {/* Tool Info */}
        <div className="text-center relative z-10">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
            {tool.name}
          </h3>
          
          {tool.tagline && (
            <p className="text-primary-300 text-sm font-medium mb-3 italic">
              "{tool.tagline}"
            </p>
          )}
          
          {tool.description && (
            <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
              {tool.description}
            </p>
          )}

          {tool.category && (
            <div className="mt-4">
              <span className="inline-block px-3 py-1 bg-primary-500/10 text-primary-300 text-xs rounded-full border border-primary-500/20">
                {tool.category}
              </span>
            </div>
          )}
        </div>

        {/* Featured Badge */}
        {tool.featured && (
          <div className="absolute top-3 right-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-2 py-1 rounded-full text-xs font-bold shadow-lg"
            >
              ⭐ Featured
            </motion.div>
          </div>
        )}

        {/* Hover Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
        </div>
      </div>
    </motion.a>
  )
}
