import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResumeProvider } from './contexts/ResumeContext';
import { ResumeForm } from './ResumeForm';
import { ResumePreview } from './ResumePreview';
import { Toaster } from 'react-hot-toast';

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-white via-blue-50 to-blue-300 flex items-center justify-center z-50"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main loading animation */}
      <div className="text-center z-10">
        <motion.div
          className="relative mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-20 h-20 border-4 border-white/100 border-t-gray-800 rounded-full mx-auto" />
        </motion.div>
        
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Resume Builder
        </motion.h2>
        
        <motion.p
          className="text-gray/80 text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Craft your professional story...
        </motion.p>
        
        {/* Loading progress bar */}
        <motion.div
          className="w-64 h-1 bg-white/20 rounded-full mx-auto mt-6 overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: 256 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-50 to-gray-700 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, delay: 1.2 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const UnsupportedScreen: React.FC = () => {
  return (
    <div className="lg:hidden relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-blue-200/40 to-white/30 backdrop-blur-sm shadow-lg"
            style={{
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 100 + 50 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-15">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#dbeafe" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-100/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 via-transparent to-white/40" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-md"
        >
          {/* Icon container */}
          <motion.div
            className="relative mb-8 mx-auto w-32 h-32"
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl border border-blue-100"
              animate={{
                boxShadow: [
                  '0 25px 50px -12px rgba(59, 130, 246, 0.2)',
                  '0 25px 50px -12px rgba(147, 197, 253, 0.4)',
                  '0 25px 50px -12px rgba(59, 130, 246, 0.2)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-blue-600">
              <motion.svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </div>
          </motion.div>

          {/* Title with stagger animation */}
          <motion.h1
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Desktop Required
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-blue-700/80 text-lg md:text-xl leading-relaxed mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Our premium resume builder is optimized for desktop and laptop screens to provide the best editing experience.
          </motion.p>

          {/* Feature list */}
          <motion.div
            className="space-y-4 mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {[
              'Real-time preview',
              'Advanced formatting',
              'Professional templates',
              'Export options'
            ].map((feature, index) => (
              <motion.div
                key={feature}
                className="flex items-center justify-center text-blue-600/90 font-medium"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <motion.div
                  className="w-2 h-2 bg-blue-400 rounded-full mr-3"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />
                {feature}
              </motion.div>
            ))}
          </motion.div>

          
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-1 h-16 bg-gradient-to-b from-transparent via-blue-300/60 to-transparent rounded-full"
            animate={{ scaleY: [1, 1.5, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

   return (
    <ResumeProvider>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-100 font-sans"
          >
            {/* Main application for larger screens */}
            <div className="hidden lg:flex h-screen">
              <Toaster position="top-center" reverseOrder={false} />
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-1/2 border-r border-gray-300 bg-gray-50 overflow-hidden"
              >
                <ResumeForm />
              </motion.div>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-1/2 overflow-hidden"
              >
                <ResumePreview />
              </motion.div>
            </div>

            {/* Unsupported screen message for smaller screens */}
            <UnsupportedScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </ResumeProvider>
  );
};

export default App;