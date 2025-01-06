'use client'
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-[#121212]/80"
    >
      <div className="relative flex flex-col items-center">
        {/* Ultra-Fast Spinner */}
        <motion.div 
          className="relative w-12 h-12"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 0.6, 
            repeat: Infinity, 
            ease: "linear"
          }}
        >
          <motion.span 
            className="absolute inset-0 rounded-full border-2 border-t-orange border-r-transparent border-b-transparent border-l-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;