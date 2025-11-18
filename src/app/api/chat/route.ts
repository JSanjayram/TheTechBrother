import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { getAllProjects, getAllSkills, getAllCategories } from '@/lib/adminService'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

let cachedContext: string | null = null

const buildPortfolioContext = async () => {
  if (cachedContext) return cachedContext
  
  try {
    const [projects, skills, categories] = await Promise.all([
      getAllProjects(),
      getAllSkills(), 
      getAllCategories()
    ])
    
    const projectsText = projects.map(p => 
      `- ${p.title}: ${p.description} (Tech: ${p.tech.join(', ')})`
    ).join('\n')
    
    const skillsText = categories.map(cat => {
      const catSkills = skills.filter(s => s.categoryId === cat.id)
      return `${cat.name}: ${catSkills.map(s => `${s.name} (${s.level}%)`).join(', ')}`
    }).join('\n')
    
    cachedContext = `
You are Sanjay Ram's AI assistant for his portfolio website. Here's information about Sanjay:

Personal Info:
- Name: Sanjay Ram
- Title: Full Stack Developer
- Location: Salem, Tamil Nadu
- Email: j.sanjayramjs@gmail.com
- GitHub: https://github.com/JSanjayram

Skills by Category:
${skillsText}

Projects:
${projectsText}

Instructions:
- Be helpful and professional
- Answer questions about Sanjay's skills, projects, and experience
- For contact requests, direct them to the contact form or email
- Keep responses concise and relevant
- If you don't know something, suggest they contact Sanjay directly
`
    
    return cachedContext
  } catch (error) {
    console.error('Error building context:', error)
    return getDefaultContext()
  }
}

const getDefaultContext = () => `
You are Sanjay Ram's AI assistant for his portfolio website. Here's information about Sanjay:

Personal Info:
- Name: Sanjay Ram
- Title: Full Stack Developer
- Location: Salem, Tamil Nadu
- Email: j.sanjayramjs@gmail.com
- GitHub: https://github.com/JSanjayram

Instructions:
- Be helpful and professional
- Answer questions about Sanjay's skills, projects, and experience
- For contact requests, direct them to the contact form or email
- Keep responses concise and relevant
`



export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }
    
    const portfolioContext = await buildPortfolioContext()
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    
    const prompt = `${portfolioContext}\n\nUser question: ${message}\n\nResponse:`
    
    const result = await model.generateContent(prompt)
    const response = result.response.text()
    
    return NextResponse.json({ response })
  } catch (error) {
    console.error('Gemini API error:', error)
    return NextResponse.json(
      { response: 'Sorry, I\'m having trouble right now. Please use the contact form to reach Sanjay directly!' }, 
      { status: 200 }
    )
  }
}