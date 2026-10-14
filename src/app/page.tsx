'use client'

import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import SkillsStack from '@/components/SkillsStack'
import AITools from '@/components/AITools'
import Contact from '@/components/Contact'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#080a15]">
      {/* Sleek Royal Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle geometric grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        
        {/* Top Centered Royal Spotlight */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[46rem] h-[32rem] bg-blue-600/[0.15] rounded-full blur-[160px] animate-pulse-slow" />
        
        {/* Ambient side glows */}
        <div className="absolute top-1/3 -right-36 w-[34rem] h-[34rem] bg-purple-600/[0.11] rounded-full blur-[180px] animate-float" />
        <div className="absolute top-2/3 -left-36 w-[34rem] h-[34rem] bg-indigo-500/[0.10] rounded-full blur-[180px] animate-float-reverse" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <SkillsStack />
        <AITools />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}