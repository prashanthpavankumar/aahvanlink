"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the type for a single item in the carousel
export interface SparkItem {
  id: string | number;
  imageSrc: string;
  title: string;
}

// Define the props for the main component
export interface SparksCarouselProps {
  title: string;
  subtitle: string;
  items: SparkItem[];
}

export const SparksCarousel = React.forwardRef<
  HTMLDivElement,
  SparksCarouselProps
>(({ title, subtitle, items }, ref) => {
  // To create a seamless infinite marquee, we duplicate the items
  const marqueeItems = [...items, ...items, ...items];

  return (
    <section ref={ref} className="w-full py-16 bg-white overflow-hidden" aria-labelledby="sparks-title">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        {/* Header Section */}
        <div className="text-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-50 text-red-600 text-sm font-bold mb-4 border border-red-100"
            >
                <Heart className="w-4 h-4 fill-current" />
                Our Offerings
            </motion.div>
            <h2 id="sparks-title" className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 font-serif mb-4">
                {title}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium italic">
                {subtitle}
            </p>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="relative flex overflow-x-hidden group">
        <div className="py-4 animate-marquee whitespace-nowrap flex gap-6 hover:[animation-play-state:paused]">
          {marqueeItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              className="w-[280px] sm:w-[320px] rounded-2xl overflow-hidden border border-gray-100 bg-white group/item hover:border-red-200 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                  src={item.imageSrc}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-bold text-white font-serif leading-tight">
                      {item.title}
                    </h3>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between text-gray-400">
                <span className="text-xs font-bold tracking-widest uppercase opacity-60 group-hover/item:text-red-500 transition-colors">Digital Invitation</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover/item:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
});

SparksCarousel.displayName = "SparksCarousel";
