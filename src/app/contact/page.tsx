
import { generateMetadata } from '@/lib/metadata'
import ContactPage from '@/components/ContactPage'

export const metadata = generateMetadata('contact')

export default function Contact() {
  return <ContactPage />
}