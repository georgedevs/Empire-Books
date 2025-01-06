
import FAQPage from '@/components/FAQPage'
import { generateMetadata } from '@/lib/metadata'

export const metadata = generateMetadata('faqs')

export default function FAQs() {
  return <FAQPage />
}