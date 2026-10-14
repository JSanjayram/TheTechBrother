'use client'

import { motion } from 'framer-motion'
import { Code, Palette, Zap, Cpu, Sparkles, MapPin, Award, BookOpen, Compass, Heart } from 'lucide-react'

const About = () => {
  const pillars = [
    {
      icon: Code,
      title: 'Full-Stack Engineering',
      desc: 'Architecting robust web applications with Next.js, React, Node.js, and Firebase.',
      badge: 'Architecture',
    },
    {
      icon: Palette,
      title: 'Modern UI/UX & Motion',
      desc: 'Crafting pixel-perfect, accessible interfaces with Framer Motion and fluid micro-interactions.',
      badge: 'Design Systems',
    },
    {
      icon: Cpu,
      title: 'AI & Cloud Integration',
      desc: 'Embedding AI capabilities and serverless cloud databases for intelligent workflows.',
      badge: 'Intelligence',
    },
    {
      icon: Zap,
      title: 'Speed & Optimization',
      desc: 'Laser-focused on Lighthouse scores, SEO best practices, and fast load times.',
      badge: 'Performance',
    },
  ]

  const tags = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Firebase Firestore',
    'Tailwind CSS', 'Python', 'REST APIs', 'Kotlin', 'Generative AI',
    'Full-Stack Architecture', 'Database Management'
  ]

  return (
    <section id="about" className="py-24 relative overflow-hidden scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-royal text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">
            <Sparkles size={14} className="text-blue-400" />
            <span>Discover My Story</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mt-3">
            Passionate developer dedicated to creating scalable web applications 
            and beautiful user interfaces that deliver exceptional user experiences.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          
          {/* Bento Tile 1: Main Story (8 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-8 glass-card rounded-3xl p-7 sm:p-9 relative overflow-hidden flex flex-col justify-between border border-blue-500/20"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-md">
                  <Compass size={22} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">My Journey</h3>
                  <p className="text-xs text-blue-400 font-medium">Computer Engineer • Salem, Tamil Nadu</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  I am a passionate <strong className="text-white font-semibold">Computer Engineer</strong> with hands-on experience across modern technical stacks. My journey began with simple curiosity—experimenting with web development and responsive design—and evolved into building full-stack web platforms, cloud-integrated applications, and AI-powered tools.
                </p>
                <p>
                  Over the years, I have worked on projects ranging from music-streaming apps using Kotlin and Spotify APIs to chatbots integrated with Google Sheets and Firebase. I enjoy solving problems, exploring new technologies, and turning creative ideas into meaningful digital experiences.
                </p>
                <p>
                  I believe in continuous learning and stay committed to improving my skills in software development, cloud deployment, and research-oriented innovation.
                </p>
              </div>
            </div>

            {/* Tech Tags Cloud */}
            <div className="pt-6 mt-6 border-t border-slate-800/80">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-3">
                Core Competencies:
              </span>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-xl text-xs font-medium bg-[#0d1226] hover:bg-blue-600/20 border border-blue-500/25 hover:border-blue-400/40 text-slate-300 hover:text-white transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bento Tile 2: Identity Card (4 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="lg:col-span-4 glass-card rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden border border-blue-500/20"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">Profile Overview</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="space-y-3.5">
                <div className="p-3.5 rounded-2xl bg-[#090e21] border border-blue-500/20 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Award size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wide block">Brand Persona</span>
                    <span className="text-sm font-bold text-white">The Tech Brother</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#090e21] border border-blue-500/20 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wide block">Location</span>
                    <span className="text-sm font-bold text-white">Salem, Tamil Nadu, India</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#090e21] border border-blue-500/20 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wide block">Education</span>
                    <span className="text-sm font-bold text-white">Computer Engineering</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/30 border border-blue-500/20 text-center">
              <p className="text-xs text-slate-300 italic flex items-center justify-center gap-1.5">
                <span>"Continuous learning, scalable code, and lovely software design."</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group transition-all border border-blue-500/20 hover:border-blue-400/40"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
                  <item.icon size={22} />
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-600/15 border border-blue-500/30 text-blue-300">
                  {item.badge}
                </span>
              </div>

              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {item.title}
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About