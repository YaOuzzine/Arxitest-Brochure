export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface TechStack {
  category: string;
  technologies: Technology[];
}

export interface Technology {
  name: string;
  description: string;
  icon: string; // Lucide icon name
  color: string;
  website?: string;
}

export interface AIProvider {
  name: string;
  description: string;
  capabilities: string[];
  logo: string; // Lucide icon name
  color: string;
}

export interface Integration {
  name: string;
  description: string;
  features: string[];
  logo: string; // Lucide icon name
  color: string;
  isNew?: boolean;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface DemoStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType;
  duration: number;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface PricingTier {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
}

export interface ContactForm {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  teamSize: number;
  challenges: string[];
  techStack: string[];
  timeline: string;
  demoType: 'live' | 'recorded';
  timeZone: string;
  interests: string[];
}