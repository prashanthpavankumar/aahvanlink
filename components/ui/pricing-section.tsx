"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { GlowCard } from "./spotlight-card";

const plans = [
  {
    name: "Starter",
    price: "₹499",
    period: "per event",
    description: "Perfect for intimate celebrations",
    color: "#f59e0b",
    glow: "orange" as const,
    features: [
      "1 Invitation Website",
      "Up to 50 Guest Links",
      "5 Luxury Templates",
      "RSVP Tracking",
      "Valid for 30 Days",
      "WhatsApp Sharing",
    ],
    cta: "Get Starter",
    popular: false,
  },
  {
    name: "Celebration",
    price: "₹999",
    period: "per event",
    description: "Our most popular plan for weddings",
    color: "#dc2626",
    glow: "red" as const,
    features: [
      "1 Invitation Website",
      "Unlimited Guest Links",
      "All Luxury Templates",
      "Valid for 90 Days",
      "Custom Domain Option",
      "Photo Gallery (50 photos)",
    ],
    cta: "Get Celebration",
    popular: true,
  },
  {
    name: "Grand",
    price: "₹1,999",
    period: "per event",
    description: "For large-scale, luxury events",
    color: "#f59e0b",
    glow: "orange" as const,
    features: [
      "Up to 3 Invitation Websites",
      "Unlimited Everything",
      "Exclusive Designer Templates",
      "Full Guest CRM",
      "Valid for 180 Days",
      "Custom Domain Included",
      "Unlimited Photo Gallery",
      "Priority Support",
      "Analytics Dashboard",
    ],
    cta: "Get Grand",
    popular: false,
  },
];

export default function PricingSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-24 bg-gray-950 relative overflow-hidden">
      {/* BG Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]" style={{ background: "#dc2626" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-sm font-bold" style={{ background: "rgba(220,38,38,0.1)", color: "#f87171" }}>
            <Sparkles className="w-4 h-4" />
            Luxury Experience
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-serif">
            Investment in Your <span style={{ color: "#f87171" }}>Memories</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto italic">
            Artisan digital storytelling. Choose your level of excellence.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              onHoverStart={() => setHovered(index)}
              onHoverEnd={() => setHovered(null)}
              className="relative h-full"
            >
              <GlowCard
                glowColor={plan.glow}
                customSize={true}
                className={`flex flex-col h-full ${plan.popular ? "border-red-500/30 md:scale-105 z-10" : "border-white/10"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-xs font-bold shadow-md z-20" style={{ color: "#dc2626" }}>
                    ⭐ Most Popular Selection
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-white font-serif">
                    {plan.name}
                  </h3>
                  <p className="text-sm mb-6 text-gray-400">
                    {plan.description}
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-extrabold text-white">
                      {plan.price}
                    </span>
                    <span className="text-sm mb-1.5 text-gray-500">
                      /{plan.period}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, fi) => (
                    <div key={fi} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-white/5 border border-white/10">
                        <Check className="w-3 h-3 text-red-400" />
                      </div>
                      <span className="text-gray-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="w-full text-center py-4 px-6 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: plan.popular 
                      ? "linear-gradient(135deg, #dc2626, #f59e0b)" 
                      : "rgba(255,255,255,0.05)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}
                >
                  {plan.cta}
                </a>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
