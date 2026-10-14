'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Send, Github, Linkedin, Copy, Check, Sparkles, Clock, MessageSquare, Heart } from 'lucide-react'
import { useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'

const Contact = () => {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID!)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [copiedEmail, setCopiedEmail] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleSubmit(e)
    if (state.succeeded) {
      setFormData({ name: '', email: '', message: '' })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'j.sanjayramjs@gmail.com',
      action: 'copy',
      href: 'mailto:j.sanjayramjs@gmail.com',
    },
    {
      icon: Github,
      title: 'GitHub',
      value: 'JSanjayram',
      action: 'link',
      href: 'https://github.com/JSanjayram',
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'sanjay-ram-j',
      action: 'link',
      href: 'https://www.linkedin.com/in/sanjay-ram-j',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Salem, Tamil Nadu',
      action: 'none',
      href: '#',
    },
  ]

  return (
    <section id="contact" className="py-24 relative overflow-hidden scroll-mt-20">
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
            <span>Start A Conversation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mt-3">
            Have a project in mind? Let's collaborate and turn your vision into lovely, impactful reality.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-card rounded-3xl p-7 space-y-4 border border-blue-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-md">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Let's Connect</h3>
                  <p className="text-xs text-blue-400 font-medium">Salem, Tamil Nadu • Open to Global Roles</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                I'm always interested in hearing about new opportunities, innovative projects, and creative ideas. 
                Feel free to reach out anytime!
              </p>

              <div className="flex items-center gap-2 text-xs font-medium badge-royal px-3.5 py-2 rounded-xl">
                <Clock size={14} className="text-blue-400" />
                <span>Response time: Usually within 24 hours</span>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              {contactMethods.map((method) => (
                <div
                  key={method.title}
                  className="glass-card rounded-2xl p-4 flex items-center justify-between group hover:border-blue-400/40 transition-all border border-blue-500/20"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                      <method.icon size={18} />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-medium block">
                        {method.title}
                      </span>
                      {method.href.startsWith('http') ? (
                        <a
                          href={method.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-white hover:text-blue-400 transition-colors"
                        >
                          {method.value}
                        </a>
                      ) : method.href.startsWith('mailto') ? (
                        <a
                          href={method.href}
                          className="text-sm font-semibold text-white hover:text-blue-400 transition-colors"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <span className="text-sm font-semibold text-white">
                          {method.value}
                        </span>
                      )}
                    </div>
                  </div>

                  {method.action === 'copy' && (
                    <button
                      onClick={() => copyToClipboard(method.value)}
                      className="p-2 rounded-xl bg-[#0d1226] hover:bg-slate-800 text-slate-400 hover:text-white transition-all border border-blue-500/20"
                      title="Copy Email"
                    >
                      {copiedEmail ? <Check size={16} className="text-blue-400" /> : <Copy size={16} />}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="glass-card rounded-3xl p-7 sm:p-9 relative overflow-hidden border border-blue-500/20">
              <h3 className="text-2xl font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Fill in the details below and I'll get back to you promptly.
              </p>

              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm placeholder-slate-500 focus:outline-none"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm placeholder-slate-500 focus:outline-none"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project, idea, or questions..."
                    className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm placeholder-slate-500 focus:outline-none resize-none"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                {/* Status Messages */}
                {state.succeeded && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-blue-600/20 border border-blue-500 text-blue-300 text-sm flex items-center gap-2"
                  >
                    <Check size={18} className="shrink-0" />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {state.errors && !state.succeeded && (
                  <div className="p-4 rounded-xl bg-red-600/20 border border-red-500 text-red-300 text-sm">
                    Failed to send message. Please try again or email directly at j.sanjayramjs@gmail.com.
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="btn-royal w-full py-4 px-6 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact