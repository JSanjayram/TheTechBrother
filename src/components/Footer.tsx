'use client'

import { useState, useRef } from 'react'
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const [clickCount, setClickCount] = useState(0)
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastClickTimeRef = useRef<number>(0)

  const handleSecretClick = () => {
    const now = Date.now()
    const timeDiff = now - lastClickTimeRef.current
    
    // Reset if more than 2 seconds between clicks
    if (timeDiff > 2000) {
      setClickCount(1)
    } else {
      setClickCount(prev => prev + 1)
    }
    
    lastClickTimeRef.current = now
    
    // Clear existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
    }
    
    // Set timeout to reset clicks after 2 seconds
    clickTimeoutRef.current = setTimeout(() => {
      setClickCount(0)
    }, 2000)
    
    // Navigate to admin after 6 clicks (triple click twice)
    if (clickCount >= 5) {
      window.location.href = '/admin'
      setClickCount(0)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-24 border-t border-blue-500/20 bg-[#080a15]/95 backdrop-blur-xl py-12">
      {/* Top Royal Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 shadow-md shadow-blue-500/30">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                  <img
                    src="/Src.png"
                    alt="Sanjay Ram - The Tech Brother"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-blue-400 font-mono">
                    THE
                  </span>
                  <span className="text-xl font-black tracking-tight text-white">
                    TECH<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">BROTHER</span>
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium mt-1">
                  SANJAY RAM • Full Stack & UI/UX Developer
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
              Building the future with passion, scalable architectures, and elegant design.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-300 font-medium">
            <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-blue-400 transition-colors">Experience</a>
            <a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a>
            <a href="#ai-tools" className="hover:text-blue-400 transition-colors">AI Arsenal</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/JSanjayram"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#0d1226] hover:bg-slate-800 text-slate-300 hover:text-white transition-all border border-blue-500/20"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/sanjay-ram-j"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#0d1226] hover:bg-slate-800 text-slate-300 hover:text-blue-400 transition-all border border-blue-500/20"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="#contact"
              className="p-2.5 rounded-xl bg-[#0d1226] hover:bg-slate-800 text-slate-300 hover:text-blue-400 transition-all border border-blue-500/20"
              aria-label="Contact Email"
            >
              <Mail size={16} />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 hover:text-white transition-all border border-blue-500/30 ml-2"
              aria-label="Back to Top"
              title="Back to Top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Copyright & Admin Portal Secret Trigger */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div
            onClick={handleSecretClick}
            className="cursor-default select-none group"
            title="Sanjay Ram Portfolio"
          >
            <p className="group-hover:text-slate-300 transition-colors">
              © {new Date().getFullYear()} Sanjay Ram (The Tech Brother). All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Crafted with</span>
            <Heart size={13} className="text-rose-500 fill-rose-500" />
            <span>in Salem, Tamil Nadu</span>
          </div>
        </div>
      </div>
    </footer>
  )
}