/* eslint-disable @typescript-eslint/no-unused-vars */
import { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'
import HomePage from '@/components/HomePage'

export const metadata = generateMetadata('home')

export default function Home() {
  return <HomePage />
}