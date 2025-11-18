export const chatbotKnowledge = {
  personal: {
    name: "Sanjay Ram",
    title: "Full Stack Developer",
    location: "Salem, Tamil Nadu",
    email: "j.sanjayramjs@gmail.com",
    github: "https://github.com/JSanjayram",
    bio: "Passionate full-stack developer building modern web applications with cutting-edge technologies."
  },
  
  skills: [
    "React", "Next.js", "Node.js", "TypeScript", "JavaScript",
    "Python", "MongoDB", "Firebase", "Tailwind CSS", "Git"
  ],
  
  projects: [
    {
      name: "Portfolio Website",
      description: "Modern portfolio with admin dashboard, built with Next.js and Firebase",
      tech: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"]
    }
  ],
  
  responses: {
    greeting: [
      "Hello! I'm Sanjay's AI assistant. How can I help you today?",
      "Hi there! I can tell you about Sanjay's projects, skills, and experience.",
      "Welcome! Feel free to ask me anything about Sanjay's work and expertise."
    ],
    
    skills: [
      "Sanjay is skilled in React, Next.js, Node.js, TypeScript, Python, and more!",
      "His tech stack includes modern web technologies like React, Firebase, and Tailwind CSS.",
      "He specializes in full-stack development with expertise in both frontend and backend."
    ],
    
    projects: [
      "Sanjay has built several impressive projects including this portfolio website with admin dashboard.",
      "His projects showcase modern web development using React, Next.js, and Firebase.",
      "You can explore his projects section to see detailed information about each one."
    ],
    
    contact: [
      "You can reach Sanjay at j.sanjayramjs@gmail.com or through the contact form.",
      "Feel free to connect with him on GitHub at https://github.com/JSanjayram",
      "Use the contact section below to send him a message directly!"
    ],
    
    default: [
      "That's an interesting question! For detailed information, please check the contact form.",
      "I'd recommend exploring the projects and about sections for more details.",
      "For specific inquiries, feel free to reach out through the contact form."
    ]
  }
}

export const getResponse = (message: string): string => {
  const msg = message.toLowerCase()
  
  // Greeting patterns
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return getRandomResponse('greeting')
  }
  
  // Skills patterns
  if (msg.includes('skill') || msg.includes('technology') || msg.includes('tech stack')) {
    return getRandomResponse('skills')
  }
  
  // Projects patterns
  if (msg.includes('project') || msg.includes('work') || msg.includes('portfolio')) {
    return getRandomResponse('projects')
  }
  
  // Contact patterns
  if (msg.includes('contact') || msg.includes('email') || msg.includes('reach')) {
    return getRandomResponse('contact')
  }
  
  // Personal info patterns
  if (msg.includes('who') || msg.includes('about') || msg.includes('sanjay')) {
    return `${chatbotKnowledge.personal.name} is a ${chatbotKnowledge.personal.title} based in ${chatbotKnowledge.personal.location}. ${chatbotKnowledge.personal.bio}`
  }
  
  return getRandomResponse('default')
}

const getRandomResponse = (type: keyof typeof chatbotKnowledge.responses): string => {
  const responses = chatbotKnowledge.responses[type]
  return responses[Math.floor(Math.random() * responses.length)]
}