/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Plus, Minus } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScrollToTopButton } from './ScrollToTopButton';

// FAQ Data
const faqCategories = [
  'General Questions',
  'Books and Publications',
  'Services',
  'Orders and Delivery',
  'Contact and Support'
];

const faqData = {
  'General Questions': [
    {
      question: 'What is Empire Books Concept Ltd?',
      answer: 'Empire Books Concept Ltd. is a publishing company specializing in preschool, pre-primary, and primary textbooks. Founded in 2023 by Ronke Aina, we are committed to research, develop and deliver innovative teaching resources that engage students, support educators and promote academic excellence.'
    },
    {
      question: 'When was Empire Books founded?',
      answer: 'Empire Books was founded in 2023 with a mission to research, develop and deliver innovative teaching resources that engage students, support educators and promote academic excellence.'
    }
  ],
  'Books and Publications': [
    {
      question: 'What types of books do you publish?',
      answer: 'We currently publish textbooks for preschool, pre-primary, and primary students, with plans to expand to other educational categories in the future.'
    },
    {
      question: 'Are our books aligned with school curriculums?',
      answer: 'Yes, our books are carefully designed to align with the NERDC curriculum, ensuring that they meet the educational standards and support effective learning.'
    }
  ],
  'Services': [
    {
      question: 'Do you offer custom publishing services?',
      answer: 'Yes, we provide custom publishing solutions tailored to individual or institutional needs. Our team can work with you to create educational materials that meet your specific requirements.'
    },
    {
      question: 'Can you help us develop a custom curriculum?',
      answer: 'Absolutely! We collaborate with schools and educational institutions to develop curriculum-based educational materials that enhance the learning experience.'
    }
  ],
  'Orders and Delivery': [
    {
      question: 'Where can I purchase your books?',
      answer: 'Our books are available through our online store (coming soon) and by reaching out to us or any of our marketers network.'
    },
    {
      question: 'Do you deliver nationwide?',
      answer: 'Yes, we offer nationwide delivery within Nigeria, ensuring that our educational resources reach schools and students across the country.'
    }
  ],
  'Contact and Support': [
    {
      question: 'How can I contact Empire Books for inquiries?',
      answer: 'You can reach us via our contact form on the website or email us at empirebooksconcept@gmail.com. Our team is always ready to assist you with any questions or concerns.'
    },
    {
      question: 'What if I have a problem with an order?',
      answer: 'Please contact our support team via email or phone, and we will promptly assist you in resolving any issues with your order.'
    }
  ]
};

const FAQPage = () => {
    const [activeCategory, setActiveCategory] = useState('General Questions');
    const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    // Add useEffect hook to scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  
    const toggleQuestion = (index: number) => {
      setExpandedQuestions(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    };
  
    const currentFAQs = faqData[activeCategory as keyof typeof faqData];
  
    // Sophisticated Variants for Animations
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.1
        }
      }
    };
  
    const itemVariants = {
      hidden: { 
        y: 50, 
        opacity: 0,
        scale: 0.9,
        transition: { type: "spring", stiffness: 300 }
      },
      visible: { 
        y: 0, 
        opacity: 1,
        scale: 1,
        transition: { 
          type: "spring", 
          stiffness: 300,
          damping: 15 
        }
      }
    };
  
    const heroVariants = {
      hidden: { 
        opacity: 0, 
        y: 100,
        scale: 0.9 
      },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: { 
          type: "spring", 
          stiffness: 100,
          damping: 15,
          duration: 1
        }
      }
    };
  
    return (
      <div className="bg-white dark:bg-[#121212] text-brown dark:text-white">
        {/* Hero Section with Advanced Animation */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          className="relative min-h-[30vh] flex items-center justify-center overflow-hidden"
        >
          <div className="container mx-auto px-4 z-10 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              Frequently <span className="text-orange">Asked Questions</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            >
              Answers to common questions about our books, services, and company
            </motion.p>
          </div>
        </motion.section>
  
        {/* FAQ Content */}
        <section ref={sectionRef} className="container mx-auto px-4">
          {/* Category Tabs with Scroll-Triggered Animation */}
          <motion.div 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="flex flex-wrap justify-center mb-10 space-x-2 sm:space-x-4"
          >
            {faqCategories.map((category) => (
              <motion.button
                key={category}
                variants={itemVariants}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-4 py-2 rounded-lg 
                  transition duration-300 
                  ${activeCategory === category 
                    ? 'bg-orange text-white' 
                    : 'bg-gray-100 dark:bg-[#1a1a1a] text-brown dark:text-white hover:bg-gray-200 dark:hover:bg-[#2a2a2a]'}
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
            {currentFAQs.map((faq, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="mb-4 border border-brown/10 dark:border-white/10 rounded-lg overflow-hidden"
              >
                <motion.div 
                  onClick={() => toggleQuestion(index)}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex justify-between items-center 
                    p-4 cursor-pointer 
                    transition duration-300
                    ${expandedQuestions.includes(index) 
                      ? 'bg-orange text-white' 
                      : 'bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#2a2a2a]'}
                  `}
                >
                  <h3 className="font-semibold text-lg">
                    {faq.question}
                  </h3>
                  {expandedQuestions.includes(index) ? (
                    <Minus size={24} />
                  ) : (
                    <Plus size={24} />
                  )}
                </motion.div>
                
                {expandedQuestions.includes(index) && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-gray-50 dark:bg-[#222222] text-brown dark:text-white"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
  
          {/* Call to Action with Scroll-Triggered Animation */}
          <motion.div 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mt-16 mb-4"
          >
            <motion.h3 
              variants={itemVariants}
              className="text-2xl font-bold mb-4"
            >
              Need More Help?
            </motion.h3>
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto"
            >
              Didn't find the answer you were looking for? Our support team is ready to assist you.
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
                  space-x-2
                "
              >
                <span>Contact Support</span>
                <ChevronRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </section>
        <ScrollToTopButton/>
      </div>
    );
  };
  
  export default FAQPage;