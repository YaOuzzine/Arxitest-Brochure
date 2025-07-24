'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import TypewriterText from '@/components/animations/TypewriterText';
import ArxitestLogo from '@/assets/images/logo-icon-w.png';



const HeroSection: React.FC = () => {
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setShowTypewriter(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFeatures = () => {
    const featuresElement = document.getElementById('features');
    if (featuresElement) {
      const targetPosition = featuresElement.offsetTop - 80; // Account for any fixed headers
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1200; // 1.2 seconds for smoother scroll
      let start: number | null = null;

      const smoothScroll = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const progressPercentage = Math.min(progress / duration, 1);
        
        // Easing function for smooth deceleration
        const ease = 1 - Math.pow(1 - progressPercentage, 3);
        
        window.scrollTo(0, startPosition + (distance * ease));
        
        if (progress < duration) {
          requestAnimationFrame(smoothScroll);
        }
      };
      
      requestAnimationFrame(smoothScroll);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Interactive Mouse Spotlight */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 102, 255, 0.15) 0%, transparent 50%)`
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="mb-8">
              <img
                src={ArxitestLogo.src}
                alt="Arxitest Logo"
                className="px-80 py-3 h-35 w-auto object-contain"
              />
          </motion.div>

          {/* Main Headlines */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-foreground">Welcome to the</span>
              <span className="block gradient-text">Future of Software Testing</span>
            </h1>
            
            <div className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground-muted min-h-[3rem]">
              {showTypewriter && (
                <TypewriterText 
                  text="Arxitest - Where AI Meets Quality Assurance"
                  delay={80}
                />
              )}
            </div>
          </motion.div>

          {/* Value Proposition */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg md:text-xl text-foreground-muted leading-relaxed">
              Currently in development - The world&apos;s first truly intelligent test automation platform 
              that makes enterprise-grade QA accessible to any team, regardless of testing expertise.
            </p>
            
            <div className="glass-effect rounded-2xl p-6 border border-primary/20">
              <p className="text-base md:text-lg font-medium text-foreground">
                <span className="text-accent">Transforming</span> software testing from a bottleneck 
                into a <span className="text-primary">competitive advantage</span> through artificial intelligence, 
                containerization, and seamless integrations.
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="gradient"
              size="xl"
              onClick={scrollToFeatures}
              icon={<Rocket className="w-6 h-6" />}
              className="min-w-[200px]"
            >
              Explore the Future
            </Button>
            
            <Button
              variant="outline"
              size="xl"
              onClick={scrollToDemo}
              className="min-w-[200px]"
            >
              Skip to Demo
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={itemVariants} className="pt-8">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-foreground-muted">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>Enterprise-Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                <span>No Code Required</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.button
          onClick={scrollToFeatures}
          className="flex flex-col items-center space-y-2 text-foreground-muted hover:text-primary transition-colors duration-300"
          aria-label="Scroll to features"
          whileHover={{ 
            y: 8, 
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm font-medium">Discover More</span>
          <motion.div
            whileHover={{ 
              y: 4,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;