'use client'
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Star, BookText } from 'lucide-react';
import { ScrollToTopButton } from './ScrollToTopButton';

// Team members data
const teamMembers = [
  {
    name: 'Ronke Aina',
    role: 'CEO and Managing Director',
    description: 'With a passion for education and decades of experience, Ronke leads Empire Books to publish materials that transform learning experiences.',
    image: '/sig.png'
  },
  {
    name: 'Kunle Odunji',
    role: 'General Manager',
    description: 'Kunle oversees our strategic operations and drives innovation in educational publishing through effective team leadership.',
    image: '/kunle.jpg'
  },
  {
    name: 'Patricia Nkechi',
    role: 'Editorial Manager',
    description: 'Patricia leads our content development team, ensuring all publications meet the highest educational standards and curriculum requirements.',
    image: '/pat.jpg'
  },
  {
    name: 'Olaniyan Segun',
    role: 'Graphics Designer',
    description: 'Segun leads our design team in creating visually engaging and effective educational materials.',
    image: '/segun.jpg'
  }
];

// Timeline data
const timeline = [
  {
    year: 2023,
    title: 'Company Foundation & First Book Series Launch',
    description: 'Empire Books Concept Ltd. was founded by Ronke Aina, with a vision to revolutionise educational publishing in Nigeria. In the same year, we successfully launched our first series of preschool and pre-primary textbooks.'
  },
  {
    year: 2024,
    title: 'Second Series Launch',
    description: 'Successfully launched a second batch of more preschool and pre-primary textbooks.'
  },
  {
    year: 2025,
    title: 'Expanding Horizons',
    description: 'Release of new series for primary schools and expanded distribution network.'
  }
];

// Rest of the component remains the same
const AboutPage = () => {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);
  const timelineRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const aboutInView = useInView(aboutRef, { once: true });
  const missionInView = useInView(missionRef, { once: true });
  const teamInView = useInView(teamRef, { once: true });
  const timelineInView = useInView(timelineRef, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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
        damping: 12,
        stiffness: 100
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Cleanup
    return () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);


  return (
    <div className="bg-white dark:bg-[#121212] overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={heroInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, type: 'spring' }}
        className="relative min-h-[60vh] flex items-center justify-center "
      >
        <div className="absolute inset-0">
          <Image
            src="/lib.jpg"
            alt="Library Background"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-brown/40 dark:bg-brown/60" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Discover the Heart of <span className="text-orange">Empire Books</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Publishing quality educational materials for the next generation
          </p>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              href="/books"
              className="inline-flex items-center space-x-2 bg-orange hover:bg-orange/90 text-white px-6 py-3 rounded-lg transition duration-300"
            >
              <BookOpen size={20} />
              <span>Explore Our Books</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        ref={aboutRef}
        initial={{ opacity: 0, x: -100 }}
        animate={aboutInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gray-50 dark:bg-[#1a1a1a]"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={aboutInView ? "visible" : "hidden"}
              className="space-y-6"
            >
              <motion.h2 
                variants={itemVariants}
                className="text-3xl font-bold text-brown dark:text-white"
              >
                About Empire Books
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-gray-700 dark:text-gray-300"
              >
                Founded in 2023, Empire Books Concept Ltd. is a pioneering book publishing company 
                based in Nigeria. We specialise in creating high-quality textbooks for preschool, 
                pre-primary, and primary students, helping schools and parents shape the future 
                of education.
              </motion.p>
              <motion.p 
                variants={itemVariants}
                className="text-gray-700 dark:text-gray-300"
              >
                Our founder and CEO, Ronke Aina, brings years of experience as an educational consultant, ensuring that every textbook meets the academic needs of schools and 
                students alike.
              </motion.p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={aboutInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, type: 'spring' }}
              className="relative h-96"
            >
              <Image
                src="/111.png"
                alt="Empire Books Collection"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission and Vision */}
      <motion.section 
        ref={missionRef}
        initial={{ opacity: 0, y: 100 }}
        animate={missionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={missionInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-8"
          >
            {[
              { 
                icon: <Star className="text-orange" size={32} />, 
                title: 'Our Mission',
                description: 'To research, develop and deliver innovative teaching resources that engage students, support educators and promote academic excellence.'
              },
              { 
                icon: <BookText className="text-orange" size={32} />, 
                title: 'Our Vision', 
                description: 'To be the leading knowledge-based company that provides qualitative resources for learning which engage, enrich and enlighten young minds.'
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-[#2a2a2a] p-8 rounded-lg shadow-lg"
              >
                <div className="flex items-center space-x-4 mb-6">
                  {item.icon}
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        ref={teamRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={teamInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gray-50 dark:bg-[#1a1a1a]"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: -50 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Our Team
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotate: 2,
                  transition: { duration: 0.3 }
                }}
                className="bg-white dark:bg-[#2a2a2a] rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-96">
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-orange mb-4">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section 
        ref={timelineRef}
        initial={{ opacity: 0, x: 100 }}
        animate={timelineInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: -50 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Our Journey
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={timelineInView ? "visible" : "hidden"}
            className="relative"
          >
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="mb-8 flex flex-col md:flex-row items-center md:items-start"
              >
                <div className="flex-none w-24 text-center">
                  <span className="inline-block bg-orange text-white px-4 py-2 rounded">
                    {item.year}
                  </span>
                </div>
                <div className="flex-grow md:ml-8 mt-4 md:mt-0">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-[#2a2a2a] p-6 rounded-lg shadow"
                  >
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      <ScrollToTopButton/>
    </div>
  );
};

export default AboutPage;