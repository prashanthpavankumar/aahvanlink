"use client";

import { motion } from "framer-motion";
import { PenLine, Wand2, Send, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: PenLine,
    step: "01",
    title: "Choose Your Template",
    description: "Browse our library of stunning celebration templates — weddings, birthdays, anniversaries, and more.",
    color: "#dc2626",
  },
  {
    icon: Wand2,
    step: "02",
    title: "Personalize It",
    description: "Add your photos, event details, venue info, and custom messages with our easy drag-and-drop editor.",
    color: "#f59e0b",
  },
  {
    icon: Send,
    step: "03",
    title: "Share Instantly",
    description: "Copy your unique link and share via WhatsApp, email, or social media — reach all your guests in seconds.",
    color: "#dc2626",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "Track RSVPs",
    description: "Watch RSVPs roll in from your personalized dashboard. Export guest lists with a single click.",
    color: "#f59e0b",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fff7ed 0%, #fef2f2 50%, #fffbeb 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-red-500 mb-3 block">Simple Process</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Create in <span style={{ color: "#f59e0b" }}>4 Easy Steps</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            No design skills needed. Go from idea to invitation in minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-red-200 via-amber-200 to-red-200 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                {/* Icon Circle */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}20, ${step.color}40)`,
                    border: `2px solid ${step.color}30`,
                  }}
                >
                  <step.icon className="w-9 h-9" style={{ color: step.color }} />
                  {/* Step number badge */}
                  <div
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-extrabold shadow-md"
                    style={{ background: step.color }}
                  >
                    {step.step.replace("0", "")}
                  </div>
                </motion.div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #dc2626, #f59e0b)" }}
          >
            Explore our plans
          </a>
        </motion.div>
      </div>
    </section>
  );
}
