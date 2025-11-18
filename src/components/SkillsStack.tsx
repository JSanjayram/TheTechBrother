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

  // Group skills by category
  const groupedSkills = categories.reduce((acc, category) => {
    const categorySkills = skills.filter(skill => skill.categoryId === category.id)
    if (categorySkills.length > 0) {
      acc[category.name] = categorySkills.sort((a, b) => a.order - b.order)
    }
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Skills </span><span className="text-primary-400">Stack</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              My technical expertise organized by categories, showcasing the tools 
              and technologies I use to build amazing projects.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
              <p className="text-gray-300 mt-4">Loading skills...</p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative glass-effect rounded-2xl p-8 border border-gray-700/50 group-hover:border-primary-400/50 transition-all duration-500">
                    <div className="flex items-center justify-center mb-8">
                      <div className="w-2 h-2 bg-primary-400 rounded-full mr-3 animate-pulse"></div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                        {category}
                      </h3>
                      <div className="w-2 h-2 bg-primary-400 rounded-full ml-3 animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {categorySkills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: skillIndex * 0.05 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.08, y: -8 }}
                          className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-xl p-5 text-center border border-gray-700/50 hover:border-primary-400/70 transition-all duration-300 backdrop-blur-sm group/skill"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative z-10">
                            <div className="text-4xl mb-3 transform group-hover/skill:scale-110 transition-transform duration-300">{skill.icon}</div>
                            <h4 className="text-white font-semibold mb-3 group-hover/skill:text-primary-300 transition-colors duration-300">{skill.name}</h4>
                            <div className="w-full bg-gray-700/60 rounded-full h-2.5 mb-2 overflow-hidden">
                              <motion.div 
                                className="bg-gradient-to-r from-primary-500 via-purple-500 to-blue-500 h-full rounded-full relative"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ duration: 1.2, delay: skillIndex * 0.1 }}
                                viewport={{ once: true }}
                              >
                                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                              </motion.div>
                            </div>
                            <span className="text-sm text-primary-300 font-medium">{skill.level}%</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default SkillsStack