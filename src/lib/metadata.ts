import { Metadata } from 'next'

export const baseMetadata = {
  metadataBase: new URL('https://empirebooks.com.ng'),
  authors: [{ name: 'Ronke Aina' }],
  creator: 'Empire Books Concept Ltd.',
  publisher: 'Empire Books Concept Ltd.',
  keywords: [
    'educational textbooks',
    'school books',
    'pre-school books',
    'primary education',
    'curriculum materials',
    'Ronke Aina'
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Empire Books Concept Ltd.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
}

export const metadataMap = {
  home: {
    title: 'Empire Books Concept Ltd. - Quality Educational Textbooks',
    description: 'Empire Books: Empowering Education with High-Quality Textbooks for Pre-School, Pre-Primary, and Primary Levels',
  },
  about: {
    title: 'About Empire Books - Our Story and Mission',
    description: 'Learn about Empire Books, founded by Ronke Aina, dedicated to creating high-quality educational textbooks',
  },
  books: {
    title: 'Our Textbooks | Educational Resources',
    description: 'Explore our comprehensive range of Pre-School, Pre-Primary, and Primary textbooks designed for effective learning',
  },
  contact: {
    title: 'Contact Empire Books | Get in Touch',
    description: 'Contact Empire Books for inquiries about our educational textbooks and publishing services',
  },
  faqs: {
    title: 'Frequently Asked Questions | Empire Books',
    description: 'Find answers to common questions about Empire Books and our educational textbooks',
  }
}

// Function to generate complete metadata
export function generateMetadata(page: keyof typeof metadataMap): Metadata {
  const pageMetadata = metadataMap[page]
  return {
    ...baseMetadata,
    title: pageMetadata.title,
    description: pageMetadata.description,
    openGraph: {
      ...baseMetadata.openGraph,
      title: pageMetadata.title,
      description: pageMetadata.description,
    }
  }
}