'use client';

import { motion, Variants } from 'framer-motion';
import { 
  Brain, 
  Container, 
  Link, 
  BarChart3, 
  Users, 
  Shield, 
  Settings,
  Zap,
  Database,
  Cloud,
  Cpu,
  Globe,
  TestTube
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { CORE_FEATURES } from '@/lib/constants';

const CoreFunctionalities: React.FC = () => {

  const getIcon = (iconName: string) => {
    const icons = {
      Brain,
      Container,
      Link,
      BarChart3,
      Users,
      Shield,
      Settings,
      Zap,
      Database,
      Cloud,
      Cpu,
      Globe,
      TestTube
    };
    return icons[iconName as keyof typeof icons] || Brain;
  };


  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };


  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Subtle overlay elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-secondary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            delayChildren: 0.3,
            staggerChildren: 0.1
          }}
        >
          {/* Section Header */}
          <motion.div 
            variants={itemVariants} 
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-effect border border-secondary/20 mb-6">
              <Zap className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-secondary">Core Functionalities</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              What Makes Us <span className="gradient-text">Different</span>
            </h2>
            
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
              Comprehensive modules designed to transform every aspect of your testing workflow, 
              from project management to execution and analysis.
            </p>
          </motion.div>

          {/* Core Features Grid */}
          <motion.div 
            variants={itemVariants} 
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CORE_FEATURES.map((feature, index) => {
                const Icon = getIcon(feature.icon);
                return (
                  <motion.div
                    key={feature.title}
                    variants={itemVariants}
                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                  >
                    <Card variant="glass" hover glow className="h-full group">
                      <CardHeader>
                        <div className="flex items-center space-x-4 mb-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                            style={{ backgroundColor: `${feature.color}20` }}
                          >
                            <Icon className="w-6 h-6" style={{ color: feature.color }} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{feature.title}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <div 
                                className="w-2 h-2 rounded-full animate-pulse"
                                style={{ backgroundColor: feature.color }}
                              />
                              <span className="text-xs text-foreground-muted">Active</span>
                            </div>
                          </div>
                        </div>
                        <CardDescription className="text-base leading-relaxed">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default CoreFunctionalities;