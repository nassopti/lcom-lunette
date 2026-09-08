"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Collection {
  _id: string;
  name: string;
  image: string;
  description?: string;
  slug?: { current: string };
}

export default function FeaturedCollections({ collections }: { collections: Collection[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const img1Y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const img2Y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={containerRef} className="py-32 relative bg-black/20 backdrop-blur-md text-white border-t-2 border-white/10">
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 pb-12 border-b-2 border-white/10 gap-8">
          <div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tighter uppercase leading-[0.9]">
              COLLECTIONS
              <br />
              <span className="text-white/40">D'EXCEPTION</span>
            </h2>
          </div>
          <div>
            <Link
              href="/catalogue"
              className="text-white hover:text-gold border-b-2 border-white hover:border-gold pb-1 transition-colors uppercase tracking-widest text-sm font-bold inline-flex items-center gap-2 group"
            >
              Voir le catalogue
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ type: "spring", stiffness: 60, damping: 15, delay: index * 0.3 }}
              className={`group cursor-pointer ${index % 3 === 1 ? 'md:mt-24' : ''}`}
            >
              <Link href={`/catalogue/${collection.slug?.current || collection.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden border-2 border-white/10 mb-6 group-hover:border-gold/50 transition-colors duration-700 rounded-lg shadow-2xl group-hover:shadow-[0_0_50px_rgba(255,215,0,0.3)]">
                  {/* Image Parallax Wrapper */}
                  <motion.div 
                    className="absolute inset-0 w-full h-[120%] -top-[10%]"
                    style={{ y: index % 2 === 0 ? img1Y : img2Y, willChange: "transform" }}
                  >
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />
                    {/* Luxury Glow Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-transparent to-transparent opacity-60" />
                  </motion.div>
                </div>
              
                {/* Content */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-4xl font-sans font-bold uppercase tracking-tight mb-2 group-hover:text-gold transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-white/60 font-light">
                      {collection.description}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:bg-gold group-hover:border-gold group-hover:text-black transition-all duration-500">
                    <span className="transform -rotate-45 group-hover:rotate-0 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
