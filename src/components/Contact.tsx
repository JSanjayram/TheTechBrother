'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Send, Github } from 'lucide-react'
import { useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'

const Contact = () => {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID!)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

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

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'j.sanjayramjs@gmail.com',
      href: 'mailto:j.sanjayramjs@gmail.com'
    },
    {
      icon: Github,
      title: 'GitHub',
      value: 'JSanjayram',
      href: 'https://github.com/JSanjayram'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Salem, Tamil Nadu',
      href: '#'
    }
  ]

  return (
    <section id="contact" className="py-20 relative overflow-hidden">

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
            <span className="text-white">Get In </span><span className="text-primary-400">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to start your next project? Let's discuss how we can work together 
            to bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 text-white">Let's Connect</h3>
            <p className="text-gray-300 mb-8">
              I'm always interested in hearing about new opportunities and exciting projects. 
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className="flex items-center p-4 glass-effect rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mr-4">
                    <info.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{info.title}</h4>
                    <p className="text-gray-300">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300 resize-none placeholder-gray-400"
                  placeholder="Tell me about your project..."
                />
              </div>

              {state.succeeded && (
                <div className="p-4 bg-green-600/20 border border-green-600 rounded-lg mb-4">
                  <p className="text-green-400 text-center">Message sent successfully! I'll get back to you soon.</p>
                </div>
              )}
              
              {state.errors && (
                <div className="p-4 bg-red-600/20 border border-red-600 rounded-lg mb-4">
                  <p className="text-red-400 text-center">Failed to send message. Please try again.</p>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={state.submitting}
                whileHover={{ scale: state.submitting ? 1 : 1.02 }}
                whileTap={{ scale: state.submitting ? 1 : 0.98 }}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center ${
                  state.submitting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-primary-600 hover:bg-primary-700'
                } text-white`}
              >
                {state.submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Contact