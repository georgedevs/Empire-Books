import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../context/ThemeContext'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { baseMetadata } from '@/lib/metadata'
import Section from '@/components/Section'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  ...baseMetadata,
  title: 'Empire Books Concept Ltd. - Quality Educational Textbooks',
  description: 'Empire Books: Empowering Education with High-Quality Textbooks',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
      },
      {
        rel: 'android-chrome',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
      },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {  
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={`${inter.className} bg-white dark:bg-[#121212] text-brown dark:text-white pt-24`}>
      <ThemeProvider>
        <Header />
        <Section className="min-h-screen">
          <main>
          {children}
          </main>
        </Section>
        <Section>
          <Footer />
        </Section>
      </ThemeProvider>
    </body>
  </html>
  )
}