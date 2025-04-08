"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, Mail, MapPin, Send } from "lucide-react"
import { ScrollToTopButton } from "@/components/ScrollToTopButton"
import { useRouter } from "next/navigation"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  })
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  // Add useEffect for scrolling to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Refs for scroll-triggered animations
  const heroRef = useRef(null)
  const formRef = useRef(null)
  const mapRef = useRef(null)

  // InView hooks for scroll-triggered animations
  const formInView = useInView(formRef, { once: true, amount: 0.2 })
  const mapInView = useInView(mapRef, { once: true, amount: 0.2 })

  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setFormErrors((prev) => ({
      ...prev,
      [name]: false,
    }))
  }

  const validateForm = () => {
    const errors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email),
      subject: !formData.subject.trim(),
      message: !formData.message.trim(),
    }

    setFormErrors(errors)
    return !Object.values(errors).some((error) => error)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const response = await fetch("https://formspree.io/f/xwppwrdw", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          setSubmitStatus("success")
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          })
        } else {
          setSubmitStatus("error")
        }
      } catch (error) {
        console.error("Error submitting form:", error)
        setSubmitStatus("error")
      }
    } else {
      setSubmitStatus("error")
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
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
      {/* Hero Section with Advanced Animation */}
      <motion.section
        ref={heroRef}
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
            Get In Touch
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Contact <span className="text-orange">Empire Books</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            Have questions or feedback? We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you as
            soon as possible.
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Form Section */}
          <motion.div
            ref={formRef}
            variants={containerVariants}
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
            className="lg:col-span-3"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-[#1a1a1a] p-6 md:p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-800"
            >
              <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6 flex items-center">
                <Mail className="mr-2 text-orange" size={24} />
                Send Us a Message
              </motion.h2>

              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-lg mb-6 border border-green-100 dark:border-green-900/30"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-100 dark:bg-green-800/30 p-1 rounded-full">
                        <svg
                          className="h-5 w-5 text-green-600 dark:text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium">Message sent successfully!</h3>
                        <p className="mt-1 text-xs">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-lg mb-6 border border-red-100 dark:border-red-900/30"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-red-100 dark:bg-red-800/30 p-1 rounded-full">
                        <svg
                          className="h-5 w-5 text-red-600 dark:text-red-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium">There was an error</h3>
                        <p className="mt-1 text-xs">Please check your form and try again.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className={`
                        w-full p-3 rounded-lg border 
                        ${formErrors.name ? "border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-gray-700"}
                        focus:outline-none focus:ring-2 focus:ring-orange
                        bg-gray-50 dark:bg-[#222]
                        text-brown dark:text-white
                        transition duration-200
                      `}
                    />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">Name is required</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className={`
                        w-full p-3 rounded-lg border 
                        ${formErrors.email ? "border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-gray-700"}
                        focus:outline-none focus:ring-2 focus:ring-orange
                        bg-gray-50 dark:bg-[#222]
                        text-brown dark:text-white
                        transition duration-200
                      `}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">Valid email is required</p>}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is this regarding?"
                    className={`
                      w-full p-3 rounded-lg border 
                      ${formErrors.subject ? "border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-gray-700"}
                      focus:outline-none focus:ring-2 focus:ring-orange
                      bg-gray-50 dark:bg-[#222]
                      text-brown dark:text-white
                      transition duration-200
                    `}
                  />
                  {formErrors.subject && <p className="text-red-500 text-xs mt-1">Subject is required</p>}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write your message here..."
                    rows={5}
                    className={`
                      w-full p-3 rounded-lg border 
                      ${formErrors.message ? "border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-gray-700"}
                      focus:outline-none focus:ring-2 focus:ring-orange
                      bg-gray-50 dark:bg-[#222]
                      text-brown dark:text-white
                      transition duration-200
                      resize-none
                    `}
                  />
                  {formErrors.message && <p className="text-red-500 text-xs mt-1">Message is required</p>}
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="
                    w-full bg-orange text-white 
                    py-3 rounded-lg 
                    hover:bg-orange-gold
                    transition duration-300
                    flex items-center justify-center
                    space-x-2
                    shadow-md
                  "
                >
                  <span>Send Message</span>
                  <Send size={18} />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Info and Map Section */}
          <div className="lg:col-span-2">
            {/* Map Section */}
            <motion.div
              ref={mapRef}
              variants={containerVariants}
              initial="hidden"
              animate={mapInView ? "visible" : "hidden"}
            >
              <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800"
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <MapPin className="mr-2 text-orange" size={24} />
                  Find Us Here
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Visit our office or contact us through the information provided in the footer below.
                </p>
                <div className="rounded-lg overflow-hidden h-[400px] border border-gray-200 dark:border-gray-700">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.8040809207805!2d3.372770474375716!3d6.671182021430816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b95e8e0d67c17%3A0xc95abd6884bcc664!2sEmpire%20Books%20Concept%20Limited!5e0!3m2!1sen!2sng!4v1736148232138!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* FAQ Link Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mt-16 mb-8 max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-orange/10 via-orange/20 to-orange/10 dark:from-orange/20 dark:via-orange/30 dark:to-orange/20 rounded-2xl p-8 shadow-sm">
            <motion.div
              variants={itemVariants}
              className="bg-orange/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <ArrowRight size={24} className="text-orange" />
            </motion.div>

            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-4">
              Have More Questions?
            </motion.h3>

            <motion.p variants={itemVariants} className="text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto">
              Check out our frequently asked questions page for quick answers to common inquiries about our books and
              services.
            </motion.p>

            <motion.div variants={itemVariants}>
              <button
                onClick={() => router.push("/faqs")}
                className="
                  inline-flex items-center justify-center
                  bg-orange text-white
                  px-6 py-3 rounded-lg
                  hover:bg-orange/90
                  transition duration-300
                  space-x-2 shadow-md
                "
              >
                <span>View FAQs</span>
                <ArrowRight size={20} />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <ScrollToTopButton />
    </div>
  )
}

export default ContactPage
