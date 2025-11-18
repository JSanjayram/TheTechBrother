'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';

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

  return (
    <footer className="bg-black/20 backdrop-blur-md border-t border-purple-500/20 py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-3xl" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.2)' }}>
              <span className="text-white font-light" style={{ fontFamily: 'cursive' }}>The</span>
              <span className="text-blue-500 font-extrabold mx-1" style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '1px' }}>Tech</span>
              <span className="text-white font-light" style={{ fontFamily: 'cursive' }}>Brother</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">Building the future, one line at a time</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div 
              onClick={handleSecretClick}
              className="cursor-default select-none"
            >
              <p className="text-gray-500 text-sm">
                © 2024 Sanjay Ram. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}