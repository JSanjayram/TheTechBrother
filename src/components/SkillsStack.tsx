'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getSkills, getCategories } from '@/lib/portfolioService'
import { Skill, Category } from '@/types/portfolio'

const SkillsStack = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const [skillsData, categoriesData] = await Promise.all([
        getSkills(),
        getCategories()
      ])
      setSkills(skillsData)
      setCategories(categoriesData)
      setLoading(false)
    }
    fetchData()
  }, [])

  const groupedSkills = categories.reduce((acc, category) => {
    const categorySkills = skills.filter(skill => skill.categoryId === category.id)
    if (categorySkills.length > 0) {
      acc[category.name] = categorySkills.sort((a, b) => a.order - b.order)
    }
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <section id="skills" className="py-24 px-4 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header - Centered */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-heading mb-6">
            <span className="text-white">Skills </span>
            <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Technologies and tools I use to build exceptional digital experiences
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
            <p className="text-gray-400 mt-4">Loading skills...</p>
          </div>
        ) : (
          <div className="space-y-20">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {/* Category Title - Improved Typography */}
                <div className="text-center mb-10">
                  <h3 className="text-xl font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    {category}
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                </div>

                {/* Skills Grid - Properly Centered */}
                <div className="flex justify-center">
                  <div className="inline-grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {categorySkills.map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="glass-card rounded-2xl p-6 text-center hover:bg-white/10 transition-all group cursor-pointer w-40"
                      >
                        {/* Icon */}
                        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                          {skill.icon}
                        </div>
                        
                        {/* Name */}
                        <h4 className="text-sm font-semibold text-white mb-3 min-h-[40px] flex items-center justify-center">
                          {skill.name}
                        </h4>
                        
                        {/* Progress Circle */}
                        <div className="relative w-16 h-16 mx-auto">
                          <svg className="transform -rotate-90 w-16 h-16">
                            <circle
                              cx="32"
                              cy="32"
                              r="28"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                              className="text-gray-700"
                            />
                            <motion.circle
                              cx="32"
                              cy="32"
                              r="28"
                              stroke="url(#gradient)"
                              strokeWidth="4"
                              fill="none"
                              strokeLinecap="round"
                              initial={{ strokeDasharray: "0 175.93" }}
                              whileInView={{ 
                                strokeDasharray: `${(skill.level / 100) * 175.93} 175.93` 
                              }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                            <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#a855f7" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold text-white">
                              {skill.level}%
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Download Resume Button - Centered */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <a
            href="https://www.linkedin.com/in/sanjay-ram-j"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsStack
