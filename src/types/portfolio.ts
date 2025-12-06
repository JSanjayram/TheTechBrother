export interface Project {
  id: string
  title: string
  description: string
  image: string
  tech: string[]
  github: string
  live: string
  featured: boolean
  order: number
  categoryId: string
  presentationUrl?: string
  documentationUrl?: string
  readmeContent?: string
  presentationPasskey?: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string[]
  tech: string[]
  order: number
}

export interface Category {
  id: string
  name: string
  order: number
}

export interface AITool {
  id: string
  name: string
  description: string
  tagline: string
  icon?: string
  image?: string
  category: string
  url: string
  featured: boolean
  order: number
}

export interface Skill {
  id: string
  name: string
  icon: string
  level: number
  categoryId: string
  order: number
}