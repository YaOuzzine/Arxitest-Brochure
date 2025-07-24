'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lightbulb, Shield, Users, Target, X, ZoomIn } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';


const DesignPhilosophy: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; description: string } | null>(null);

  const principles = [
    {
      icon: Heart,
      title: 'Beginner-Friendly Approach',
      description: 'No QA expertise required',
      details: [
        'Built-in tutorials and guidance',
        'Template-based test creation',
        'Smart defaults and suggestions',
        'Progressive complexity levels'
      ],
      color: '#EF4444'
    },
    {
      icon: Lightbulb,
      title: 'AI-First Methodology',
      description: 'Intelligence at every step',
      details: [
        'Natural language processing',
        'Context-aware test generation',
        'Continuous learning algorithms',
        'Intelligent error detection'
      ],
      color: '#F59E0B'
    },
    {
      icon: Shield,
      title: 'Enterprise-Grade Reliability',
      description: 'Built for mission-critical applications',
      details: [
        'Containerized isolation',
        'Horizontal scalability',
        '99.9% uptime guarantee',
        'Enterprise security standards'
      ],
      color: '#10B981'
    }
  ];

  const interfaceScreenshots = [
    {
      title: 'Dashboard Overview',
      description: 'Real-time project insights and team analytics',
      image: '/assets/images/Dashboard-Page.PNG'
    },
    {
      title: 'Project Management',
      description: 'Comprehensive project organization and team collaboration',
      image: '/assets/images/Project-View-Page.PNG'
    },
    {
      title: 'AI Test Generation',
      description: 'AI-powered test case creation with intelligent suggestions',
      image: '/assets/images/Test-Case-Creation-AI.PNG'
    },
    {
      title: 'Manual Test Creation',
      description: 'Manual test script creation with syntax highlighting',
      image: '/assets/images/Test-Script-Creation-Manual.PNG'
    },
    {
      title: 'Integration Management',
      description: 'Seamless connectivity with your existing development tools',
      image: '/assets/images/Integration-Management-Page.PNG'
    },
    {
      title: 'Test Suite Organization',
      description: 'Comprehensive test suite management and execution',
      image: '/assets/images/Test-Suite-View-Page.PNG'
    }
  ];

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Subtle overlay elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-20 w-72 h-72 bg-accent/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-effect border border-accent/20 mb-6">
              <Target className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-accent">Design Philosophy</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Accessibility</span> Meets
              <br />
              Intelligence
            </h2>
            
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
              Our design philosophy centers on making sophisticated testing accessible to everyone, 
              from junior developers to enterprise QA teams.
            </p>
          </motion.div>

          {/* Core Principles - Horizontal Layout */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">Core Principles</h3>
              <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                Three fundamental pillars that guide every aspect of our platform design
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={principle.title}
                    variants={itemVariants}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card variant="glass" hover className="group h-full">
                      <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                          <div 
                            className="w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                            style={{ backgroundColor: `${principle.color}20` }}
                          >
                            <Icon className="w-8 h-8" style={{ color: principle.color }} />
                          </div>
                        </div>
                        <CardTitle className="text-xl mb-3">{principle.title}</CardTitle>
                        <CardDescription className="text-base">
                          {principle.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {principle.details.map((detail) => (
                            <div key={detail} className="flex items-center space-x-3 text-sm">
                              <div 
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ backgroundColor: principle.color }}
                              />
                              <span className="text-foreground-muted">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Interface Previews - Full Width Below */}
          <motion.div variants={itemVariants} className="space-y-12">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-foreground mb-4">Interface Previews</h3>
              <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                Get a glimpse of our intuitive interface designed for seamless workflow integration
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interfaceScreenshots.map((screen, index) => (
                <motion.div
                  key={screen.title}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card variant="elevated" hover className="overflow-hidden h-full">
                    <div 
                      className="aspect-video relative overflow-hidden cursor-pointer"
                      onClick={() => setSelectedImage({ 
                        src: screen.image, 
                        title: screen.title, 
                        description: screen.description 
                      })}
                    >
                      {/* Actual Screenshot */}
                      <img 
                        src={screen.image}
                        alt={`${screen.title} - Arxitest Interface`}
                        className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                      />
                      
                      {/* Zoom indicator */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <ZoomIn className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      {/* Overlay with title and description */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="font-bold text-lg text-white mb-1">{screen.title}</h4>
                          <p className="text-sm text-white/90">
                            {screen.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Browser window indicators */}
                      <div className="absolute top-3 left-3 flex space-x-1.5">
                        <div className="w-2.5 h-2.5 bg-red-400 rounded-full" />
                        <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                        <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                      </div>
                    </div>
                    
                    {/* Card content below image */}
                    <div className="p-4">
                      <h4 className="font-semibold text-foreground mb-2">{screen.title}</h4>
                      <p className="text-sm text-foreground-muted">
                        {screen.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Section - Trust Indicators and Team Features */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Trust Indicators */}
              {/* <Card variant="gradient" className="text-center">
                <CardContent className="p-8">
                  <h4 className="text-xl font-bold text-white mb-6">Enterprise Trust</h4>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-white">99.9%</div>
                      <div className="text-sm text-white/80">Uptime SLA</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-white">SOC 2</div>
                      <div className="text-sm text-white/80">Compliant</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-white">24/7</div>
                      <div className="text-sm text-white/80">Support</div>
                    </div>
                  </div>
                </CardContent>
              </Card> */}

              {/* Feature Highlights */}
              <Card variant="glass" className="p-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-lg text-foreground flex items-center space-x-2">
                    <Users className="w-5 h-5 text-accent" />
                    <span>Built for Teams</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>Real-time collaboration</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-secondary rounded-full" />
                        <span>Role-based permissions</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span>Team analytics</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>Shared templates</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm rounded-t-lg">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedImage.title}</h3>
                  <p className="text-sm text-white/80">{selectedImage.description}</p>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 flex items-center justify-center"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Modal Image */}
              <div className="flex-1 relative overflow-hidden rounded-b-lg">
                <img
                  src={selectedImage.src}
                  alt={`${selectedImage.title} - Full Size View`}
                  className="w-full h-full object-contain bg-white/5"
                />
                
                {/* Browser window indicators on modal */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DesignPhilosophy;