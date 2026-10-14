'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getSkills, getCategories } from '@/lib/portfolioService'
import { Skill, Category } from '@/types/portfolio'
import { Sparkles } from 'lucide-react'

const SkillsStack = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('all')

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

  const filteredCategories = activeCategory === 'all'
    ? Object.entries(groupedSkills)
    : Object.entries(groupedSkills).filter(([name]) => name === activeCategory)

  return (
    <section id="skills" className="py-24 relative overflow-hidden scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-royal text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">
            <Sparkles size={14} className="text-blue-400" />
            <span>Technologies & Tools</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Skills <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mt-3">
            Technologies and tools I use to build exceptional digital experiences.
          </p>

          {/* Category Filter Pills */}
          {!loading && categories.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'btn-royal text-white shadow-md'
                    : 'glass-pill text-slate-300 hover:text-white hover:border-blue-400/40'
                }`}
              >
                All Skills
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    activeCategory === cat.name
                      ? 'btn-royal text-white shadow-md'
                      : 'glass-pill text-slate-300 hover:text-white hover:border-blue-400/40'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <div key={n} className="glass-card rounded-2xl p-6 text-center animate-pulse space-y-3">
                <div className="w-12 h-12 bg-slate-800/60 rounded-xl mx-auto" />
                <div className="h-4 w-20 bg-slate-800/60 rounded mx-auto" />
                <div className="h-2 w-full bg-slate-800/40 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            <AnimatePresence mode="wait">
              {filteredCategories.map(([category, categorySkills]) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Category Title */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-4 w-1 rounded-full bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500" />
                    <h3 className="text-base sm:text-lg font-bold text-slate-200 uppercase tracking-wide">
                      {category}
                    </h3>
                    <div className="h-px flex-1 bg-slate-800/80 ml-2" />
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {categorySkills.map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.03 }}
                        whileHover={{ y: -5 }}
                        className="glass-card rounded-3xl p-5 text-center flex flex-col items-center justify-between group hover:border-blue-400/40 transition-all cursor-default border border-blue-500/20"
                      >
                        {/* Icon */}
                        <div className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                          {skill.icon}
                        </div>

                        {/* Name */}
                        <h4 className="text-sm font-semibold text-white mb-3 text-center line-clamp-1 group-hover:text-blue-400 transition-colors">
                          {skill.name}
                        </h4>

                        {/* Progress Bar & Level */}
                        <div className="w-full space-y-1.5">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span>Proficiency</span>
                            <span className="font-semibold text-blue-400">{skill.level}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}

export default SkillsStack
