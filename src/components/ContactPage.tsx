'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollToTopButton } from './ScrollToTopButton';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Add useEffect for scrolling to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Refs for scroll-triggered animations
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const mapRef = useRef(null);

  // InView hooks for scroll-triggered animations
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const formInView = useInView(formRef, { once: true, amount: 0.2 });
  const mapInView = useInView(mapRef, { once: true, amount: 0.2 });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setFormErrors(prev => ({
      ...prev,
      [name]: false
    }));
  };

  const validateForm = () => {
    const errors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email),
      subject: !formData.subject.trim(),
      message: !formData.message.trim()
    };

    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('https://formspree.io/f/xwppwrdw', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setSubmitStatus('success');
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
        } else {
          setSubmitStatus('error');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus('error');
      }
    } else {
      setSubmitStatus('error');
    }
  };

  // Animation variants remain the same
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-[#121212] min-h-screen py-8 md:py-16"
    >
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        variants={containerVariants}
        animate={heroInView ? "visible" : "hidden"}
        className="container mx-auto px-4 mb-8 md:mb-16 text-center"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-3xl md:text-5xl text-brown dark:text-white font-bold mb-4"
        >
          Get in Touch with <span className="text-orange">Empire Books</span>
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Have a question or feedback? We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you as soon as possible.
        </motion.p>
      </motion.section>

      {/* Contact Form Section */}
      <motion.div 
        ref={formRef}
        variants={containerVariants}
        animate={formInView ? "visible" : "hidden"}
        className="container mx-auto px-4 max-w-2xl"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-gray-50 dark:bg-[#1a1a1a] p-6 md:p-8 rounded-lg shadow-md"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-xl md:text-2xl text-brown dark:text-white mb-6"
          >
            Send Us a Message
          </motion.h2>
          
          {submitStatus === 'success' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-green-100 text-green-800 p-4 rounded-lg mb-4"
            >
              Thank you for reaching out! We will get back to you shortly.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-red-100 text-red-800 p-4 rounded-lg mb-4"
            >
              There was an error sending your message. Please try again later.
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form inputs remain the same */}
            {['name', 'email', 'subject', 'message'].map((field) => (
              <motion.div 
                key={field}
                variants={itemVariants}
              >
                <label 
                  htmlFor={field} 
                  className="block text-brown dark:text-white mb-2"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {field !== 'message' ? (
                  <motion.input 
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleInputChange}
                    placeholder={`Enter your ${field}`}
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 0 0 3px rgba(255, 165, 0, 0.5)"
                    }}
                    className={`
                      w-full p-3 rounded-lg border 
                      ${formErrors[field as keyof typeof formErrors] 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-gray-600'}
                      focus:outline-none focus:ring-2 focus:ring-orange
                      bg-white dark:bg-[#2a2a2a]
                      text-brown dark:text-white
                    `}
                  />
                ) : (
                  <motion.textarea 
                    id={field}
                    name={field}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write your message here"
                    rows={5}
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 0 0 3px rgba(255, 165, 0, 0.5)"
                    }}
                    className={`
                      w-full p-3 rounded-lg border 
                      ${formErrors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'}
                      focus:outline-none focus:ring-2 focus:ring-orange
                      bg-white dark:bg-[#2a2a2a]
                      text-brown dark:text-white
                    `}
                  />
                )}
                {formErrors[field as keyof typeof formErrors] && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {field} is required
                  </motion.p>
                )}
              </motion.div>
            ))}

            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit" 
              className="
                w-full bg-orange text-white 
                py-3 rounded-lg 
                hover:bg-orange/90 
                transition duration-300
                flex items-center justify-center
                space-x-2
              "
            >
              <span>Send Message</span>
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      {/* Map Section */}
      <motion.section 
        ref={mapRef}
        variants={containerVariants}
        animate={mapInView ? "visible" : "hidden"}
        className="container mx-auto px-4 mt-8 md:mt-16"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-xl md:text-2xl text-brown dark:text-white mb-6 text-center"
        >
          Find Us Here
        </motion.h2>
        <motion.div 
          variants={itemVariants}
          className="bg-gray-100 dark:bg-[#1a1a1a] rounded-lg overflow-hidden h-64 md:h-96"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.8040809207805!2d3.372770474375716!3d6.671182021430816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b95e8e0d67c17%3A0xc95abd6884bcc664!2sEmpire%20Books%20Concept%20Limited!5e0!3m2!1sen!2sng!4v1736148232138!5m2!1sen!2sng"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </motion.section>
      <ScrollToTopButton/>
    </motion.div>
  );
};

export default ContactPage;