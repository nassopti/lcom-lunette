"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-black/10 backdrop-blur-md text-white relative z-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 45, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
          className="text-center mb-24"
        >
          <span className="text-gold tracking-[0.2em] uppercase text-sm font-semibold mb-4 block">
            Notre Histoire
          </span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 drop-shadow-lg">
            L'Excellence depuis toujours
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Fondé avec la vision d'apporter l'ultra-luxe optique en Afrique, LCOM'LUNETTE 
            redéfinit l'expérience visuelle. Chaque monture est sélectionnée avec soin, 
            chaque verre est taillé avec une précision d'orfèvre.
          </p>
        </motion.div>

        {/* Timeline ou Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -45, scale: 0.6 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.2 }}
          >
            <div className="relative aspect-square w-full max-w-md mx-auto rounded-full overflow-hidden border-2 border-white/10 bg-black/20 shadow-[0_0_50px_rgba(255,215,0,0.05)]">
              <Image 
                src="https://images.unsplash.com/photo-1582142407894-ec85a1260a46?auto=format&fit=crop&q=80&w=800" 
                alt="Cabinet Optique" 
                fill 
                className="object-cover opacity-80 transition-all duration-700" 
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 45, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.4 }}
          >
            <h2 className="text-3xl font-serif font-semibold text-gold mb-6">Notre Philosophie</h2>
            <p className="text-gray-300 mb-6 font-light leading-relaxed">
              Nous croyons que vos lunettes ne sont pas seulement un dispositif médical, mais la 
              première chose que les gens remarquent chez vous. C'est le reflet de votre 
              personnalité, de votre statut et de votre sens du détail.
            </p>
            <p className="text-gray-300 font-light leading-relaxed">
              Nos opticiens-visagistes sont formés aux standards internationaux les plus stricts
              pour vous offrir une prise en charge digne des plus grandes maisons de luxe.
            </p>
          </motion.div>
        </div>
        {/* Manager Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-32">
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: 45, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.2 }}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl font-serif font-semibold text-gold mb-2">Dr. Sarah Konan</h2>
            <p className="text-white/50 tracking-widest uppercase text-sm mb-6 font-bold">Directrice & Optométriste Principale</p>
            <p className="text-gray-300 mb-6 font-light leading-relaxed">
              Forte d'une décennie d'expérience dans les cliniques optiques les plus prestigieuses, 
              le Dr. Konan a fondé LCOM'LUNETTE avec l'ambition d'apporter un service de classe mondiale.
            </p>
            <p className="text-gray-300 font-light leading-relaxed">
              Sa passion pour la précision visuelle et son sens aiguisé du visagisme font 
              d'elle la référence ultime pour sublimer votre regard tout en garantissant 
              un confort absolu.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: -45, scale: 0.6 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.4 }}
            className="order-1 md:order-2"
          >
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto rounded-2xl overflow-hidden border-2 border-white/10 bg-black/20 shadow-[0_0_50px_rgba(255,215,0,0.1)]">
              <Image 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800" 
                alt="Dr. Sarah Konan - Directrice" 
                fill 
                className="object-cover opacity-90 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

