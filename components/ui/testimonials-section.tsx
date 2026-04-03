"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "User 1",
    event: "Wedding Celebration",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    text: "This service made our wedding invitations so special! Our guests loved the interactive website and it was so easy to track RSVPs. Absolutely magical experience!",
    rating: 5,
  },
  {
    name: "User 2",
    event: "Birthday Party",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    text: "I used this for my 30th birthday bash and everyone was blown away. The template was gorgeous and sharing on WhatsApp was instant. Highly recommended!",
    rating: 5,
  },
  {
    name: "User 3",
    event: "Anniversary Event",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    text: "Our anniversary invite looked like a professionally designed website. The photo gallery feature was the cherry on top. It definitely wowed all our guests!",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="gallery" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fef2f2 0%, #fff 50%, #fffbeb 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-3 block">Memorable Moments</span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            Celebrations That <span style={{ color: "#dc2626" }}>Wowed Everyone</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Join thousands of happy couples, families, and friends who celebrated with us.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative cursor-default"
              style={{
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-10 h-10" style={{ color: "#dc2626" }} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-red-100"
                />
                <div>
                  <p className="text-sm font-bold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.event}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Our Vision Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 text-center max-w-4xl mx-auto"
        >
          <div className="w-20 h-0.5 bg-brand-red mx-auto mb-10 opacity-30" />
          <h3 className="text-3xl md:text-5xl font-serif text-gray-900 mb-8 leading-tight italic">
            "We believe every celebration, no matter how intimate, deserves to be told as a digital masterpiece."
          </h3>
          <p className="text-sm font-medium tracking-[0.3em] text-amber-500 uppercase">
            The Aahvan Link Vision
          </p>
        </motion.div>
      </div>
    </section>
  );
}
