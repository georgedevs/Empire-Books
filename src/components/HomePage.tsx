/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BookOpen, 
  ChevronRight, 
  Quote, 
  School, 
  BookText ,
  ArrowUp
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { motion, useInView, useAnimation } from 'framer-motion';

// Featured Books Data
const featuredBooks = [
  {
    id: 1,
    title: 'Star Letter Work',
    coverImage: '/preschool1.png',
    grade: 'Preschool'
  },
  {
    id: 2,
    title: 'Star English Pre Primary Book 1',
    coverImage: '/star-english-pre-primary-book1.png',
    grade: 'Pre-Primary'
  },
  {
    id: 3,
    title: 'Star Maths Pre Primary Book 1',
    coverImage: '/star-maths-pre-primary-book1.png',
    grade: 'Pre-Primary'
  }
];

// Testimonials Data
const testimonials = [
  {
    quote: "Empire Books' textbooks have transformed our classroom learning experience. The content is engaging and perfectly tailored to our curriculum.",
    author: "Sarah Johnson",
    role: "Elementary School Principal"
  },
  {
    quote: "As an educator, I'm impressed by the research-driven approach and the interactive design of these textbooks.",
    author: "Michael Okonkwo",
    role: "Head of Curriculum"
  },
  {
    quote: "Our students love the vibrant illustrations and clear explanations. Empire Books truly understands educational needs.",
    author: "Grace Adebayo",
    role: "Preschool Coordinator"
  }
];

interface AnimatedSectionProps {
    children: any;
    className:any;
  }

const AnimatedSection : React.FC<AnimatedSectionProps> = ({ children, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

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
            ease: "easeOut" 
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedButtonProps {
    children: any;
    href: string;
    variant?: 'white' | 'orange' | 'outline-white';
    className?: string;
    primary?: boolean;
  }

  const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, href, variant = 'orange', className = ''}) => {
    const getVariantClasses = () => {
        switch (variant) {
          case 'white':
            return 'bg-white text-orange hover:bg-white/90';
          case 'orange':
            return 'bg-orange text-white hover:bg-orange/90';
          case 'outline-white':
            return 'border-2 border-white text-white hover:bg-white/20';
          default:
            return 'bg-orange text-white hover:bg-orange/90';
        }
      };
 
      return (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={className}
        >
          <Link 
            href={href} 
            className={`
              flex items-center justify-center 
              px-6 py-3 rounded-lg 
              transition duration-300 
              space-x-2
              ${getVariantClasses()}
            `}
          >
            {children}
          </Link>
        </motion.div>
      );
    };

    const ScrollToTopButton = () => {
      const [isVisible, setIsVisible] = useState(false);
    
      useEffect(() => {
        const toggleVisibility = () => {
          if (window.pageYOffset > 300) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        };
    
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
      }, []);
    
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };
    
      
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: isVisible ? 1 : 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 bg-orange hover:bg-orange/90 text-white p-3 rounded-lg shadow-lg"
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </motion.button>
  );
};


const HomePage = () => {
  useEffect(() => {
    // Scroll to top on page load/reload
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-white dark:bg-[#121212] text-brown dark:text-white">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="container mx-auto px-4 z-10 flex flex-col-reverse md:flex-row items-center">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 text-center md:text-left space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Empowering Education 
              <br />
              <span className="text-orange">Through Quality Textbooks</span>
            </h1>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Welcome to Empire Books Concept Ltd., where we specialise in creating and publishing 
              high-quality preschool, pre-primary, and primary textbooks. Founded in 2023 by 
              Ronke Aina, with a mission to research, develop and deliver innovative teaching resources that engage students, support educators and promote academic excellence..
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <AnimatedButton href="/books" primary>
                <BookOpen size={20} />
                <span>Explore Our Books</span>
              </AnimatedButton>

              <AnimatedButton href="/contact">
                <span>Contact Us</span>
                <ChevronRight size={20} />
              </AnimatedButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:w-1/2 mb-8 md:mb-0 flex justify-center"
          >
            <Image 
              src="/len.jpg" 
              alt="Empire Books Textbooks" 
              width={600} 
              height={600}
              className="object-contain transform hover:scale-105 transition duration-500"
              priority
            />
          </motion.div>
        </div>

        {/* Background Illustration */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute inset-0 dark:opacity-5 pointer-events-none"
        >
          <Image 
            src="/abcd.jpg" 
            alt="Book Pattern Background" 
            layout="fill" 
            objectFit="cover"
            className="z-0"
          />
        </motion.div>
      </motion.section>

      {/* Featured Books Section */}
      <AnimatedSection className="py-16 bg-gray-50 dark:bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brown dark:text-white mb-4">
              Our Featured Books
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our carefully crafted educational resources designed to inspire 
              and engage young learners across different stages of early education.
            </p>
          </div>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid md:grid-cols-3 gap-8"
          >
            {featuredBooks.map((book) => (
              <motion.div 
                key={book.id}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.6 }
                  }
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.12)"
                }}
                className="
                  bg-white dark:bg-[#2a2a2a] 
                  rounded-lg shadow-lg 
                  p-6 text-center 
                  cursor-pointer
                "
              >
                <Image 
                  src={book.coverImage} 
                  alt={book.title}
                  width={250}
                  height={350}
                  className="mx-auto mb-6 rounded-lg shadow-md"
                />
                <div>
                  <h3 className="text-xl font-semibold text-brown dark:text-white mb-4">
                    {book.title}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 text-orange">
                    <BookText size={20} />
                    <span className="font-medium">{book.grade} Level</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <AnimatedButton href="/books" variant="orange" className="inline-block">
              <span>View More Books</span>
              <ChevronRight size={20} />
            </AnimatedButton>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="py-16 bg-white dark:bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brown dark:text-white mb-4">
              What Educators Say
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hear from educators who have experienced the transformative power of Empire Books' educational materials.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="max-w-3xl mx-auto"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="
                      bg-gray-50 dark:bg-[#1a1a1a] 
                      rounded-lg 
                      p-8 
                      text-center 
                      relative
                    "
                  >
                    <Quote className="absolute top-4 left-4 text-orange opacity-20" size={60} />
                    <p className="text-lg italic text-brown dark:text-white mb-6">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <h4 className="font-semibold text-brown dark:text-white">
                        {testimonial.author}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {testimonial.role}
                      </p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Call to Action Section */}
      <AnimatedSection className="bg-orange text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Empower Education?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Learn more about our mission, explore our comprehensive educational resources, 
            or get in touch with our team to discuss how we can support your educational needs.
          </p>
          <div className="flex justify-center space-x-4">
          <AnimatedButton href="/about" variant="white">
  <School size={20} />
  <span>Learn More About Us</span>
</AnimatedButton>


            <AnimatedButton href="/contact" variant="outline-white">
  <span>Get in Touch</span>
  <ChevronRight size={20} />
</AnimatedButton>
          </div>
        </div>
      </AnimatedSection>
      <ScrollToTopButton/>
    </div>
  );
};

export default HomePage;
