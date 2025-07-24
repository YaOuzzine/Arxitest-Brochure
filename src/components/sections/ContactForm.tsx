'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  CheckCircle,
  Mail,
  Sparkles,
  Shield,
  Loader,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const ContactForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  // Spam protection - limit to 1 request per 5 minutes
  const COOLDOWN_PERIOD = 5 * 60 * 1000; // 5 minutes in milliseconds

  useEffect(() => {
    // Check for existing cooldown on component mount
    const stored = localStorage.getItem('lastDemoRequest');
    if (stored) {
      const storedTime = parseInt(stored);
      const now = Date.now();
      if ((now - storedTime) < COOLDOWN_PERIOD) {
        setLastSubmitTime(storedTime);
      }
    }
  }, [COOLDOWN_PERIOD]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Spam protection
    const now = Date.now();
    if (lastSubmitTime && (now - lastSubmitTime) < COOLDOWN_PERIOD) {
      const remainingTime = Math.ceil((COOLDOWN_PERIOD - (now - lastSubmitTime)) / 60000);
      setError(`Please wait ${remainingTime} minute${remainingTime > 1 ? 's' : ''} before requesting another demo`);
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to Web3Forms API directly
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'b5bc3723-23bf-44bf-ad52-c145e915731a',
          email: email.trim(),
          message: `Hello,

I would like to request a demo of Arxitest.

Email: ${email.trim()}
Request Date: ${new Date().toLocaleString()}
User Agent: ${navigator.userAgent}
Referrer: ${document.referrer || 'Direct visit'}

Thank you!`,
          from_name: 'Arxitest Demo Request',
          subject: 'New Demo Request - Arxitest'
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setLastSubmitTime(now);
        localStorage.setItem('lastDemoRequest', now.toString());
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Web3Forms error:', error);
      setError('Unable to send demo request. Please contact us directly at y.ouzzine@arxisoft-consulting.com');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (isSubmitted) {
    return (
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card variant="gradient" className="p-12">
              <CardContent>
                <div className="space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <CheckCircle className="w-20 h-20 text-white mx-auto" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="space-y-4"
                  >
                    <h2 className="text-3xl font-bold text-white">Demo Request Sent!</h2>
                    <p className="text-white/90 text-lg">
                      Thank you for your interest in Arxitest. We've received your demo request and will contact you within 24 hours to schedule your personalized demonstration.
                    </p>
                    <div className="pt-4">
                      <p className="text-white/80 text-sm">
                        In the meantime, feel free to explore our platform above or reach out with any questions.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Subtle overlay elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-effect border border-accent/20 mb-6">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-accent">Start Your Testing Revolution</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Request <span className="gradient-text">Demo Access</span>
            </h2>

            <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
              Get personalized access to Arxitest and see how AI-powered testing
              can transform your development workflow.
            </p>
          </motion.div>

          {/* Simple Demo Request Form */}
          <motion.div variants={itemVariants}>
            <Card variant="glass" className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="mt-4 w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto">
                      <Mail className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Request Your Demo</h3>
                      <p className="text-foreground-muted">
                        Enter your email address and we&apos;ll reach out to schedule your personalized Arxitest demonstration.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Business Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg mesh-input"
                        placeholder="your.email@company.com"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 p-3 bg-red-100 border border-red-300 rounded-lg"
                      >
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-red-700">{error}</span>
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      variant="gradient"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting || (lastSubmitTime && (Date.now() - lastSubmitTime) < COOLDOWN_PERIOD)}
                      icon={isSubmitting ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    >
                      {isSubmitting ? 'Sending Request...' : 'Request Demo'}
                    </Button>

                    <div className="flex items-center justify-center space-x-2 text-sm text-foreground-muted">
                      <Shield className="w-4 h-4" />
                      <span>Protected against spam • One request per 5 minutes</span>
                    </div>
                  </div>
                </form>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="text-center space-y-3">
                    <p className="text-sm text-foreground-muted">
                      What happens next?
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-xs">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-primary font-bold">1</span>
                        </div>
                        <span className="text-center">We receive your request</span>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                          <span className="text-secondary font-bold">2</span>
                        </div>
                        <span className="text-center">Our team contacts you within 24h</span>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                          <span className="text-accent font-bold">3</span>
                        </div>
                        <span className="text-center">We schedule your personalized demo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;