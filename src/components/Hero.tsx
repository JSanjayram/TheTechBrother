'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowRight, Download, Sparkles } from 'lucide-react'

const Hero = () => {
  const stats = [
    { label: 'Projects Completed', value: '15+' },
    { label: 'Technologies Mastered', value: '10+' },
    { label: 'Learning Journey', value: '4+ Years' },
    { label: 'Location', value: 'Salem, Tamil Nadu' },
  ]

  const floatingBadges = [
    { icon: '⚛️', title: 'React & Next.js', pos: '-top-4 -left-6', anim: { y: [0, -8, 0] } },
    { icon: '⚡', title: 'Full-Stack Dev', pos: '-bottom-4 -right-4', anim: { y: [0, 8, 0] } },
    { icon: '🤖', title: 'AI & Cloud', pos: 'top-1/2 -right-8', anim: { y: [0, -10, 0] } },
  ]

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative px-4 pt-32 pb-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/[0.08] text-zinc-300 text-xs sm:text-sm font-medium shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Freelance & Innovative Roles</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <p className="text-slate-400 text-base sm:text-lg font-medium flex items-center justify-center lg:justify-start gap-2">
                <span>Hello, I am</span>
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
                Sanjay <span className="text-gradient">Ram</span>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-200">
                Full Stack Developer &{' '}
                <span className="text-blue-400">UI/UX Designer</span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Known as{' '}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-blue-600/15 border border-blue-500/30 text-white font-extrabold text-xs sm:text-sm tracking-tight shadow-sm align-middle">
                <span className="text-blue-400 font-mono text-[10px] tracking-widest">THE</span>
                <span>TECH</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">BROTHER</span>
              </span>
              . I design and engineer high-performance web applications and AI-driven platforms
              with modern architectures and delightful user experiences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="btn-royal flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base"
              >
                <span>Explore My Work</span>
                <ArrowRight size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/sanjay-ram-j"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-blue-500/20 text-white font-medium text-base transition-all hover:scale-105"
              >
                <Linkedin size={18} className="text-blue-400" />
                <span>Connect With Me</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-3">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mr-1">
                Follow me:
              </span>
              {[
                { icon: Github, href: 'https://github.com/JSanjayram', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/sanjay-ram-j', label: 'LinkedIn' },
                { icon: Mail, href: '#contact', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-400 hover:text-white hover:border-blue-400/40 transition-all hover:scale-105"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Hardware Glass Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center relative"
          >
            {/* Subtle Ambient Royal Sapphire Glow */}
            <div className="absolute -inset-4 bg-blue-600/[0.2] rounded-full blur-3xl opacity-80 animate-pulse-slow" />

            <div className="relative w-full max-w-sm sm:max-w-md">
              <div className="glass-card rounded-3xl p-6 sm:p-7 border border-blue-500/20 relative overflow-hidden shadow-2xl">

                {/* Profile Photo */}
                <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border border-white/[0.12] shadow-2xl group protected-image">
                  <img
                    src="/Src.png"
                    alt="Sanjay Ram - Full Stack Developer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 pointer-events-none select-none"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080a15]/80 via-transparent to-transparent opacity-40" />
                </div>

                {/* Name & Title */}
                <div className="mt-5 text-center relative z-10">
                  <h3 className="text-xl font-bold text-white tracking-tight flex items-center justify-center gap-1.5">
                    <span>Sanjay Ram J</span>

                  </h3>
                  <p className="text-xs text-blue-400 font-medium mt-0.5">
                    The Tech Brother • Salem, Tamil Nadu
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-blue-500/20 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>Full Stack & AI Engineer</span>
                  </div>
                </div>
              </div>

              {/* Floating Orbiting Badges */}
              {floatingBadges.map((badge, idx) => (
                <motion.div
                  key={idx}
                  animate={badge.anim}
                  transition={{ duration: 4 + idx, repeat: Infinity, ease: 'easeInOut' }}
                  className={`hidden sm:flex absolute ${badge.pos} items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0d1226]/95 backdrop-blur-xl border border-blue-500/25 shadow-2xl text-xs font-semibold text-white z-20`}
                >
                  <span className="text-base">{badge.icon}</span>
                  <span>{badge.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Hero Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-16 pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-4 text-center hover:border-white/[0.15] transition-all"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
