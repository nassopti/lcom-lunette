"use client";

import { motion } from "framer-motion";

export default function HeroVideoStyle() {
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">
      {/* Desktop Video (16:9) */}
      <video
        src="/videos/hero-desktop.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* Mobile Video (9:16) */}
      <video
        src="/videos/hero-mobile.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="block md:hidden absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Hero Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4"
      >
        <span className="text-gold tracking-[0.5em] uppercase text-xs md:text-sm font-semibold mb-6 block">
          Cabinet d'Exception
        </span>
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-sans font-bold text-white leading-[0.9] tracking-tighter drop-shadow-2xl">
          LA VISION
          <br />
          <span className="text-gold">SUR-MESURE</span>
        </h1>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-white/70 font-medium">Découvrir l'Expérience</span>
        <motion.div 
          animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[2px] h-16 bg-white/20 relative overflow-hidden"
        >
          <motion.div className="w-full bg-gold absolute top-0 left-0" style={{ height: "50%" }}></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
