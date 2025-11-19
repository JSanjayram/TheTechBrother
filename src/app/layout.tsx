import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import AIChatButton from '@/components/AIChatButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sanjay Ram J | The Tech Brother | Full Stack Developer Portfolio',
  description: 'Sanjay Ram J - The Tech Brother. Professional Full Stack Developer from Salem, Tamil Nadu. Expert in React, Next.js, Node.js, Python, MongoDB, Firebase. View projects, skills, and experience.',
  keywords: 'Sanjay Ram, Sanjay Ram J, The Tech Brother, Full Stack Developer, React Developer, Next.js Developer, Salem Tamil Nadu, Web Developer, JavaScript, TypeScript, Python, MongoDB, Firebase, Portfolio',
  authors: [{ name: 'Sanjay Ram J' }, { name: 'The Tech Brother' }],
  openGraph: {
    title: 'Sanjay Ram J | The Tech Brother | Full Stack Developer',
    description: 'Professional Full Stack Developer specializing in modern web technologies. React, Next.js, Node.js expert from Salem, Tamil Nadu.',
    type: 'website',
    siteName: 'The Tech Brother - Sanjay Ram J Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanjay Ram J | The Tech Brother | Full Stack Developer',
    description: 'Professional Full Stack Developer from Salem, Tamil Nadu. Expert in React, Next.js, Python.',
  },
  alternates: {
    canonical: 'https://sanjayramj.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="gHNMh0_hUg7a9sgECZ3sNV3N63JrBPjFdNJP-8RFKf8" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <AIChatButton />
        </AuthProvider>
      </body>
    </html>
  )
}