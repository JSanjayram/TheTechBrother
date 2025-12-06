import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import AIChatButton from '@/components/AIChatButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sanjay Ram | Sanjayram Portfolio | Full Stack Developer | The Tech Brother',
  description: 'Sanjay Ram (Sanjayram) - The Tech Brother. Professional Full Stack Developer portfolio showcasing projects, skills, and experience. Sanjay portfolio features React, Next.js, Node.js, Python, MongoDB, Firebase expertise from Salem, Tamil Nadu.',
  keywords: 'Sanjay, Sanjayram, Sanjay Ram, Sanjay portfolio, Sanjay Ram portfolio, Sanjay Ram J, The Tech Brother, Sanjay developer, Sanjay full stack, Sanjay web developer, Sanjayram developer, Full Stack Developer, React Developer, Next.js Developer, Salem Tamil Nadu, Web Developer, JavaScript, TypeScript, Python, MongoDB, Firebase, Portfolio, Sanjay projects, Sanjay skills',
  authors: [{ name: 'Sanjay Ram' }, { name: 'Sanjayram' }, { name: 'Sanjay Ram J' }, { name: 'The Tech Brother' }],
  openGraph: {
    title: 'Sanjay Ram | Sanjayram Portfolio | Full Stack Developer',
    description: 'Sanjay Ram (Sanjayram) portfolio - Professional Full Stack Developer specializing in modern web technologies. React, Next.js, Node.js expert from Salem, Tamil Nadu.',
    type: 'website',
    siteName: 'Sanjay Portfolio - The Tech Brother',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanjay Ram | Sanjayram | Full Stack Developer Portfolio',
    description: 'Sanjay portfolio - Professional Full Stack Developer from Salem, Tamil Nadu. Expert in React, Next.js, Python.',
    creator: '@sanjayram',
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
        <meta name="google-site-verification" content="iQMutfhJuz4DVEpi3XeJddYZnQg5GA6KpF2TEKdptsA" />
        <meta name="google-site-verification" content="wnMBu0JA18l05sqxIbnqw4e6U41XHhJxS_E_SR1g9XQ" />
        <meta name="author" content="Sanjay Ram, Sanjayram" />
        <meta name="creator" content="Sanjay Ram" />
        <meta name="publisher" content="Sanjay Ram" />
        <link rel="canonical" href="https://thetechbrother.netlify.app" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Sanjay Ram',
            alternateName: ['Sanjayram', 'Sanjay Ram J', 'The Tech Brother'],
            url: 'https://thetechbrother.netlify.app',
            jobTitle: 'Full Stack Developer',
            description: 'Sanjay Ram (Sanjayram) - Professional Full Stack Developer portfolio',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Salem',
              addressRegion: 'Tamil Nadu',
              addressCountry: 'IN'
            },
            sameAs: [
              'https://github.com/sanjayram',
              'https://linkedin.com/in/sanjayram'
            ],
            knowsAbout: ['React', 'Next.js', 'Node.js', 'Python', 'MongoDB', 'Firebase', 'Full Stack Development']
          })
        }} />
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