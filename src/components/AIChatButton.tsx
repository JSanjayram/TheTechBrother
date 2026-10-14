'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles, Bot, RotateCcw, Copy, Check, Code2, Layers, Briefcase, Mail, ArrowUpRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface Message {
  type: 'user' | 'bot'
  text: string
  copied?: boolean
}

const AIChatButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      text: "👋 Hi! I'm **Sanjay's AI ** . Ask me anything about his technical stack, featured projects, experience, or hire availability!"
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const quickPrompts = [
    { icon: Code2, title: 'Core Stack', query: "What technologies and frameworks does Sanjay specialize in?" },
    { icon: Layers, title: 'Featured Projects', query: "Showcase Sanjay's top featured projects and live demos." },
    { icon: Briefcase, title: 'Experience & Story', query: "Tell me about Sanjay's engineering journey and skills." },
    { icon: Mail, title: 'Hire & Contact', query: "How can I collaborate with or hire Sanjay for a role?" }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen, messages, isTyping])

  const handleSendPrompt = async (promptText: string) => {
    if (!promptText.trim() || isTyping) return

    setMessages(prev => [...prev, { type: 'user', text: promptText }])
    setMessage('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: promptText })
      })

      const data = await response.json()
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: data.response || "I couldn't generate a response. Please reach out to Sanjay via the contact form!"
        }
      ])
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: "I'm temporarily having trouble connecting. Feel free to use the contact form to reach Sanjay directly at **j.sanjayramjs@gmail.com**!"
        }
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSend = () => {
    handleSendPrompt(message)
  }

  const handleReset = () => {
    setMessages([
      {
        type: 'bot',
        text: "👋 Conversation reset! How can I assist you with Sanjay's portfolio today?"
      }
    ])
  }

  const handleCopyMessage = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <>
      {/* Expert Level Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 30 }}
            transition={{ type: 'spring', damping: 26, stiffness: 340 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#090e24]/95 backdrop-blur-2xl border border-blue-500/30 rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_50px_-10px_rgba(37,99,235,0.35)] z-[9999] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-[#070b1d]/95 border-b border-blue-500/20">
              <div className="flex items-center gap-3">
                {/* Mini Sanjay Avatar with Status Ring */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 shadow-md shadow-blue-500/30">
                    <img
                      src="/Src.png"
                      alt="Sanjay Ram"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#070b1d]"></span>
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white tracking-tight">Sanjay AI</h3>

                  </div>
                  <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Active & Ready to help</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors border border-transparent hover:border-white/[0.08]"
                  title="Reset conversation"
                  aria-label="Reset Conversation"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors border border-transparent hover:border-white/[0.08]"
                  aria-label="Close Chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.type === 'bot' && (
                    <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5 shadow-sm">
                      <Bot size={16} />
                    </div>
                  )}

                  <div className="relative group max-w-[84%]">
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-tr-sm font-medium'
                        : 'bg-[#0d1536]/90 border border-blue-500/25 text-slate-200 rounded-tl-sm'
                        }`}
                    >
                      {msg.type === 'bot' ? (
                        <div className="prose prose-sm prose-invert max-w-none text-xs sm:text-sm">
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                              strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                              em: ({ children }) => <em className="text-blue-300 not-italic font-medium">{children}</em>,
                              code: ({ children }) => (
                                <code className="bg-black/50 px-1.5 py-0.5 rounded text-xs text-blue-300 font-mono">
                                  {children}
                                </code>
                              ),
                              ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-2">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-2">{children}</ol>,
                              li: ({ children }) => <li className="text-slate-300">{children}</li>,
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <span>{msg.text}</span>
                      )}
                    </div>

                    {/* Copy Button for Bot Messages */}
                    {msg.type === 'bot' && (
                      <button
                        onClick={() => handleCopyMessage(msg.text, index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4 right-2 text-[10px] text-slate-400 hover:text-white flex items-center gap-1 bg-[#090e24] px-2 py-0.5 rounded-md border border-blue-500/20 shadow"
                        title="Copy text"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check size={10} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={10} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Starter Quick Prompt Cards when chat just started */}
              {messages.length === 1 && (
                <div className="pt-2 space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block px-1">
                    Suggested Questions:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {quickPrompts.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendPrompt(p.query)}
                        className="p-3 rounded-2xl bg-[#0c122e] hover:bg-blue-600/20 border border-blue-500/20 hover:border-blue-400/40 text-left transition-all duration-200 group flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p.icon size={16} className="text-blue-400 group-hover:scale-110 transition-transform" />
                          <ArrowUpRight size={13} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
                        </div>
                        <span className="text-xs font-semibold text-white group-hover:text-blue-300 leading-tight">
                          {p.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Typing Waveform Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2.5 text-xs text-slate-400">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="bg-[#0d1536]/90 border border-blue-500/25 px-4 py-2.5 rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">AI is thinking</span>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#070b1d]/95 border-t border-blue-500/20">
              <div className="flex items-center gap-2 bg-[#0c132f] border border-blue-500/25 rounded-2xl p-1.5 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Sanjay's stack, projects, or hire..."
                  className="flex-1 px-3 py-1.5 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!message.trim() || isTyping}
                  className="btn-royal p-2.5 rounded-xl text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center"
                  aria-label="Send Message"
                >
                  <Send size={15} />
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button with Physics Float Animation & Ambient Aura */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        className="fixed bottom-6 right-6 z-[9999]"
      >
        {/* Ambient Glowing Halo */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-md opacity-60 animate-pulse-slow" />

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="relative group flex items-center gap-3 px-4 py-3 rounded-full btn-royal text-white shadow-[0_15px_35px_-5px_rgba(37,99,235,0.65)] border border-blue-400/30 transition-all"
          aria-label="Toggle AI Assistant Chat"
        >
          {isOpen ? (
            <div className="flex items-center gap-2">
              <X size={20} className="text-white" />
              <span className="text-xs font-bold tracking-wide">Close</span>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              {/* Sanjay Mini Avatar with Online Beacon */}
              <div className="relative">
                <div className="w-7 h-7 rounded-full p-[1px] bg-white/40 overflow-hidden">
                  <img
                    src="/Src.png"
                    alt="Sanjay AI"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-black"></span>
                </span>
              </div>

              {/* Text Badge */}
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white tracking-wide leading-none flex items-center gap-1">
                  <span>Ask Sanjay AI</span>

                </span>

              </div>
            </div>
          )}
        </motion.button>
      </motion.div>
    </>
  )
}

export default AIChatButton