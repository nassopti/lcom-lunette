"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=2560"
          alt="Luxury eyewear"
          fill
          className="object-cover opacity-50 brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
      </motion.div>

      <motion.div 
        style={{ scale: textScale, opacity: textOpacity, y: textY }}
        className="container relative z-20 mx-auto px-6 text-center pt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="text-gold uppercase text-sm font-semibold mb-6 block"
          >
            L'Excellence Visuelle
          </motion.span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold text-white leading-[1.1] mb-8 drop-shadow-2xl">
            La Vision à<br />
            <span className="text-gradient">l'État Pur</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-gray-200 text-lg md:text-2xl max-w-3xl mx-auto mb-12 font-light drop-shadow-md"
          >
            Découvrez une sélection exclusive des montures les plus prestigieuses du monde,
            alliée à une expertise optique sur-mesure au cœur de l'Afrique.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/contact"
              className="bg-gold text-black px-8 py-4 rounded-full font-semibold uppercase tracking-widest text-sm hover:bg-white hover:scale-105 transition-all duration-500 w-full sm:w-auto text-center"
            >
              Prendre Rendez-vous
            </Link>
            <Link
              href="/catalogue"
              className="border border-white/40 text-white px-8 py-4 rounded-full font-semibold uppercase tracking-widest text-sm hover:bg-white hover:text-black hover:scale-105 transition-all duration-500 w-full sm:w-auto text-center glass"
            >
              Les Collections
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <motion.div 
          animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-white/20 relative overflow-hidden"
        >
          <motion.div className="w-full bg-gold absolute top-0 left-0" style={{ height: "50%" }}></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
