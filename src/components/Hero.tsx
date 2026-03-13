'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative px-4 pt-20">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <h1 className="text-display">
            Hi, I'm <span className="text-gradient">Sanjay Ram</span>
          </h1>

          {/* Subtitle */}
          <p className="text-subheading text-gray-300 max-w-3xl mx-auto">
            Full Stack Developer & UI/UX Designer
          </p>

          <p className="text-body max-w-2xl mx-auto">
            Crafting exceptional digital experiences with modern technologies and creative solutions
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 pt-4">
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
                className="p-4 glass-card rounded-xl hover:bg-white/10 transition-colors"
                aria-label={label}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-lg transition-colors"
            >
              View My Work
            </a>
            <a
              href="https://www.linkedin.com/in/sanjay-ram-j"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 glass-card hover:bg-white/10 rounded-xl font-semibold text-lg transition-colors"
            >
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
