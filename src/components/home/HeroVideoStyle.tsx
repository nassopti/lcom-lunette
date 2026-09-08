"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

export default function HeroVideoStyle() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Le conteneur est encore plus petit sur mobile (130vh) pour qu'un seul swipe
  // suffise à parcourir toute la distance, et 200vh sur desktop.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring plus vif pour une meilleure fluidité sur un seul coup de doigt
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,    
    stiffness: 60,  
    mass: 0.8
  });

  // Scale the central image massively so the user goes "through" the lens
  const scale = useTransform(smoothProgress, [0, 1], [1, 40]);
  
  // Overall background opacity to reveal the next section
  const overlayOpacity = useTransform(smoothProgress, [0.6, 1], [1, 0]);
  
  // Opacity for the scroll indicator at the bottom
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[130vh] md:h-[200vh] w-full bg-[#06120b]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Overlay */}
        <motion.div 
          style={{ opacity: overlayOpacity, willChange: "opacity" }}
          className="absolute inset-0 bg-[#06120b] z-0"
        />

        {/* Massive Typography - Le texte ne disparait plus au scroll */}
        <div className="absolute z-30 flex flex-col items-center text-center pointer-events-none px-4">
          <span className="text-gold tracking-[0.5em] uppercase text-sm font-semibold mb-6 block">
            Cabinet d'Exception
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-sans font-bold text-white leading-[0.9] tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            LA VISION
            <br />
            <span className="text-gold">SUR-MESURE</span>
          </h1>
        </div>

        {/* Central Scaling Object (Glasses/Lens) */}
        {/* Le flou (blur) a été retiré, seul le scale subsiste */}
        <motion.div 
          style={{ scale, willChange: "transform" }}
          className="relative z-20 w-[40vw] h-[40vw] md:w-[25vw] md:h-[25vw] max-w-[400px] max-h-[400px] flex items-center justify-center rounded-full overflow-hidden border border-gold/30"
        >
          <Image
            src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800"
            alt="Luxury Lens"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06120b] via-transparent to-transparent opacity-90" />
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity, willChange: "opacity" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-white/50 font-medium">Découvrir l'Expérience</span>
          <motion.div 
            animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[2px] h-16 bg-white/10 relative overflow-hidden"
          >
            <motion.div className="w-full bg-gold absolute top-0 left-0" style={{ height: "50%" }}></motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
