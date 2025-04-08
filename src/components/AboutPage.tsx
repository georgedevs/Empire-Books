"use client"

import React from "react"

import { useState } from "react"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { BookOpen, Star, BookText, ChevronRight, ArrowUp } from "lucide-react"

// Timeline data
const timeline = [
  {
    year: 2023,
    title: "Company Foundation & First Book Series Launch",
    description:
      "Empire Books Concept Ltd. was founded by Ronke Aina, with a vision to revolutionise educational publishing in Nigeria. In the same year, we successfully launched our first series of preschool and pre-primary textbooks.",
  },
  {
    year: 2024,
    title: "Second Series Launch",
    description: "Successfully launched a second batch of more preschool and pre-primary textbooks.",
  },
  {
    year: 2025,
    title: "Expanding Horizons",
    description: "Release of new series for primary schools and expanded distribution network.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
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

const AnimatedButton = ({ 
  children, 
  href, 
  variant = "orange", 
  className = "" 
}: {
  children: React.ReactNode,
  href: string,
  variant?: "white" | "orange" | "outline-white" | "secondary",
  className?: string
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "white":
        return "bg-white text-orange hover:bg-orange/10 hover:text-orange border-2 border-white transition-all duration-300"
      case "orange":
        return "bg-orange text-white hover:bg-orange/90 border-2 border-orange transition-all duration-300"
      case "outline-white":
        return "bg-transparent text-white hover:bg-white/10 border-2 border-white transition-all duration-300"
      case "secondary":
        return "bg-white text-orange hover:bg-orange/10 border-2 border-orange transition-all duration-300"
      default:
        return "bg-orange text-white hover:bg-orange/90 border-2 border-orange transition-all duration-300"
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

const AboutPage = () => {
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const missionRef = useRef(null)
  const timelineRef = useRef(null)
  const ctaRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true, amount: 0.2 })
  const aboutInView = useInView(aboutRef, { once: true, amount: 0.2 })
  const missionInView = useInView(missionRef, { once: true, amount: 0.2 })
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.2 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 })


  useEffect(() => {
    window.scrollTo(0, 0)

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }

    // Cleanup
    return () => {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto"
      }
    }
  }, [])

  return (
    <div className="bg-white dark:bg-[#121212] text-brown dark:text-white overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-orange/10 dark:bg-orange/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-orange/10 dark:bg-orange/5 rounded-full blur-3xl"></div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute inset-0 dark:opacity-[0.08] pointer-events-none"
          >
            <Image src="/lib.jpg" alt="Library Background" layout="fill" objectFit="cover" className="z-0" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-brown/20 to-brown/40 dark:from-brown/30 dark:to-brown/60" />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-1 bg-orange/20 dark:bg-orange/30 text-orange dark:text-orange-gold rounded-full text-sm font-medium mb-4">
              Our Story
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-brown dark:text-white">
              Discover the Heart of <span className="text-orange">Empire Books</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Publishing quality educational materials that inspire and empower the next generation of learners
            </p>
            <AnimatedButton href="/books" variant="orange" className="inline-block">
              <BookOpen size={20} />
              <span>Explore Our Books</span>
            </AnimatedButton>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 bg-gray-50 dark:bg-[#151515] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -top-[20%] -left-[10%] w-[40%] h-[40%] bg-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-orange/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, type: "spring" }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-1 bg-orange/10 dark:bg-orange/20 text-orange rounded-full text-sm font-medium mb-2">
                About Us
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brown dark:text-white mb-6">
                Shaping the Future of Education
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Founded in 2023, Empire Books Concept Ltd. is a pioneering book publishing company based in Nigeria. We
                specialise in creating high-quality textbooks for preschool, pre-primary, and primary students, helping
                schools and parents shape the future of education.
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Our founder and CEO, Ronke Aina, brings years of experience as an educational consultant, ensuring that
                every textbook meets the academic needs of schools and students alike. We combine educational expertise
                with creative design to produce materials that engage young minds.
              </p>
              <AnimatedButton href="/contact" variant="orange" className="inline-block mt-4">
                <span>Get in Touch</span>
                <ChevronRight size={20} />
              </AnimatedButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={aboutInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="relative"
            >
              <div className="relative h-[500px] w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-orange/10 to-transparent rounded-2xl"></div>
                <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-orange/20 rounded-2xl"></div>
                <div className="absolute -top-6 -left-6 w-full h-full border-4 border-orange/20 rounded-2xl"></div>
                <Image
                  src="/111.png"
                  alt="Empire Books Collection"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section ref={missionRef} className="py-20 bg-white dark:bg-[#121212] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -top-[30%] -right-[10%] w-[40%] h-[40%] bg-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[30%] -left-[10%] w-[40%] h-[40%] bg-orange/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-orange/10 dark:bg-orange/20 text-orange rounded-full text-sm font-medium mb-4">
              Our Purpose
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brown dark:text-white mb-6">Mission and Vision</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Guided by our core values, we strive to make a meaningful impact on education across Nigeria and beyond.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={missionInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
            >
              <div className="bg-orange/10 dark:bg-orange/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-orange" />
              </div>
              <h3 className="text-xl font-bold text-brown dark:text-white mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-400">
                To research, develop and deliver innovative teaching resources that engage students, support educators
                and promote academic excellence.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
            >
              <div className="bg-orange/10 dark:bg-orange/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookText className="w-8 h-8 text-orange" />
              </div>
              <h3 className="text-xl font-bold text-brown dark:text-white mb-4">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-400">
                To be the leading knowledge-based company that provides qualitative resources for learning which engage,
                enrich and enlighten young minds.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 bg-gray-50 dark:bg-[#151515] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -top-[20%] -right-[10%] w-[40%] h-[40%] bg-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[40%] bg-orange/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-orange/10 dark:bg-orange/20 text-orange rounded-full text-sm font-medium mb-4">
              Our Progress
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brown dark:text-white mb-6">Our Journey</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              From our founding to our future plans, we continue to grow and evolve to meet educational needs.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={timelineInView ? "visible" : "hidden"}
            className="relative max-w-4xl mx-auto"
          >
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-orange/30 rounded-full"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`mb-16 flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center`}
              >
                <div
                  className={`flex-1 ${index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"} mb-4 md:mb-0`}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 inline-block"
                  >
                    <div className="bg-orange text-white text-xl font-bold px-4 py-1 rounded-lg inline-block mb-4">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-brown dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </motion.div>
                </div>

                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-orange text-white font-bold z-10">
                  {index + 1}
                </div>

                <div className="flex-1"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section ref={ctaRef} className="py-16 bg-orange relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[url('/abcd.jpg')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute -top-[20%] -right-[10%] w-[30%] h-[30%] bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[30%] h-[30%] bg-white/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 120,
            }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen size={32} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Education?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Discover how our educational materials can enhance learning experiences in your school or institution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton href="/books" variant="white" className="sm:w-auto w-full">
                <span>Explore Our Books</span>
                <ChevronRight size={20} />
              </AnimatedButton>

              <AnimatedButton href="/contact" variant="outline-white" className="sm:w-auto w-full">
                <span>Contact Us</span>
                <ChevronRight size={20} />
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>

      <ScrollToTopButton />
    </div>
  )
}

export default AboutPage
