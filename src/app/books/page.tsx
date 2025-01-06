
import { generateMetadata } from '@/lib/metadata'
import BooksPage from '@/components/BooksPage'

export const metadata = generateMetadata('books')

export default function Books() {
  return <BooksPage />
}