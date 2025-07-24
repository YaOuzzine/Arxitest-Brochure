import HeroSection from '@/components/sections/HeroSection';
import TechnologyShowcase from '@/components/sections/TechnologyShowcase';
import DesignPhilosophy from '@/components/sections/DesignPhilosophy';
import CoreFunctionalities from '@/components/sections/CoreFunctionalities';
import DemoJourney from '@/components/sections/DemoJourney';
import Testimonials from '@/components/sections/TestimonialsAndPricing';
import ContactForm from '@/components/sections/ContactForm';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      
      <div id="features">
        <TechnologyShowcase />
        <DesignPhilosophy />
        <CoreFunctionalities />
      </div>
      
      <div id="demo">
        <DemoJourney />
      </div>
      
      <div id="testimonials">
        <Testimonials />
      </div>
      
      <div id="contact">
        <ContactForm />
      </div>
    </main>
  );
}
