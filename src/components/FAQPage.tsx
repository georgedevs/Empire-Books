"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronRight, Plus, Minus, Search, ArrowRight } from "lucide-react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ScrollToTopButton } from "@/components/ScrollToTopButton"

// types for our FAQ data
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQItemWithCategory extends FAQItem {
  category: string;
}

type FAQDataType = {
  [category: string]: FAQItem[];
}

// FAQ Data
const faqCategories = [
  "General Questions",
  "Books and Publications",
  "Services",
  "Orders and Delivery",
  "Contact and Support",
]

const faqData: FAQDataType = {
  "General Questions": [
    {
      question: "What is Empire Books Concept Ltd?",
      answer:
        "Empire Books Concept Ltd. is a publishing company specializing in preschool, pre-primary, and primary textbooks. Founded in 2023 by Ronke Aina, we are committed to research, develop and deliver innovative teaching resources that engage students, support educators and promote academic excellence.",
    },
    {
      question: "When was Empire Books founded?",
      answer:
        "Empire Books was founded in 2023 with a mission to research, develop and deliver innovative teaching resources that engage students, support educators and promote academic excellence.",
    },
  ],
  "Books and Publications": [
    {
      question: "What types of books do you publish?",
      answer:
        "We currently publish textbooks for preschool, pre-primary, and primary students, with plans to expand to other educational categories in the future.",
    },
    {
      question: "Are our books aligned with school curriculums?",
      answer:
        "Yes, our books are carefully designed to align with the NERDC curriculum, ensuring that they meet the educational standards and support effective learning.",
    },
  ],
  Services: [
    {
      question: "Do you offer custom publishing services?",
      answer:
        "Yes, we provide custom publishing solutions tailored to individual or institutional needs. Our team can work with you to create educational materials that meet your specific requirements.",
    },
    {
      question: "Can you help us develop a custom curriculum?",
      answer:
        "We collaborate with schools and educational institutions to develop curriculum-based educational materials that enhance the learning experience.",
    },
  ],
  "Orders and Delivery": [
    {
      question: "Where can I purchase your books?",
      answer:
        "Our books are available through our online store (coming soon) and by reaching out to us or any of our marketers network.",
    },
    {
      question: "Do you deliver nationwide?",
      answer:
        "Yes, we offer nationwide delivery within Nigeria, ensuring that our educational resources reach schools and students across the country.",
    },
  ],
  "Contact and Support": [
    {
      question: "How can I contact Empire Books for inquiries?",
      answer:
        "You can reach us via our contact form on the website or email us at empirebooksconcept@gmail.com. Our team is always ready to assist you with any questions or concerns.",
    },
    {
      question: "What if I have a problem with an order?",
      answer:
        "Please contact our support team via email or phone, and we will promptly assist you in resolving any issues with your order.",
    },
  ],
}

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState("General Questions")
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredFAQs, setFilteredFAQs] = useState<FAQItem[] | FAQItemWithCategory[]>(faqData[activeCategory])
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Add useEffect hook to scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Updated search functionality to search across all categories with proper typing
  useEffect(() => {
    if (searchQuery.trim() === "") {
      // If no search query, show FAQs from active category
      setFilteredFAQs(faqData[activeCategory])
    } else {
      // If search query exists, search across all categories
      const query = searchQuery.toLowerCase()
      const allResults: FAQItemWithCategory[] = []
      
      // Search through all categories
      Object.keys(faqData).forEach(category => {
        const categoryResults = faqData[category].filter(
          (faq) => faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)
        ).map(faq => ({
          ...faq,
          category // Add category information to each result
        }))
        
        allResults.push(...categoryResults)
      })
      
      setFilteredFAQs(allResults)
    }
  }, [searchQuery, activeCategory])

  const toggleQuestion = (index: number) => {
    setExpandedQuestions((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  // Check if an FAQ item has a category property (for type narrowing)
  const hasCategory = (faq: FAQItem | FAQItemWithCategory): faq is FAQItemWithCategory => {
    return 'category' in faq;
  }

  // Sophisticated Variants for Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: {
      y: 50,
      opacity: 0,
      scale: 0.9,
      transition: { type: "spring", stiffness: 300 },
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  }

  const heroVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 1,
      },
    },
  }

  return (
    <div className="bg-white dark:bg-[#121212] text-brown dark:text-white min-h-screen">
      {/* Hero Section with Advanced Animation - REDUCED BOTTOM PADDING */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="relative py-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-orange/5 to-transparent dark:from-orange/10 dark:to-transparent"
      >
        <div className="absolute -top-[20%] -right-[10%] w-[40%] h-[40%] bg-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[40%] bg-orange/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1 bg-orange/10 dark:bg-orange/20 text-orange rounded-full text-sm font-medium mb-4"
          >
            Get Answers
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Frequently <span className="text-orange">Asked Questions</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            Answers to common questions about our books, services, and company
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto relative"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search for questions across all categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent shadow-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Content - REDUCED TOP PADDING */}
      <section ref={sectionRef} className="container mx-auto px-4 pt-4 pb-12">
        {/* Category Tabs with Scroll-Triggered Animation */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-wrap justify-center mb-8 gap-2 sm:gap-3"
        >
          {faqCategories.map((category) => (
            <motion.button
              key={category}
              variants={itemVariants}
              onClick={() => {
                setActiveCategory(category)
                if (searchQuery.trim() === "") {
                  setFilteredFAQs(faqData[category])
                }
              }}
              className={`
                px-4 py-2 rounded-full 
                transition duration-300 
                ${
                  activeCategory === category && searchQuery.trim() === ""
                    ? "bg-orange text-white shadow-md"
                    : "bg-gray-100 dark:bg-[#1a1a1a] text-brown dark:text-white hover:bg-gray-200 dark:hover:bg-[#2a2a2a]"
                }
              `}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Accordion with Advanced Interaction */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-3xl mx-auto"
        >
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants} className="mb-5 overflow-hidden rounded-xl shadow-sm">
                <motion.button
                  onClick={() => toggleQuestion(index)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`
                    w-full flex justify-between items-center 
                    p-5 cursor-pointer text-left
                    transition duration-300
                    ${
                      expandedQuestions.includes(index)
                        ? "bg-orange text-white"
                        : "bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#222]"
                    }
                  `}
                >
                  <div className="pr-8">
                    <h3 className="font-semibold text-lg">{faq.question}</h3>
                    {searchQuery.trim() !== "" && hasCategory(faq) && (
                      <span className="text-sm opacity-80 mt-1 block">
                        Category: {faq.category}
                      </span>
                    )}
                  </div>
                  <div
                    className={`flex-shrink-0 p-1 rounded-full ${
                      expandedQuestions.includes(index) ? "bg-white/20" : "bg-orange/10 dark:bg-orange/20"
                    }`}
                  >
                    {expandedQuestions.includes(index) ? (
                      <Minus size={18} className={expandedQuestions.includes(index) ? "text-white" : "text-orange"} />
                    ) : (
                      <Plus size={18} className="text-orange" />
                    )}
                  </div>
                </motion.button>

                <AnimatePresence>
                  {expandedQuestions.includes(index) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-5 bg-gray-50 dark:bg-[#222222] text-brown dark:text-white border-t border-gray-100 dark:border-gray-800"
                    >
                      <p className="leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div variants={itemVariants} className="text-center p-8 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl">
              <p className="text-lg mb-2">No results found for &quot;{searchQuery}&quot;</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Try a different search term or browse by category</p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-orange hover:underline flex items-center justify-center mx-auto"
              >
                Clear search <ArrowRight size={16} className="ml-1" />
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Call to Action with Scroll-Triggered Animation */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mt-20 mb-12 max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-orange/10 via-orange/20 to-orange/10 dark:from-orange/20 dark:via-orange/30 dark:to-orange/20 rounded-2xl p-8 md:p-10 shadow-sm">
            <motion.div
              variants={itemVariants}
              className="bg-orange/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <ChevronRight size={24} className="text-orange" />
            </motion.div>

            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-4">
              Need More Help?
            </motion.h3>

            <motion.p variants={itemVariants} className="text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto">
              Didn&apos;t find the answer you were looking for? Our support team is ready to assist you with any questions or
              concerns.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link
                href="/contact"
                className="
                  inline-flex items-center justify-center
                  bg-orange text-white
                  px-6 py-3 rounded-lg
                  hover:bg-orange/90
                  transition duration-300
                  space-x-2 shadow-md
                "
              >
                <span>Contact Support</span>
                <ChevronRight size={20} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
      <ScrollToTopButton />
    </div>
  )
}

export default FAQPage