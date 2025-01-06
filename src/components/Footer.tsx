'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/books', label: 'Books and Publications' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/faqs', label: 'FAQs' }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const linkVariants = {
    hover: {
      x: 10,
      color: "#FFA500",
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-[#FAF3E0] dark:bg-[#121212] text-brown dark:text-[#F5DEB3] py-12 border-t dark:border-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 text-brown dark:text-white">
              Contact Us
            </h3>
            <div className="space-y-3">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="text-orange" size={20} />
                <p>Empire Books Concept Ltd., Lagos, Nigeria</p>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone className="text-orange" size={20} />
                <Link href="tel:+2347033417826" className="hover:text-orange transition-colors">
                  +234 0703 341 7826
                </Link>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="text-orange" 
                  width="20" 
                  height="20" 
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <Link 
                  href="https://wa.me/2349012075486" 
                  target="_blank"
                  className="hover:text-orange transition-colors"
                >
                  +234 0901 207 5486
                </Link>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="text-orange" size={20} />
                <Link href="mailto:empirebooksconcept@gmail.com" className="hover:text-orange transition-colors">
                empirebooksconcept@gmail.com
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 text-brown dark:text-white">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  whileHover="hover"
                  variants={linkVariants}
                >
                  <Link 
                    href={link.href} 
                    className="text-brown dark:text-[#F5DEB3] text-sm"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 text-brown dark:text-white">
              Stay Updated
            </h3>
            {!subscribed ? (
              <motion.form 
                onSubmit={handleSubscribe} 
                className="space-y-3"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                />
                <motion.button 
                  type="submit" 
                  className="w-full flex items-center justify-center bg-orange text-white px-4 py-2 rounded-lg space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Subscribe</span>
                </motion.button>
              </motion.form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg text-center"
              >
                Thank you for subscribing!
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Developer Credit */}
        <motion.div 
          variants={itemVariants}
          className="mt-4 text-center text-sm text-brown/70 dark:text-[#F5DEB3]/70"
        >
          Developed by{' '}
          <Link 
            href="https://ukohgodwingeorge-portfolio.vercel.app/" 
            target="_blank" 
            className="font-semibold hover:text-orange transition-colors"
          >
            Ukoh Godwin George
          </Link>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          variants={itemVariants}
          className="mt-4 pt-6 text-center border-t dark:border-gray-800 text-sm text-brown/70 dark:text-[#F5DEB3]/70"
        >
          © {new Date().getFullYear()} Empire Books Concept Ltd. All Rights Reserved.
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;