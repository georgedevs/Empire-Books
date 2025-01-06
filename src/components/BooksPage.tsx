  /* eslint-disable react/no-unescaped-entities */
  'use client'
  import React, { useState, useMemo, useRef, useEffect } from 'react';
  import Link from 'next/link';
  import Image from 'next/image';
  import { 
    BookText, 
    Filter, 
    Search, 
    ChevronRight, 
    BookOpen, 
    ChevronDown,
    ChevronLeft
  } from 'lucide-react';
  import { motion, useInView } from 'framer-motion';
  import { ScrollToTopButton } from './ScrollToTopButton';


  const bookCategories = [
    {
      id: 'preschool',
      title: 'Preschool Books',
      description: 'Engaging learning materials for early childhood education',
      icon: BookOpen,
      books: [
        {
          id: 'ps1',
          title: 'Star Letter Work',
          coverImage: '/preschool1.png', 
          grade: 'Preschool'
        },
        {
          id: 'ps2',
          title: 'Star Number Work',
          coverImage: '/preschool2.png', 
          grade: 'Preschool'
        },
        {
          id: 'ps3',
          title: 'Star Coloring Book 1',
          coverImage: '/star-coloring-book1.png',
          grade: 'Preschool'
        },
        {
          id: 'ps4',
          title: 'Star Quantitative Reasoning Kindergarten',
          coverImage: '/star-quant-pre-primary-kg.png',
          grade: 'Preschool'
        },
        {
          id: 'ps5',
          title: 'Star Verbal Reasoning Kindergarten',
          coverImage: '/star-verbal-pre-primary-kg.png',
          grade: 'Pre-Primary'
        },
      ]
    },
    {
      id: 'preprimary',
      title: 'Pre-Primary Books',
      description: 'Comprehensive resources for foundational learning',
      icon: BookText,
      books: [
        {
          id: 'pp1',
          title: 'Star English Pre Primary Preparatory',
          coverImage: '/star-english-pre-primary-prep.png',
          grade: 'Pre-Primary'
        },
        {
          id: 'pp2',
          title: 'Star English Pre Primary Book 1',
          coverImage: '/star-english-pre-primary-book1.png',
          grade: 'Pre-Primary'
        },
        {
          id: 'pp3',
          title: 'Star English Pre Primary Book 2',
          coverImage: '/star-english-pre-primary-book2.png',
          grade: 'Pre-Primary'
        },
        {
          id: 'pp4',
          title: 'Star English Pre Primary Book 3',
          coverImage: '/star-english-pre-primary-book3.png',
          grade: 'Pre-Primary'
        },
        {
          id: 'pp5',
          title: 'Star Maths Pre Primary Preparatory',
          coverImage: '/star-maths-pre-primary-prep.png',
          grade: 'Pre-Primary'
        },
        {
          id: 'pp6',
          title: 'Star Maths Pre Primary Book 1',
          coverImage: '/star-maths-pre-primary-book1.png',
          grade: 'Pre-Primary'
        },
        {
          id: 'pp7',
          title: 'Star Maths Pre Primary Book 2',
          coverImage: '/star-maths-pre-primary-book2.png',
          grade: 'Pre-Primary'
        },
        {
          id: 'pp8',
          title: 'Star Maths Pre Primary Book 3',
          coverImage: '/star-maths-pre-primary-book3.png',
          grade: 'Pre-Primary'
        },
        {
          id: 'pp11',
          title: 'Star Quantitative Reasoning Pre Primary Book 1',
          coverImage: '/star-quant-pre-primary-book1.png',
          grade: 'Pre-Primary'
        },
        {
          id: 'pp12',
          title: 'Star Quantitative Reasoning Pre Primary Book 2',
          coverImage: '/star-quant-pre-primary-book2.png',
          grade: 'Pre-Primary'
        },
        {
          id: 'pp14',
          title: 'Star Verbal Reasoning Pre Primary Book 1',
          coverImage: '/star-verbal-pre-primary-book1.png',
          grade: 'Pre-Primary'
        },
        {
          id: 'pp15',
          title: 'Star Verbal Reasoning Pre Primary Book 2',
          coverImage: '/star-verbal-pre-primary-book2.png',
          grade: 'Pre-Primary'
        },

        {
          id: 'pp17',
          title: 'Star Coloring Book 2',
          coverImage: '/star-coloring-book2.png',
          grade: 'Pre-Primary'
        },
        {
          id: 'pp18',
          title: 'Star Coloring Book 3',
          coverImage: '/star-coloring-book3.png',
          grade: 'Pre-Primary'
        },
      ]
    },
    {
      id: 'primary',
      title: 'Primary Books',
      description: 'Comprehensive textbooks for primary school students',
      icon: BookText,
      books: []
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  const BooksPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [showScrollIndicator, setShowScrollIndicator] = useState(false);
    const BOOKS_PER_PAGE = 8;

    const heroRef = useRef<HTMLDivElement>(null);
    const categoriesRef = useRef<HTMLDivElement>(null);
    const booksRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const filteredBooksRef = useRef<HTMLDivElement>(null);

    const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
    const categoriesInView = useInView(categoriesRef, { once: true, amount: 0.2 });
    const booksInView = useInView(booksRef, { once: true, amount: 0.2 });
    const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 });

    const filteredBooks = useMemo(() => {
      return bookCategories.flatMap(category => 
        category.books.filter(book => 
          (selectedCategory === 'all' || category.id === selectedCategory) &&
          book.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, [searchTerm, selectedCategory]);

    const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
    const currentBooks = filteredBooks.slice(
      (currentPage - 1) * BOOKS_PER_PAGE,
      currentPage * BOOKS_PER_PAGE
    );

    useEffect(() => {
      setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, selectedCategory]);

    const handleCategorySelect = (categoryId: string) => {
      setSelectedCategory(categoryId);
      setShowScrollIndicator(true);
      
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        if (filteredBooksRef.current) {
          filteredBooksRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          
          const yOffset = -80;
          const y = filteredBooksRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
        
        setShowScrollIndicator(true);
        
        setTimeout(() => {
          setShowScrollIndicator(false);
        }, 3000);
      }
    };


    useEffect(() => {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
        
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }
    
        return () => {
          if ('scrollRestoration' in history) {
            history.scrollRestoration = 'auto';
          }
        };
      }
    }, []);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      if (filteredBooksRef.current) {
        filteredBooksRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };
    const renderPagination = () => {
      const pages = [];
      const maxVisiblePages = 5;
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`
              px-4 py-2 mx-1 rounded-lg
              ${currentPage === i 
                ? 'bg-orange text-white' 
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }
            `}
          >
            {i}
          </button>
        );
      }

      return (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
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
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                {totalPages}
              </button>
            </>
          )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      );
    };
    return (
      <div className="bg-white dark:bg-[#121212] text-brown dark:text-white">
        {/* Hero Section */}
        <motion.section 
          ref={heroRef}
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: 'spring' }}
          className="relative min-h-[50vh] flex items-center justify-center overflow-hidden"
        >
          <div className="container mx-auto px-4 z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Our <span className="text-orange">Books and Publications</span>
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              High-quality textbooks for preschool, pre-primary, and primary education, 
              designed to inspire and engage young learners.
            </p>
            <Link 
              href="/contact" 
              className="
                inline-flex items-center justify-center 
                bg-orange text-white 
                px-6 py-3 rounded-lg 
                hover:bg-orange/90 
                transition duration-300 
                space-x-2
              "
            >
              <span>Contact Us for More Information</span>
              <ChevronRight size={20} />
            </Link>
          </div>

          {/* Background Illustration */}
          <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none">
            <Image 
              src="/abcd.jpg" 
              alt="Book Pattern Background" 
              layout="fill" 
              objectFit="cover"
              className="z-0"
            />
          </div>
        </motion.section>

        {/* Book Categories Section */}
        <motion.section 
          ref={categoriesRef}
          initial="hidden"
          animate={categoriesInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="py-16 bg-gray-50 dark:bg-[#1a1a1a] relative"
        >
          <div className="container mx-auto px-4">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold text-center mb-12"
            >
              Our Book Categories
            </motion.h2>
            <motion.div 
              variants={containerVariants}
              className="grid md:grid-cols-3 gap-8"
            >
              {bookCategories.map((category) => (
                <motion.div 
                  key={category.id} 
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 2,
                    transition: { duration: 0.3 }
                  }}
                  className="
                    bg-white dark:bg-[#2a2a2a] 
                    rounded-lg shadow-lg 
                    p-6 text-center 
                    transform hover:scale-105 
                    transition duration-300
                  "
                >
                  <category.icon className="mx-auto mb-4 text-orange" size={50} />
                  <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {category.description}
                  </p>
                  <button 
                    onClick={() => handleCategorySelect(category.id)} 
                    className="
                      inline-flex items-center 
                      text-orange hover:text-orange/80 
                      transition duration-300
                    "
                  >
                    View Books <ChevronRight size={20} />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Books Filtering and Search Section */}
        <motion.section 
          ref={booksRef}
          initial={{ opacity: 0, y: 100 }}
          animate={booksInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="py-16 bg-white dark:bg-[#121212]"
        >
          <div ref={filteredBooksRef} className="container mx-auto px-4">
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
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <h2 className="text-3xl font-bold mb-4 md:mb-0">
                Our Complete Book Collection
              </h2>
              <div className="flex space-x-4">
                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="
                      appearance-none 
                      bg-white dark:bg-[#2a2a2a]
                      border border-gray-300 dark:border-gray-700
                      rounded-lg 
                      pl-4 pr-10 py-2
                      text-brown dark:text-white
                    "
                  >
                    <option value="all">All Categories</option>
                    {bookCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                  <Filter 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brown dark:text-white" 
                    size={20} 
                  />
                </div>

                {/* Search Input */}
                <div className="relative flex-grow">
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
                      pl-10 pr-4 py-2
                      text-brown dark:text-white
                    "
                  />
                  <Search 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-brown dark:text-white" 
                    size={20} 
                  />
                </div>
              </div>
            </div>

 {/* Book Grid */}
 <motion.div 
            initial="hidden"
            animate={booksInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid md:grid-cols-4 gap-8"
          >
            {selectedCategory === 'primary' && bookCategories.find(c => c.id === 'primary')?.books.length === 0 ? (
              <div className="col-span-4 text-center py-12">
                <h3 className="text-2xl font-bold text-orange mb-4">Coming Soon!</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our primary school books collection is currently under development. 
                  Please check back later or contact us for more information.
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
                    transition: { duration: 0.3 }
                  }}
                  className="
                    bg-gray-50 dark:bg-[#1a1a1a] 
                    rounded-lg 
                    p-4 
                    text-center 
                    transform hover:scale-105 
                    transition duration-300
                  "
                >
                  <Image 
                    src={book.coverImage} 
                    alt={book.title}
                    width={250}
                    height={350}
                    className="mx-auto mb-4 rounded-lg shadow-md"
                  />
                  <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                  <div className="flex items-center justify-center space-x-2 text-orange">
                    <BookText size={20} />
                    <span className="font-medium">{book.grade} Level</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-4 text-center py-12">
                <p className="text-gray-600 dark:text-gray-300">
                  No books found matching your search criteria.
                </p>
              </div>
            )}
          </motion.div>

          {/* Pagination */}
          {filteredBooks.length > 0 && selectedCategory !== 'primary' && renderPagination()}
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section 
        ref={ctaRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ 
          duration: 0.6, 
          type: 'spring', 
          stiffness: 120 
        }}
        className="bg-orange text-white py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            animate={ctaInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl font-bold mb-6"
          >
            Looking for Specific Books?
          </motion.h2>
          <motion.p 
            initial={{ y:50, opacity: 0 }}
            animate={ctaInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg mb-8 max-w-2xl mx-auto"
          >
            Contact us today to learn more about our publications or place an order. 
            We're here to support your educational needs.
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={ctaInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center space-x-4"
          >
            <Link 
              href="/contact" 
              className="
                flex items-center justify-center 
                bg-white text-orange 
                px-6 py-3 rounded-lg 
                hover:bg-white/90 
                transition duration-300 
                space-x-2
              "
            >
              <span>Contact Us</span>
              <ChevronRight size={20} />
            </Link>
          </motion.div>
        </div>
      </motion.section>
      <ScrollToTopButton/>
    </div>
  );
};

export default BooksPage;