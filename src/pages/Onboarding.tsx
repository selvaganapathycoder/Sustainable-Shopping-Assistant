import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { Scan, ShieldCheck, Leaf } from 'lucide-react';

const slides = [
  {
    icon: Scan,
    title: "Scan products instantly",
    description: "Simply point your camera at any product barcode to see its environmental impact.",
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
  },
  {
    icon: ShieldCheck,
    title: "Understand eco impact",
    description: "Get detailed insights into carbon footprint, plastic usage, and ethical sourcing.",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
  },
  {
    icon: Leaf,
    title: "Choose greener alternatives",
    description: "Discover better products for the planet and track your sustainability journey.",
    color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
  }
];

const Onboarding: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (current === slides.length - 1) {
      localStorage.setItem('ecoscan_onboarded', 'true');
      navigate('/');
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <div className="h-screen flex flex-col items-stretch overflow-hidden bg-background">
      <div className="flex-1 relative flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-col items-center text-center"
          >
            <div className={`w-32 h-32 rounded-3xl ${slides[current].color} flex items-center justify-center mb-8 shadow-xl`}>
              {React.createElement(slides[current].icon, { size: 48 })}
            </div>
            <h2 className="text-3xl font-extrabold text-text dark:text-white mb-4">
              {slides[current].title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 line-clamp-3 text-lg leading-relaxed">
              {slides[current].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8 pb-12">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 transition-all duration-300 rounded-full ${i === current ? 'w-8 bg-primary' : 'w-2 bg-gray-200 dark:bg-gray-700'}`}
            />
          ))}
        </div>
        <Button size="lg" className="w-full h-16" onClick={handleNext}>
          {current === slides.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
