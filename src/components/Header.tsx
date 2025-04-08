"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "@/context/ThemeContext"
import Image from "next/image"
import { usePathname } from "next/navigation"

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isScrolledFurther, setIsScrolledFurther] = useState(false)
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()

  // Track scroll position to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      setIsScrolledFurther(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "unset"
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/books", label: "Books and Publications" },
    { href: "/contact", label: "Contact Us" },
    { href: "/faqs", label: "FAQs" },
  ]

  // Find current page for mobile display
  const currentPage = navLinks.find(link => link.href === pathname)?.label || "Home"

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "pt-2" : "bg-white dark:bg-[#121212] shadow-lg py-3"
      }`}
    >
      {/* This is the floating container that appears when scrolled */}
      {isScrolledFurther && (
        <div className="w-full flex justify-center">
          <div className="w-[70%] bg-white/95 dark:bg-[#121212]/95 backdrop-blur-sm shadow-lg rounded-full px-8 py-3 transition-all duration-500">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 md:flex-1">
                <div className="relative">
                  <Image
                    src="/em.png"
                    alt="Empire Books Logo"
                    width={70}
                    height={35}
                    priority
                    className="object-contain h-12 w-auto"
                  />
                </div>
                <div className="hidden xs:block">
                  <h1 className="text-lg font-bold">
                    <span className="text-orange">Empire</span>{" "}
                    <span className="text-brown dark:text-white">Books</span>
                  </h1>
                </div>
              </Link>

              {/* Current Page Name (Mobile Only) */}
              <div className="md:hidden flex-1 text-center">
                <h2 className="text-orange font-medium truncate">{currentPage}</h2>
              </div>

              {/* Desktop Navigation - Compact */}
              <nav className="hidden md:flex items-center">
                <ul className="flex space-x-2">
                  {navLinks.map((link) => (
                    <motion.li key={link.href} className="relative">
                      <Link
                        href={link.href}
                        className={`
                          relative px-4 py-2 rounded-md block text-sm font-medium
                          transition-all duration-300
                          ${
                            pathname === link.href
                              ? "text-orange"
                              : "text-brown dark:text-white hover:text-orange dark:hover:text-orange"
                          }
                        `}
                      >
                        <span className="relative z-10">{link.label}</span>

                        {/* Active indicator */}
                        {pathname === link.href && (
                          <motion.span
                            layoutId="floatingActiveIndicator"
                            className="absolute inset-0 bg-orange/10 dark:bg-orange/20 rounded-md -z-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center gap-3 md:flex-1 md:justify-end">
                {/* Theme Toggle */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-orange/10 dark:hover:bg-orange/20 transition-colors duration-300"
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </motion.button>

                {/* Mobile Menu Button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMobileMenu}
                  className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-orange/10 dark:hover:bg-orange/20 transition-colors duration-300"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* This is the original header that shows when at the top */}
      {!isScrolledFurther && (
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Mobile-Centered Logo Text */}
            <div className="w-full absolute left-0 top-0 sm:hidden flex justify-center items-center h-full pointer-events-none">
              <h1 className="text-lg font-bold">
                <span className="text-orange">Empire</span>{" "}
                <span className="text-brown dark:text-white">Books</span>
              </h1>
            </div>
            
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <Link href="/" className="flex items-center gap-3">
                <div className="relative overflow-hidden rounded-md">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                    <Image
                      src="/em.png"
                      alt="Empire Books Logo"
                      width={80}
                      height={40}
                      priority
                      className="object-contain h-12 w-auto transition-all duration-300"
                    />
                  </motion.div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold">
                    <span className="text-orange">Empire</span>{" "}
                    <span className="text-brown dark:text-white">Books</span>
                  </h1>
                  <p className="text-xs text-brown/70 dark:text-white/70">Quality Educational Textbooks</p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              <ul className="flex space-x-1">
                {navLinks.map((link) => (
                  <motion.li key={link.href} className="relative">
                    <Link
                      href={link.href}
                      className={`
                        relative px-4 py-2 rounded-md block text-sm font-medium
                        transition-all duration-300
                        ${
                          pathname === link.href
                            ? "text-orange"
                            : "text-brown dark:text-white hover:text-orange dark:hover:text-orange"
                        }
                      `}
                    >
                      <span className="relative z-10">{link.label}</span>

                      {/* Active indicator only */}
                      {pathname === link.href && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          className="absolute inset-0 bg-orange/10 dark:bg-orange/20 rounded-md -z-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-orange/10 dark:hover:bg-orange/20 transition-colors duration-300"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDarkMode ? "dark" : "light"}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-orange/10 dark:hover:bg-orange/20 transition-colors duration-300"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMobileMenuOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 5rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-[4.5rem] bg-white dark:bg-[#121212] z-40 overflow-hidden"
          >
            <div className="container mx-auto px-4 h-full flex flex-col">
              <motion.nav
                className="flex-1 flex flex-col justify-center items-center py-8 space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full max-w-xs"
                  >
                    <Link
                      href={link.href}
                      onClick={toggleMobileMenu}
                      className={`
                        relative block text-center py-3 px-6 rounded-lg text-lg font-medium
                        transition-all duration-300
                        ${
                          pathname === link.href
                            ? "text-orange bg-orange/10 dark:bg-orange/20"
                            : "text-brown dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                        }
                      `}
                    >
                      {link.label}

                      {pathname === link.href && (
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-orange rounded-r-md"
                          layoutId="mobileActiveIndicator"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800"
              >
                <div className="flex justify-center items-center gap-2 mb-2">
                  <Image
                    src="/em.png"
                    alt="Empire Books Logo"
                    width={30}
                    height={15}
                    className="object-contain h-6 w-auto"
                  />
                  <span className="font-medium">Empire Books</span>
                </div>
                <p>© {currentYear} All rights reserved.</p>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange/5 dark:bg-orange/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange/5 dark:bg-orange/10 rounded-full blur-3xl pointer-events-none"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header