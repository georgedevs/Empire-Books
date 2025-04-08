"use client"

import { useState, useMemo, useRef, useEffect, SetStateAction } from "react"
import Link from "next/link"
import Image from "next/image"
import { Filter, Search, ChevronRight, BookOpen, ChevronDown, ChevronLeft, ArrowUp, Star, Sparkles, GraduationCap } from 'lucide-react'
import { motion, useInView, AnimatePresence } from "framer-motion"

const bookCategories = [
  {
    id: "preschool",
    title: "Preschool Books",
    description: "Engaging learning materials for early childhood education",
    icon: Sparkles,
    books: [
      {
        id: "ps1",
        title: "Star Letter Work",
        coverImage: "/preschool1.png",
        grade: "Preschool",
      },
      {
        id: "ps2",
        title: "Star Number Work",
        coverImage: "/preschool2.png",
        grade: "Preschool",
      },
      {
        id: "ps3",
        title: "Star Coloring Book 1",
        coverImage: "/star-coloring-book1.png",
        grade: "Preschool",
      },
      {
        id: "ps4",
        title: "Star Quantitative Reasoning Kindergarten",
        coverImage: "/star-quant-pre-primary-kg.png",
        grade: "Preschool",
      },
      {
        id: "ps5",
        title: "Star Verbal Reasoning Kindergarten",
        coverImage: "/star-verbal-pre-primary-kg.png",
        grade: "Pre-Primary",
      },
    ],
  },
  {
    id: "preprimary",
    title: "Pre-Primary Books",
    description: "Comprehensive resources for foundational learning",
    icon: Star,
    books: [
      {
        id: "pp1",
        title: "Star English Pre Primary Preparatory",
        coverImage: "/star-english-pre-primary-prep.png",
        grade: "Pre-Primary",
      },
      {
        id: "pp2",
        title: "Star English Pre Primary Book 1",
        coverImage: "/star-english-pre-primary-book1.png",
        grade: "Pre-Primary",
      },
      {
        id: "pp3",
        title: "Star English Pre Primary Book 2",
        coverImage: "/star-english-pre-primary-book2.png",
        grade: "Pre-Primary",
      },
      {
        id: "pp4",
        title: "Star English Pre Primary Book 3",
        coverImage: "/star-english-pre-primary-book3.png",
        grade: "Pre-Primary",
      },
      {
        id: "pp5",
        title: "Star Maths Pre Primary Preparatory",
        coverImage: "/star-maths-pre-primary-prep.png",
        grade: "Pre-Primary",
      },
      {
        id: "pp6",
        title: "Star Maths Pre Primary Book 1",
        coverImage: "/star-maths-pre-primary-book1.png",
        grade: "Pre-Primary",
      },
      {
        id: "pp7",
        title: "Star Maths Pre Primary Book 2",
        coverImage: "/star-maths-pre-primary-book2.png",
        grade: "Pre-Primary",
      },
      {
        id: "pp8",
        title: "Star Maths Pre Primary Book 3",
        coverImage: "/star-maths-pre-primary-book3.png",
        grade: "Pre-Primary",
      },
      {
        id: "pp11",
        title: "Star Quantitative Reasoning Pre Primary Book 1",
        coverImage: "/star-quant-pre-primary-book1.png",
        grade: "Pre-Primary",
      },
      {
        id: "pp12",
        title: "Star Quantitative Reasoning Pre Primary Book 2",
        coverImage: "/star-quant-pre-primary-book2.png",
        grade: "Pre-Primary",
      },
      {
        id: "pp14",
        title: "Star Verbal Reasoning Pre Primary Book 1",
        coverImage: "/star-verbal-pre-primary-book1.png",
        grade: "Pre-Primary",
      },
      {
        id: "pp15",
        title: "Star Verbal Reasoning Pre Primary Book 2",
        coverImage: "/star-verbal-pre-primary-book2.png",
        grade: "Pre-Primary",
      },
      {
        id: "pp17",
        title: "Star Coloring Book 2",
        coverImage: "/star-coloring-book2.png",
        grade: "Pre-Primary",
      },
      {
        id: "pp18",
        title: "Star Coloring Book 3",
        coverImage: "/star-coloring-book3.png",
        grade: "Pre-Primary",
      },
    ],
  },
  {
    id: "primary",
    title: "Primary Books",
    description: "Comprehensive textbooks for primary school students",
    icon: GraduationCap,
    books: [
      {
        id: "p1",
        title: "Star Primary English Book 1",
        coverImage: "/starpryengbook1.png",
        grade: "Primary",
      },
      {
        id: "p2",
        title: "Star Primary English Book 2",
        coverImage: "/starpryengbook2.png",
        grade: "Primary",
      },
      {
        id: "p3",
        title: "Star Primary English Book 3",
        coverImage: "/starpryengbook3.png",
        grade: "Primary",
      },
      {
        id: "p4",
        title: "Star Primary English Book 4",
        coverImage: "/starpryengbook4.png",
        grade: "Primary",
      },
      {
        id: "p5",
        title: "Star Primary English Book 5",
        coverImage: "/starpryengbook5.png",
        grade: "Primary",
      },
      {
        id: "p6",
        title: "Star Primary English Book 6",
        coverImage: "/starpryengbook6.png",
        grade: "Primary",
      },
      {
        id: "p7",
        title: "Star Primary Math Book 1",
        coverImage: "/starprymathbook1.png",
        grade: "Primary",
      },
      {
        id: "p8",
        title: "Star Primary Math Book 2",
        coverImage: "/starprymathbook2.png",
        grade: "Primary",
      },
      {
        id: "p9",
        title: "Star Primary Math Book 3",
        coverImage: "/starprymathbook3.png",
        grade: "Primary",
      },
      {
        id: "p10",
        title: "Star Primary Math Book 4",
        coverImage: "/starprymathbook4.png",
        grade: "Primary",
      },
      {
        id: "p11",
        title: "Star Primary Math Book 5",
        coverImage: "/starprymathbook5.png",
        grade: "Primary",
      },
      {
        id: "p12",
        title: "Star Primary Math Book 6",
        coverImage: "/starprymathbook6.png",
        grade: "Primary",
      },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
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

const BooksPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const BOOKS_PER_PAGE = 8

  const heroRef = useRef(null)
  const categoriesRef = useRef(null)
  const booksRef = useRef(null)
  const ctaRef = useRef(null)
  const filteredBooksRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.2 })
  const categoriesInView = useInView(categoriesRef, { once: true, amount: 0.2 })
  const booksInView = useInView(booksRef, { once: true, amount: 0.1 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 })

  const filteredBooks = useMemo(() => {
    return bookCategories.flatMap((category) =>
      category.books.filter(
        (book) =>
          (selectedCategory === "all" || category.id === selectedCategory) &&
          book.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    )
  }, [searchTerm, selectedCategory])

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE)
  const currentBooks = filteredBooks.slice((currentPage - 1) * BOOKS_PER_PAGE, currentPage * BOOKS_PER_PAGE)

  useEffect(() => {
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, selectedCategory])

  const handleCategorySelect = (categoryId: SetStateAction<string>) => {
    setSelectedCategory(categoryId)
    setShowScrollIndicator(true)

    // Scroll behavior for all screen sizes
    if (filteredBooksRef.current) {
      // Calculate offset - can be adjusted based on your header height
      const yOffset = -80
      // Get the element's position
      const y = (filteredBooksRef.current as HTMLElement).getBoundingClientRect().top + window.pageYOffset + yOffset

      // Smooth scroll to filtered results
      window.scrollTo({
        top: y,
        behavior: "smooth",
      })
    }

    // Show scroll indicator briefly
    setShowScrollIndicator(true)
    setTimeout(() => {
      setShowScrollIndicator(false)
    }, 3000)
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0)

      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual"
      }

      return () => {
        if ("scrollRestoration" in history) {
          history.scrollRestoration = "auto"
        }
      }
    }
  }, [])

  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page)
    if (filteredBooksRef.current) {
      filteredBooksRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const renderPagination = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`
            px-4 py-2 mx-1 rounded-lg transition-all duration-300
            ${
              currentPage === i
                ? "bg-orange text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            }
          `}
        >
          {i}
        </button>,
      )
    }

    return (
      <div className="flex justify-center items-center space-x-2 mt-12">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
        >
          <ChevronLeft size={20} />
        </button>
        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
            >
              1
            </button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}
        {pages}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-[#121212] text-brown dark:text-white overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
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

        <div className="container mx-auto px-4 z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-1 bg-orange/10 dark:bg-orange/20 text-orange rounded-full text-sm font-medium mb-4">
              Educational Resources
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Explore Our <span className="text-orange">Books Collection</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              High-quality textbooks for preschool, pre-primary, and primary education, designed to inspire and engage
              young learners.
            </p>
            <AnimatedButton href="/contact" variant="orange" className="inline-block">
              <span>Contact Us for More Information</span>
              <ChevronRight size={20} />
            </AnimatedButton>
          </motion.div>
        </div>
      </section>

      {/* Book Categories Section */}
      <section ref={categoriesRef} className="py-20 bg-gray-50 dark:bg-[#151515] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -top-[20%] -left-[10%] w-[40%] h-[40%] bg-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-orange/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
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

          <motion.div
            initial="hidden"
            animate={categoriesInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {bookCategories.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  rotate: 2,
                  transition: { duration: 0.3 },
                }}
                className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
              >
                <div className="bg-orange/10 dark:bg-orange/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <category.icon className="w-8 h-8 text-orange" />
                </div>
                <h3 className="text-xl font-bold text-brown dark:text-white mb-4">{category.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{category.description}</p>
                <button
                  onClick={() => handleCategorySelect(category.id)}
                  className="inline-flex items-center justify-center px-4 py-2 bg-orange/10 text-orange rounded-lg hover:bg-orange/20 transition duration-300"
                >
                  View Books <ChevronRight size={20} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Books Filtering and Search Section */}
      <section ref={booksRef} className="py-20 bg-white dark:bg-[#121212] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -top-[30%] -right-[10%] w-[40%] h-[40%] bg-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[30%] -left-[10%] w-[40%] h-[40%] bg-orange/5 rounded-full blur-3xl"></div>

        <div ref={filteredBooksRef} className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showScrollIndicator ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mb-6 text-center text-orange"
          >
            <p className="flex items-center justify-center gap-2">
              <ChevronDown className="animate-bounce" />
              Filtered results below
            </p>
          </motion.div>

          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-orange/10 dark:bg-orange/20 text-orange rounded-full text-sm font-medium mb-4">
              Our Publications
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brown dark:text-white mb-6">Complete Book Collection</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg mb-8">
              Discover our carefully crafted educational resources designed to inspire and engage young learners.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={booksInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-2xl mx-auto"
            >
              {/* Category Filter */}
              <div className="relative w-full md:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="
                    appearance-none 
                    w-full md:w-auto
                    bg-white dark:bg-[#2a2a2a]
                    border border-gray-300 dark:border-gray-700
                    rounded-lg 
                    pl-4 pr-10 py-3
                    text-brown dark:text-white
                    shadow-sm
                    focus:outline-none focus:ring-2 focus:ring-orange/50
                    transition-all duration-300
                  "
                >
                  <option value="all">All Categories</option>
                  {bookCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-orange" size={20} />
              </div>

              {/* Search Input */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="
                    w-full
                    bg-white dark:bg-[#2a2a2a]
                    border border-gray-300 dark:border-gray-700
                    rounded-lg 
                    pl-10 pr-4 py-3
                    text-brown dark:text-white
                    shadow-sm
                    focus:outline-none focus:ring-2 focus:ring-orange/50
                    transition-all duration-300
                  "
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-orange" size={20} />
              </div>
            </motion.div>
          </div>

          {/* Book Grid */}
          <motion.div
            initial="hidden"
            animate={booksInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {selectedCategory === "primary" && bookCategories.find((c) => c.id === "primary")?.books.length === 0 ? (
              <div className="col-span-4 text-center py-12">
                <h3 className="text-2xl font-bold text-orange mb-4">Coming Soon!</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our primary school books collection is currently under development. Please check back later or contact
                  us for more information.
                </p>
              </div>
            ) : currentBooks.length > 0 ? (
              currentBooks.map((book) => (
                <motion.div
                  key={book.id}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    rotate: 3,
                    transition: { duration: 0.3 },
                  }}
                  className="group"
                >
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl overflow-hidden transform group-hover:-translate-y-2 transition-all duration-300">
                    <div className="relative h-[350px] overflow-hidden">
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
                      <div className="flex items-center space-x-1 text-orange">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill="#FFA500" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-4 text-center py-12">
                <p className="text-gray-600 dark:text-gray-300">No books found matching your search criteria.</p>
              </div>
            )}
          </motion.div>

          {/* Pagination */}
          {filteredBooks.length > 0 && renderPagination()}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Looking for Specific Books?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Contact us today to learn more about our publications or place an order. We&apos;re here to support your
              educational needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton href="/contact" variant="white" className="sm:w-auto w-full">
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

export default BooksPage
