"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, ChevronRight, Quote, School, ArrowUp, Star, Sparkles, GraduationCap } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"

// Featured Books Data
const featuredBooks = [
  {
    id: 1,
    title: "Star Letter Work",
    coverImage: "/preschool1.png",
    grade: "Preschool",
    description: "Develop early literacy skills with engaging letter activities.",
  },
  {
    id: 2,
    title: "Star English Pre Primary Book 1",
    coverImage: "/star-english-pre-primary-book1.png",
    grade: "Pre-Primary",
    description: "Build a strong foundation in English language for young learners.",
  },
  {
    id: 3,
    title: "Star English Primary Book 1",
    coverImage: "/starpryengbook1.png",
    grade: "Primary",
    description: "Comprehensive English curriculum for primary school students.",
  },
]

// Testimonials Data
const testimonials = [
  {
    quote:
      "Empire Books' textbooks have transformed our classroom learning experience. The content is engaging and perfectly tailored to our curriculum.",
    author: "Sarah Johnson",
    role: "Elementary School Principal",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "As an educator, I'm impressed by the research-driven approach and the interactive design of these textbooks.",
    author: "Michael Okonkwo",
    role: "Head of Curriculum",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "Our students love the vibrant illustrations and clear explanations. Empire Books truly understands educational needs.",
    author: "Grace Adebayo",
    role: "Preschool Coordinator",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

// Educational levels
const educationalLevels = [
  {
    title: "Preschool",
    icon: <Sparkles className="h-8 w-8 text-orange" />,
    description: "Foundational learning materials for early childhood development.",
  },
  {
    title: "Pre-Primary",
    icon: <Star className="h-8 w-8 text-orange" />,
    description: "Engaging resources to prepare young minds for primary education.",
  },
  {
    title: "Primary",
    icon: <GraduationCap className="h-8 w-8 text-orange" />,
    description: "Comprehensive textbooks aligned with primary school curriculum.",
  },
]

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: "easeOut",
            delay: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedButtonProps {
  children: React.ReactNode
  href: string
  variant?: "white" | "orange" | "outline-white" | "secondary"
  className?: string
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, href, variant = "orange", className = "" }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "white":
        return "bg-white text-orange hover:bg-orange/10 hover:text-orange border-2 border-white"
      case "orange":
        return "bg-orange text-white hover:bg-orange/90 border-2 border-orange"
      case "outline-white":
        return "bg-transparent text-white hover:bg-white/10 border-2 border-white"
      case "secondary":
        return "bg-white text-orange hover:bg-orange/10 border-2 border-orange"
      default:
        return "bg-orange text-white hover:bg-orange/90 border-2 border-orange"
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className={className}>
      <Link
        href={href}
        className={`
          flex items-center justify-center 
          px-6 py-3 rounded-lg 
          transition duration-300 
          space-x-2 font-medium shadow-md
          ${getVariantClasses()}
        `}
      >
        {children}
      </Link>
    </motion.div>
  )
}

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-orange hover:bg-orange/90 text-white p-3 rounded-full shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

const HomePage = () => {
  useEffect(() => {
    // Scroll to top on page load/reload
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-white dark:bg-[#121212] text-brown dark:text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden md:-mt-12">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-orange/10 dark:bg-orange/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-orange/10 dark:bg-orange/5 rounded-full blur-3xl"></div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute inset-0 dark:opacity-[0.03] pointer-events-none"
          >
            <Image src="/abcd.jpg" alt="Book Pattern Background" layout="fill" objectFit="cover" className="z-0" />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 lg:px-6 z-10 py-20">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
            {/* Hero Content */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2 text-center lg:text-left space-y-8"
            >
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block px-4 py-1 bg-orange/10 dark:bg-orange/20 text-orange rounded-full text-sm font-medium mb-2"
                >
                  Quality Educational Resources
                </motion.div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Empowering Education
                  <br />
                  <span className="text-orange">Through Quality Textbooks</span>
                </h1>
              </div>

              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Welcome to Empire Books Concept Ltd., where we specialize in creating and publishing high-quality
                educational textbooks that engage students, support educators, and promote academic excellence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <AnimatedButton href="/books" variant="orange">
                  <BookOpen size={20} />
                  <span>Explore Our Books</span>
                </AnimatedButton>

                <AnimatedButton href="/contact" variant="secondary">
                  <span>Contact Us</span>
                  <ChevronRight size={20} />
                </AnimatedButton>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-4 pt-6 max-w-md mx-auto lg:mx-0"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange">3+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Educational Levels</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange">20+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Publications</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange">100+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Schools Served</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
  initial={{ x: 100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className="w-full lg:w-1/2 flex justify-center lg:justify-end relative"
>
  <div className="relative">
    {/* Decorative elements */}
    <div className="absolute -z-10 w-full h-full rounded-full bg-orange/10 dark:bg-orange/5 blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>

    <div className="relative z-10 bg-white dark:bg-[#1a1a1a] p-2 rounded-2xl shadow-2xl">
      <Image
        src="/len.jpg"
        alt="Empire Books Textbooks"
        width={600}
        height={600}
        className="object-contain rounded-xl"
        priority
      />
    </div>

    {/* Floating elements have been removed */}
  </div>
</motion.div>
          </div>
        </div>
      </section>

      {/* Educational Levels Section */}
      <AnimatedSection className="py-20 bg-gray-50 dark:bg-[#151515]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-orange/10 dark:bg-orange/20 text-orange rounded-full text-sm font-medium mb-4">
              Our Focus Areas
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brown dark:text-white mb-6">
              Educational Levels We Serve
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              We create specialized learning materials for different stages of early education.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {educationalLevels.map((level, index) => (
              <AnimatedSection
                key={level.title}
                delay={index * 0.2}
                className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
              >
                <div className="bg-orange/10 dark:bg-orange/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {level.icon}
                </div>
                <h3 className="text-xl font-bold text-brown dark:text-white mb-4">{level.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{level.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Books Section */}
      <AnimatedSection className="py-20 bg-white dark:bg-[#121212] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gray-50 dark:from-[#151515] to-transparent"></div>
        <div className="absolute -top-[30%] -right-[10%] w-[40%] h-[40%] bg-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[30%] -left-[10%] w-[40%] h-[40%] bg-orange/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-orange/10 dark:bg-orange/20 text-orange rounded-full text-sm font-medium mb-4">
              Our Publications
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brown dark:text-white mb-6">Featured Books</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Discover our carefully crafted educational resources designed to inspire and engage young learners across
              different stages of early education.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {featuredBooks.map((book, index) => (
              <AnimatedSection key={book.id} delay={index * 0.2} className="group">
                <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl overflow-hidden transform group-hover:-translate-y-2 transition-all duration-300">
                  <div className="relative h-[400px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src={book.coverImage || "/placeholder.svg"}
                      alt={book.title}
                      fill
                      className="object-contain object-center p-4"
                    />
                    <div className="absolute top-4 right-4 bg-orange text-white text-xs font-bold px-3 py-1 rounded-full z-20">
                      {book.grade}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-brown dark:text-white mb-3 group-hover:text-orange transition-colors duration-300">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{book.description}</p>
                    <div className="flex items-center space-x-1 text-orange">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="#FFA500" />
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-12">
            <AnimatedButton href="/books" variant="orange" className="inline-block">
              <span>View All Books</span>
              <ChevronRight size={20} />
            </AnimatedButton>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section - Simplified */}
      <AnimatedSection className="py-20 bg-gray-50 dark:bg-[#151515] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -top-[20%] -left-[10%] w-[40%] h-[40%] bg-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-orange/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-orange/10 dark:bg-orange/20 text-orange rounded-full text-sm font-medium mb-4">
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brown dark:text-white mb-6">What Educators Say</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Hear from educators who have experienced the transformative power of Empire Books&apos; educational materials.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="testimonial-swiper"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg p-8 md:p-10 text-center">
                    <Quote className="mx-auto text-orange/30 mb-6" size={40} />

                    <p className="text-lg md:text-xl text-brown dark:text-white mb-8 italic">&quot;{testimonial.quote}&quot;</p>

                    <div className="flex flex-col items-center">
                      <h4 className="font-bold text-brown dark:text-white text-lg">{testimonial.author}</h4>
                      <p className="text-orange">{testimonial.role}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Call to Action Section */}
      <AnimatedSection className="py-16 bg-orange relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[url('/abcd.jpg')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute -top-[20%] -right-[10%] w-[30%] h-[30%] bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[30%] h-[30%] bg-white/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <BookOpen size={32} className="text-white" />
              </div>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Empower Education?</h2>

            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Learn more about our mission, explore our educational resources, or get in touch with our team to discuss
              how we can support your educational needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton href="/about" variant="white" className="sm:w-auto w-full">
                <School size={20} />
                <span>Learn More About Us</span>
              </AnimatedButton>

              <AnimatedButton href="/contact" variant="outline-white" className="sm:w-auto w-full">
                <span>Get in Touch</span>
                <ChevronRight size={20} />
              </AnimatedButton>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <ScrollToTopButton />
    </div>
  )
}

export default HomePage