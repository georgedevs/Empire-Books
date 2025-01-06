
import { generateMetadata } from '@/lib/metadata'
import AboutPage from '@/components/AboutPage'

export const metadata = generateMetadata('about')

export default function About() {
  return <AboutPage/>
}