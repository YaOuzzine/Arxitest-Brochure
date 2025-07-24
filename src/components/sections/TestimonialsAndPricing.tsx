'use client';

import { motion } from 'framer-motion';
import { 
  Star, 
  Quote, 
  Heart,
  Award
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { TESTIMONIALS } from '@/lib/constants';

const Testimonials: React.FC = () => {

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

  return (
    <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/3 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-effect border border-accent/20 mb-6">
                <Heart className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-accent">Built by Experts</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-text">Developer</span> Testimonials
              </h2>
              
              <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
                Hear from the experts building the future of software testing, 
                designed with real-world experience and cutting-edge innovation.
              </p>
            </motion.div>

            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {TESTIMONIALS.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  variants={itemVariants}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card variant="glass" hover glow className="h-full relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <Quote className="w-8 h-8 text-primary/20" />
                    </div>
                    
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        {/* Rating */}
                        <div className="flex space-x-1">

                        </div>

                        {/* Content */}
                        <blockquote className="text-lg text-foreground leading-relaxed">
                          &ldquo;{testimonial.content}&rdquo;
                        </blockquote>

                        {/* Author */}
                        <div className="flex items-center space-x-4 pt-4 border-t border-border">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            {testimonial.avatar ? (
                              <img 
                                src={testimonial.avatar} 
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-white font-bold text-lg">
                                {testimonial.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{testimonial.name}</div>
                            <div className="text-foreground-muted text-sm">{testimonial.role}</div>
                            <div className="text-primary text-sm font-medium">{testimonial.company}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div variants={itemVariants} className="text-center mt-12">
              <Card variant="gradient" className="max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <Award className="mt-4 w-12 h-12 text-white mx-auto" />
                    <h3 className="text-2xl font-bold text-white">Join the Innovation</h3>
                    <p className="text-white/90">
                      Be part of the team building the future of software testing. 
                      Your feedback shapes our platform.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
  );
};

export default Testimonials;