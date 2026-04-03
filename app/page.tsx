import Navbar from "@/components/ui/navbar";
import IntroAnimation from "@/components/ui/scroll-morph-hero";
import FeaturesSection from "@/components/ui/features-section";
import HowItWorksSection from "@/components/ui/how-it-works";
import TestimonialsSection from "@/components/ui/testimonials-section";
import PricingSection from "@/components/ui/pricing-section";
import Footer from "@/components/ui/footer";
import { SparksCarousel } from "@/components/ui/sparks-carousel";

const SERVICES_DATA = [
  { id: 1, title: "Wedding Invitation", imageSrc: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&q=80" },
  { id: 2, title: "Birthday Invitation", imageSrc: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=80" },
  { id: 3, title: "Engagement Invitation", imageSrc: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&q=80" },
  { id: 4, title: "Housewarming Ceremony", imageSrc: "https://images.unsplash.com/photo-1527359443443-84a18acc616c?w=500&q=80" },
  { id: 5, title: "Baby Shower", imageSrc: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80" },
  { id: 6, title: "Naming Ceremony", imageSrc: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=500&q=80" },
  { id: 7, title: "Graduation Party", imageSrc: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80" },
  { id: 8, title: "Corporate Events", imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&q=80" },
  { id: 9, title: "Anniversary Celebration", imageSrc: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80" },
  { id: 10, title: "Farewell & Retirement", imageSrc: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&q=80" },
  { id: 11, title: "Religious Ceremonies", imageSrc: "https://images.unsplash.com/photo-1524824267900-2b6ed433ce32?w=500&q=80" },
  { id: 12, title: "Custom / Any Event", imageSrc: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80" },
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
