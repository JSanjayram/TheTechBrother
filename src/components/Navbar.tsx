'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Send } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)

      const sections = ['home', 'about', 'projects', 'experience', 'skills', 'ai-tools', 'contact']
      const scrollPos = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'AI Arsenal', href: '#ai-tools', id: 'ai-tools' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:pt-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`flex items-center justify-between px-5 sm:px-6 py-3 rounded-full transition-all duration-300 ${scrolled
            ? 'bg-[#0d1226]/85 backdrop-blur-2xl border border-blue-500/20 shadow-2xl shadow-black/80'
            : 'bg-[#0d1226]/60 backdrop-blur-xl border border-white/[0.08] shadow-lg'
            }`}
        >
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group"
            aria-label="Sanjay Ram - The Tech Brother"
          >
            {/* Sanjay's Photo Avatar with Royal Ring & Online Pulse */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full  from-blue-500 via-indigo-500 to-purple-500 shadow-lg shadow-blue-500/35 group-hover:shadow-blue-500/60 group-hover:scale-105 transition-all duration-300">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 protected-image">
                  <img
                    src="/Src.png"
                    alt="Sanjay Ram - The Tech Brother"
                    className="w-full h-full object-cover object-center pointer-events-none select-none group-hover:scale-110 transition-transform duration-300"
                    draggable="false"
                  />
                </div>
              </div>
              {/* <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#0d1226]"></span>
              </span> */}
            </div>

            {/* Unique Stylish Brand Typography */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:tracking-normal transition-all duration-300">
                  <span className="relative inline-block">
                    {/* Main bold text */}
                    <span>TECH</span>

                    {/* Handwritten TRUE overlay */}
                    <span
                      className="absolute left-1/2 top-1/2 z-10 whitespace-nowrap
      -translate-x-1/2 -translate-y-1/2
      text-blue-400 text-[1px] sm:text-[18px]
      font-normal tracking-normal 
      pointer-events-none"
                      style={{
                        fontFamily: "'Segoe Script', 'Brush Script MT', cursive",
                        fontWeight: 400,
                        textShadow: "0 0 2px rgba(0, 0, 0, 1)",
                        fontSize: 10
                      }}
                    >
                      The
                    </span>
                  </span>

                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                    BROTHER
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Sanjay Ram
                </span>
                <span className="w-1 h-1 rounded-full bg-blue-500/60" />
                <span className="text-[10px] text-blue-400/80 font-medium">
                  Full Stack Dev
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.05]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-1.5 text-sm font-medium transition-colors rounded-full ${isActive
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white/[0.09] border border-white/[0.12] rounded-full shadow-sm -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </a>
              )
            })}
          </div>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contact"
              className="btn-primary flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white transition-all hover:scale-105"
            >
              <Send size={14} />
              <span>Let's Talk</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-zinc-300 hover:text-white rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors border border-white/[0.08]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.nav>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-3 p-5 rounded-2xl bg-[#0d1226]/95 backdrop-blur-2xl border border-blue-500/20 shadow-2xl space-y-2"
            >
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm font-medium text-zinc-200 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="pt-3 border-t border-white/[0.08] flex justify-center">
                <a
                  href="#contact"
                  className="btn-primary w-full text-center py-2.5 rounded-xl font-semibold text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Let's Connect
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Navbar
