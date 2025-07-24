'use client';

import { motion } from 'framer-motion';
import {
  Play,
  Brain,
  BarChart3,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import DashboardDemo from '@/components/demo/DashboardDemo';

const DemoJourney: React.FC = () => {

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
      {/* Subtle overlay elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/3 rounded-full blur-3xl" />
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
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-effect border border-accent/20 mb-6">
              <Play className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-accent">Interactive Demo</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Experience the <span className="gradient-text">Magic</span>
            </h2>

            <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
              Take a guided journey through Arxitest&apos;s complete workflow, from project connection
              to results delivery, all powered by artificial intelligence.
            </p>
          </motion.div>

          {/* Demo Purpose Explanation */}
          <motion.div variants={itemVariants} className="mb-8">
            <Card variant="glass" className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Demo Purpose</h3>
                  <p className="text-blue-800 mb-3">
                    This interactive demo is designed to <strong>familiarize users with Arxitest and its complete workflow</strong>,
                    from team organization to test execution and reporting. Follow the guided tour to experience how AI-powered testing
                    transforms your development process.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-blue-700">
                      <BarChart3 className="w-4 h-4" />
                      <span className="font-medium">Note:</span>
                      <span>This is a simulated environment. Data is not persistent and resets on page refresh.</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-blue-700">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="font-medium">Important:</span>
                      <span>This demo is not a 1:1 representative of the actual Arxitest application.</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Interactive Demo Instructions */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <Card variant="glass" className="max-w-2xl mx-auto p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5 text-primary" />
                  <span className="text-lg font-semibold text-foreground">Interactive Demo Guide</span>
                </div>
                <p className="text-foreground-muted">
                  Follow the guided tour below to experience the complete Arxitest workflow.
                  Click through each step to see how teams create projects, generate tests, and execute them.
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-sm">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full">Teams</span>
                  <ChevronRight className="w-4 h-4 text-foreground-muted mt-1" />
                  <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full">Projects</span>
                  <ChevronRight className="w-4 h-4 text-foreground-muted mt-1" />
                  <span className="px-3 py-1 bg-accent/20 text-accent rounded-full">Stories</span>
                  <ChevronRight className="w-4 h-4 text-foreground-muted mt-1" />
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full">Tests</span>
                  <ChevronRight className="w-4 h-4 text-foreground-muted mt-1" />
                  <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full">Execution</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Interactive Dashboard Demo */}
          <motion.div variants={itemVariants}>
            <Card variant="glass" className="overflow-hidden">
              <CardHeader>
                <div className="text-center space-y-2">
                  <CardTitle className="text-2xl">Live Dashboard Demo</CardTitle>
                  <CardDescription className="text-lg">
                    Experience the complete Arxitest workflow in our interactive dashboard
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <DashboardDemo />
              </CardContent>
            </Card>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default DemoJourney;