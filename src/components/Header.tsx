'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Sun, 
  Moon
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'unset';
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/books', label: 'Books and Publications' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/faqs', label: 'FAQs' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#121212] shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center">
              <Image 
                src="/em.png" 
                alt="Empire Books Logo" 
                width={100}
                height={50}
                priority
                className="object-contain h-16 w-auto transition-transform duration-300"
              />
            </Link>
          </motion.div>

          <div className="md:hidden flex-1 text-center">
            <Link href="/" className="block">
              <h1 className="text-xl font-bold text-brown">
                <span className="text-orange">Empire Books</span>
              </h1>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link 
                  href={link.href} 
                  className={`
                    relative group
                    transition-colors duration-300
                    ${pathname === link.href 
                      ? 'text-orange font-medium' 
                      : 'text-brown hover:text-orange'}
                  `}
                >
                  {link.label}
                  <motion.span 
                    className={`
                      absolute -bottom-1 left-0 h-0.5 bg-orange
                      ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}
                      transition-all duration-300
                    `}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <motion.button 
              whileHover={{ rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-orange/10 transition-colors duration-300"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <motion.button 
              whileHover={{ rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-orange/10 transition-colors duration-300"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={toggleMobileMenu}
              className="text-brown"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 top-24 bg-white dark:bg-[#121212] z-50"
            >
              <nav className="flex flex-col items-center py-8 space-y-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={toggleMobileMenu}
                      className={`
                        text-xl relative group
                        transition-colors duration-300
                        ${pathname === link.href 
                          ? 'text-orange font-medium' 
                          : 'text-brown hover:text-orange'}
                      `}
                    >
                      {link.label}
                      <motion.span 
                        className={`
                          absolute -bottom-1 left-0 h-0.5 bg-orange
                          ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}
                          transition-all duration-300
                        `}
                      />
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="pt-8 text-sm text-gray-500 dark:text-gray-400"
                >
                  © {currentYear} Empire Books. All rights reserved.
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
