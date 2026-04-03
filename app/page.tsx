import Navbar from "@/components/ui/navbar";
import IntroAnimation from "@/components/ui/scroll-morph-hero";
import FeaturesSection from "@/components/ui/features-section";
import HowItWorksSection from "@/components/ui/how-it-works";
import TestimonialsSection from "@/components/ui/testimonials-section";
import PricingSection from "@/components/ui/pricing-section";
import Footer from "@/components/ui/footer";
import { SparksCarousel } from "@/components/ui/sparks-carousel";

const SERVICES_DATA = [
  { id: 1, title: "Wedding Invitation", imageSrc: "/images/events/wedding.jpg" },
  { id: 2, title: "Birthday Invitation", imageSrc: "/images/events/birthday.jpg" },
  { id: 3, title: "Engagement Invitation", imageSrc: "/images/events/engagement.jpg" },
  { id: 4, title: "Housewarming Ceremony", imageSrc: "/images/events/housewarming.jpg" },
  { id: 5, title: "Baby Shower", imageSrc: "/images/events/babyshower.jpg" },
  { id: 6, title: "Naming Ceremony", imageSrc: "/images/events/naming.jpg" },
  { id: 7, title: "Graduation Party", imageSrc: "/images/events/graduation.jpg" },
  { id: 8, title: "Corporate Events", imageSrc: "/images/events/corporate.jpg" },
  { id: 9, title: "Anniversary Celebration", imageSrc: "/images/events/anniversary.jpg" },
  { id: 10, title: "Farewell & Retirement", imageSrc: "/images/events/farewell.jpg" },
  { id: 11, title: "Religious Ceremonies", imageSrc: "/images/events/religious.jpg" },
  { id: 12, title: "Custom / Any Event", imageSrc: "/images/events/custom.jpg" },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative w-full" style={{ height: "100svh" }}>
        <IntroAnimation />

        {/* Bottom hero copy overlay */}
        <div className="absolute bottom-8 left-0 right-0 z-20 text-center pointer-events-none">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400">
            DISCOVER MORE ↓
          </p>
        </div>
      </section>

      {/* Page Sections */}
      <FeaturesSection />
      
      {/* Services Marquee */}
      <section id="gallery">
        <SparksCarousel 
            title="Elegant Ceremonies" 
            subtitle="Explore our handcrafted digital invitations for every milestone. Tailored to captivate your guests and honor your traditions."
            items={SERVICES_DATA}
        />
      </section>

      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </>
  );
}
