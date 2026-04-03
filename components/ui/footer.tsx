"use client";

import { motion } from "framer-motion";
import { Heart, Mail, Phone, Globe, MessageSquare, Share2, MapPin } from "lucide-react";

const footerLinks = {
  Product: ["Templates", "Features", "Pricing", "How It Works"],
  Company: ["About Us", "Blog", "Careers", "Press Kit"],
  Support: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
};

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-950 text-white">
      {/* CTA Banner */}
      <div className="py-20 px-4 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #dc2626 0%, #f59e0b 100%)" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Ready to Create Your <br className="hidden md:block" />
              Perfect Invitation?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of celebrations. Explore our plans or contact us for more information, create something beautiful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#pricing"
                className="px-8 py-4 rounded-full font-bold text-sm bg-white hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
                style={{ color: "#dc2626" }}
              >
                Explore our plans
              </a>
              <a
                href="mailto:hr@vishnuspire.com"
                className="px-8 py-4 rounded-full font-bold text-sm border-2 border-white text-white hover:bg-white/10 transition-all duration-300"
              >
                Talk to Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <a href="#home" className="flex items-center group mb-8">
                <div className="relative w-48 md:w-64 h-16 flex items-center justify-start transition-transform duration-200 group-hover:scale-105">
                  <img 
                    src="/logo.png" 
                    alt="Aahvan Link"
                    className="w-full h-full object-contain object-left brightness-0 invert"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<span className="text-2xl font-bold font-script text-white">Aahvan <span className="text-red-500">Link</span></span>';
                    }}
                  />
                </div>
              </a>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs font-medium">
              Creating beautiful digital invitations for every milestone — because every celebration deserves to be unforgettable.
            </p>
            <div className="flex gap-4">
              {[Globe, MessageSquare, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 hover:bg-red-600 hover:border-red-600 transition-all duration-300"
                >
                  <Icon className="w-4 h-4 text-gray-300" />
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-10 space-y-4">
              <a href="mailto:hr@vishnuspire.com" className="flex items-center gap-3 text-sm text-gray-400 hover:text-red-400 transition-colors font-semibold">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                  <Mail className="w-4 h-4" />
                </div>
                hr@vishnuspire.com
              </a>
              <div className="flex flex-col gap-2">
                <a href="tel:+919110788933" className="flex items-center gap-3 text-sm text-gray-400 hover:text-red-400 transition-colors font-semibold">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                    <Phone className="w-4 h-4" />
                  </div>
                  +91 91107 88933
                </a>
                <a href="tel:+919515893777" className="flex items-center gap-3 text-sm text-gray-400 hover:text-red-400 transition-colors font-semibold ml-11">
                  +91 95158 93777
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-400 font-medium leading-relaxed">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>
                  Bhimavaram, West Godavari<br />
                  Andhra Pradesh, India.
                </span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-amber-400 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 Aahvan. Made with{" "}
            <Heart className="inline w-3.5 h-3.5 text-red-500 fill-red-500" />{" "}
            in India.
          </p>
          <p className="text-sm text-gray-500">
            Crafted for{" "}
            <span style={{ color: "#f59e0b" }}>every celebration</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
