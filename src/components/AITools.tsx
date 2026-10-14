'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, ExternalLink, Cpu, Bot } from 'lucide-react'
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
    <section id="ai-tools" className="py-24 relative overflow-hidden scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-royal text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">
            <Bot size={15} className="text-blue-400" />
            <span>AI Solutions Suite</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            AI Tools <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mt-3">
            Powered by cutting-edge artificial intelligence and smart engineering utilities.
          </p>
        </motion.div>

        {/* Tools Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass-card rounded-3xl p-6 animate-pulse space-y-4">
                <div className="w-16 h-16 bg-slate-800/60 rounded-2xl mx-auto" />
                <div className="h-5 w-3/4 bg-slate-800/60 rounded mx-auto" />
                <div className="h-4 w-full bg-slate-800/40 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <motion.a
                key={tool.id}
                href={tool.url || '#'}
                target={tool.url ? '_blank' : undefined}
                rel={tool.url ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-3xl p-6 sm:p-7 relative flex flex-col justify-between group border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
              >
                {/* Featured Badge */}
                {tool.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-royal shadow-md flex items-center gap-1">
                      <Sparkles size={11} className="text-blue-400" />
                      <span>Featured</span>
                    </span>
                  </div>
                )}

                <div>
                  {/* Tool Icon / Image */}
                  <div className="mb-5 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-600/20 border border-blue-400/30 flex items-center justify-center p-2 group-hover:scale-105 group-hover:border-blue-400 transition-all shadow-md">
                      {tool.image ? (
                        <img
                          src={tool.image}
                          alt={tool.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : tool.icon ? (
                        <span className="text-2xl">{tool.icon}</span>
                      ) : (
                        <Cpu className="text-blue-400" size={26} />
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>
                      {tool.category && (
                        <span className="text-xs text-blue-400 font-medium">
                          {tool.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tagline */}
                  {tool.tagline && (
                    <p className="text-xs sm:text-sm text-blue-300 font-medium italic mb-2">
                      "{tool.tagline}"
                    </p>
                  )}

                  {/* Description */}
                  {tool.description && (
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {tool.description}
                    </p>
                  )}
                </div>

                {/* Footer Action */}
                <div className="pt-4 mt-5 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-400 group-hover:text-blue-300 flex items-center gap-1.5 transition-colors">
                    <span>Launch AI Tool</span>
                    <ExternalLink size={14} />
                  </span>

                  <div className="w-7 h-7 rounded-full bg-[#0d1226] group-hover:bg-blue-600/25 flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-all">
                    <Zap size={14} />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {!loading && tools.length === 0 && (
          <div className="text-center py-12 glass-card rounded-2xl max-w-md mx-auto">
            <Bot size={36} className="text-blue-400 mx-auto mb-2 opacity-60" />
            <p className="text-slate-400 text-sm">No AI tools currently available.</p>
          </div>
        )}
      </div>
    </section>
  )
}
