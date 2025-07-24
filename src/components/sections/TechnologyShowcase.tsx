'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Database, Shield, Zap, Link, Globe, Layers, Server, Lock, TestTube, Cpu, BarChart3, Container } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { AI_PROVIDERS, TECH_STACK, INTEGRATIONS } from '@/lib/constants';

const TechnologyShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ai' | 'stack' | 'integrations'>('ai');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const tabVariants = {
    inactive: { scale: 1, opacity: 0.7 },
    active: { scale: 1.05, opacity: 1 }
  };

  const tabs = [
    { id: 'ai' as const, label: 'AI-First Architecture', icon: Brain, color: '#8B5CF6' },
    { id: 'stack' as const, label: 'Modern Tech Stack', icon: Code, color: '#2196F3' },
    { id: 'integrations' as const, label: 'Deep Integrations', icon: Link, color: '#4CAF50' }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Subtle overlay elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-effect border border-primary/20 mb-6">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by Innovation</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Technology</span> That Powers
              <br />
              The Future of Testing
            </h2>
            
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
              Built on cutting-edge technologies and powered by multiple AI providers, 
              Arxitest delivers enterprise-grade testing capabilities with unprecedented intelligence.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  variants={tabVariants}
                  animate={activeTab === tab.id ? 'active' : 'inactive'}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'glass-effect border-2 text-foreground'
                      : 'border border-border hover:border-primary/30 text-foreground-muted hover:text-foreground'
                  }`}
                  style={{ borderColor: activeTab === tab.id ? tab.color : undefined }}
                >
                  <Icon 
                    className="w-6 h-6" 
                    style={{ color: activeTab === tab.id ? tab.color : undefined }}
                  />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Content Sections */}
          <div className="relative">
            {/* AI Providers Section */}
            {activeTab === 'ai' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold mb-4 text-foreground">
                    Multi-Provider AI Intelligence
                  </h3>
                  <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                    Harness the power of multiple AI providers for intelligent test generation, 
                    analysis, and optimization tailored to your specific needs.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {AI_PROVIDERS.map((provider, index) => (
                    <motion.div
                      key={provider.name}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card variant="glass" hover glow className="h-full">
                        <CardHeader>
                          <div className="flex items-center space-x-4 mb-4">
                            <div 
                              className="w-12 h-12 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${provider.color}20` }}
                            >
                              {provider.logo.startsWith('/assets/') ? (
                                <img 
                                  src={provider.logo} 
                                  alt={`${provider.name} logo`}
                                  className="w-8 h-8 object-contain"
                                />
                              ) : provider.logo === 'Server' ? (
                                <Server className="w-6 h-6" style={{ color: provider.color }} />
                              ) : (
                                (() => {
                                  const iconMap = {
                                    'Brain': Brain,
                                    'Cpu': Cpu,
                                    'Zap': Zap,
                                    'Layers': Layers
                                  };
                                  const IconComponent = iconMap[provider.logo as keyof typeof iconMap] || Brain;
                                  return <IconComponent className="w-6 h-6" style={{ color: provider.color }} />;
                                })()
                              )}
                            </div>
                            <div>
                              <CardTitle className="text-xl">{provider.name}</CardTitle>
                              <div className="flex items-center space-x-2 mt-1">
                                <div 
                                  className="w-2 h-2 rounded-full animate-pulse"
                                  style={{ backgroundColor: provider.color }}
                                />
                                <span className="text-sm text-foreground-muted">Active</span>
                              </div>
                            </div>
                          </div>
                          <CardDescription className="text-base leading-relaxed">
                            {provider.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm text-foreground-muted mb-3">
                              Key Capabilities
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              {provider.capabilities.map((capability) => (
                                <div 
                                  key={capability}
                                  className="flex items-center space-x-2 text-sm"
                                >
                                  <Shield className="w-3 h-3 text-accent" />
                                  <span>{capability}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tech Stack Section */}
            {activeTab === 'stack' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                {TECH_STACK.map((category, categoryIndex) => (
                  <div key={category.category} className="space-y-6">
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: categoryIndex * 0.2 }}
                      className="text-center"
                    >
                      <h3 className="text-2xl font-bold mb-2 text-foreground">
                        {category.category}
                      </h3>
                      <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {category.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={tech.name}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: (categoryIndex * 0.2) + (techIndex * 0.1) }}
                        >
                          <Card variant="elevated" hover className="h-full">
                            <CardContent className="p-6">
                              <div className="text-center space-y-4">
                                <div 
                                  className="w-16 h-16 rounded-xl mx-auto flex items-center justify-center"
                                  style={{ backgroundColor: `${tech.color}20` }}
                                >
                                  {tech.icon.startsWith('https://') ? (
                                    <img 
                                      src={tech.icon} 
                                      alt={`${tech.name} logo`}
                                      className="w-10 h-10 object-contain"
                                    />
                                  ) : (
                                    (() => {
                                      const iconMap = {
                                        'Layers': Layers,
                                        'Zap': Zap,
                                        'BarChart3': BarChart3,
                                        'Code': Code,
                                        'Globe': Globe,
                                        'Database': Database,
                                        'Container': Container,
                                        'Lock': Lock,
                                        'TestTube': TestTube,
                                        'Brain': Brain
                                      };
                                      const IconComponent = iconMap[tech.icon as keyof typeof iconMap] || Database;
                                      return <IconComponent className="w-8 h-8" style={{ color: tech.color }} />;
                                    })()
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-bold text-lg mb-2">{tech.name}</h4>
                                  <p className="text-sm text-foreground-muted leading-relaxed">
                                    {tech.description}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Integrations Section */}
            {activeTab === 'integrations' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold mb-4 text-foreground">
                    Seamless Tool Integration
                  </h3>
                  <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                    Connect with your existing workflow tools through our OAuth-based integration 
                    framework for complete project synchronization.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {INTEGRATIONS.map((integration, index) => (
                    <motion.div
                      key={integration.name}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.2 }}
                    >
                      <Card variant="glass" hover glow className="h-full relative overflow-hidden">
                        {integration.isNew && (
                          <div className="absolute top-4 right-4">
                            <span className="px-2 py-1 text-xs font-bold bg-accent text-background rounded-full">
                              NEW
                            </span>
                          </div>
                        )}
                        
                        <CardHeader>
                          <div className="flex items-center space-x-4 mb-4">
                            <div 
                              className="w-14 h-14 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${integration.color}20` }}
                            >
                              {integration.logo.startsWith('/assets/') ? (
                                <img 
                                  src={integration.logo} 
                                  alt={`${integration.name} logo`}
                                  className="w-8 h-8 object-contain"
                                />
                              ) : (
                                (() => {
                                  const iconMap = {
                                    'Layers': Layers,
                                    'Code': Code,
                                    'Server': Server
                                  };
                                  const IconComponent = iconMap[integration.logo as keyof typeof iconMap] || Link;
                                  return <IconComponent className="w-7 h-7" style={{ color: integration.color }} />;
                                })()
                              )}
                            </div>
                            <div>
                              <CardTitle className="text-xl">{integration.name}</CardTitle>
                              <div className="flex items-center space-x-2 mt-1">
                                <div 
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: integration.color }}
                                />
                                <span className="text-sm text-foreground-muted">OAuth 2.0</span>
                              </div>
                            </div>
                          </div>
                          <CardDescription className="text-base leading-relaxed">
                            {integration.description}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent>
                          <div className="space-y-3">
                            <h4 className="font-semibold text-sm text-foreground-muted">
                              Integration Features
                            </h4>
                            <div className="space-y-2">
                              {integration.features.map((feature) => (
                                <div 
                                  key={feature}
                                  className="flex items-start space-x-2 text-sm"
                                >
                                  <div 
                                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                    style={{ backgroundColor: integration.color }}
                                  />
                                  <span className="leading-relaxed">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;