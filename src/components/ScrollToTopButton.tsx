import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

export const ScrollToTopButton = () => {
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