"use client";

import { motion, type Variants, AnimatePresence } from "framer-motion";
import { Sparkles, Monitor, Share2, Palette, Clock, ShieldCheck, Zap, Info } from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: Monitor,
    title: "Beautiful Digital Invites",
    description: "Stunning, fully responsive invitation websites that look amazing on every device.",
    info: "Optimized for mobile-first audiences. Includes high-resolution image support and custom domain integration.",
    color: "#dc2626",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description: "Choose themes, colors, fonts, and photos to match your unique celebration style.",
    info: "Access 50+ designer templates, pick your own color scheme, and use any Google Font pairing you love.",
    color: "#f59e0b",
  },
  {
    icon: Share2,
    title: "Instant Sharing",
    description: "Share via WhatsApp, email, or a unique link. No app download needed for guests.",
    info: "Single-tap sharing to WhatsApp groups and individual contacts. Track opens with built-in link analytics.",
    color: "#dc2626",
  },
  {
    icon: Clock,
    title: "RSVP Management",
    description: "Track RSVPs in real time. Know exactly who's coming before the big day.",
    info: "Automatic email notifications for new RSVPs. Export your guest list to Excel for caterers and venues.",
    color: "#f59e0b",
  },
  {
    icon: Zap,
    title: "Ready in Minutes",
    description: "Create your invitation website in under 10 minutes with our intuitive builder.",
    info: "Our guided onboarding process helps you fill in your details and pick a style in just a few simple steps.",
    color: "#dc2626",
  },
  {
    icon: ShieldCheck,
    title: "Privacy Controlled",
    description: "Password-protect your invite so only your guests can access it.",
    info: "Enable gate-keeping with unique pins or password protection to keep your event details private.",
    color: "#f59e0b",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration - more 'liquid' with soft blurred circles */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.08]" style={{ background: "radial-gradient(circle, #dc2626, transparent)" }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.08]" style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-black uppercase tracking-[0.2em] text-amber-600">Artisan Features</span>
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-950 mb-6 leading-[1.1]">
            Experience the <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-yellow-500">Future of Invitations</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            We've built a suite of professional tools designed to make your celebration planning smooth, elegant, and entirely digital.
          </p>
        </motion.div>

        {/* Feature Cards: Liquid Glass Design */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative cursor-pointer"
            >
              <div className="relative h-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-[0_8px_32px_rgba(220,38,38,0.05)] transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_20px_60px_rgba(220,38,38,0.12)] group-hover:border-white/80 overflow-hidden">
                
                {/* Visual Accent */}
                <div 
                  className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-[40px] opacity-20 transition-all duration-500 group-hover:opacity-40 group-hover:scale-150" 
                  style={{ backgroundColor: feature.color }} 
                />

                {/* Icon Container */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:rotate-6 bg-white shadow-lg border border-red-50/50"
                  style={{
                    boxShadow: `0 8px 16px ${feature.color}15`,
                  }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-medium mb-4">{feature.description}</p>
                </div>

                {/* Information Indicator */}
                <div className="absolute bottom-6 right-6 opacity-40 group-hover:opacity-100 transition-opacity">
                  <Info className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                </div>

                {/* Liquid Glass Tooltip / Small Window */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: -0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 z-20 p-8 flex flex-col justify-center bg-white/95 backdrop-blur-2xl rounded-[32px] border border-red-100 shadow-2xl"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: feature.color }} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Deep Dive</span>
                      </div>
                      <p className="text-sm font-bold text-gray-800 leading-relaxed">
                        {feature.info}
                      </p>
                      
                      <button className="mt-6 flex items-center gap-2 text-xs font-bold transition-colors hover:gap-3" style={{ color: feature.color }}>
                        Learn more about {feature.title.split(' ')[0]}
                        <ShieldCheck className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
