"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter } from "lucide-react";
import { urlForImage } from "@/lib/sanity/image";

interface Frame {
  _id: string;
  name: string;
  brand: string;
  type: string;
  target: string;
  mainImage: any;
  slug?: { current: string };
}

export default function CatalogueClient({ frames }: { frames: Frame[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [filterTarget, setFilterTarget] = useState("");

  const filteredFrames = frames.filter(frame => {
    const matchesSearch = frame.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          frame.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "" || frame.type === filterType;
    const matchesTarget = filterTarget === "" || frame.target === filterTarget;
    
    return matchesSearch && matchesType && matchesTarget;
  });

  return (
    <main className="min-h-screen pt-32 pb-24 bg-black/10 backdrop-blur-md text-white relative z-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: 45, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 70, damping: 15 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 drop-shadow-md">Notre Collection</h1>
            <p className="text-white/60 font-light">L'élégance à travers le regard.</p>
          </motion.div>
          
        {/* Recherche & Filtres */}
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/30 border border-white/20 rounded-none py-2 pl-10 pr-4 text-white focus:outline-none focus:border-gold transition-colors backdrop-blur-sm"
            />
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-black/30 border border-white/20 p-2 flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold transition-colors backdrop-blur-sm"
            >
              <Filter size={20} />
            </button>
            
            {/* Filter Menu */}
            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-black/90 border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-md z-50">
                <h4 className="text-white/60 text-xs uppercase tracking-wider mb-2">Type</h4>
                <div className="flex flex-col gap-2 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="type" checked={filterType === ''} onChange={() => setFilterType('')} className="accent-gold" />
                    <span>Tous</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="type" checked={filterType === 'vue'} onChange={() => setFilterType('vue')} className="accent-gold" />
                    <span>Vue</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="type" checked={filterType === 'solaire'} onChange={() => setFilterType('solaire')} className="accent-gold" />
                    <span>Solaire</span>
                  </label>
                </div>
                
                <h4 className="text-white/60 text-xs uppercase tracking-wider mb-2">Cible</h4>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="target" checked={filterTarget === ''} onChange={() => setFilterTarget('')} className="accent-gold" />
                    <span>Tous</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="target" checked={filterTarget === 'homme'} onChange={() => setFilterTarget('homme')} className="accent-gold" />
                    <span>Homme</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="target" checked={filterTarget === 'femme'} onChange={() => setFilterTarget('femme')} className="accent-gold" />
                    <span>Femme</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="target" checked={filterTarget === 'enfant'} onChange={() => setFilterTarget('enfant')} className="accent-gold" />
                    <span>Enfant</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="target" checked={filterTarget === 'mixte'} onChange={() => setFilterTarget('mixte')} className="accent-gold" />
                    <span>Mixte</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grille */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFrames.map((frame, index) => (
          <motion.div
            key={frame._id}
            initial={{ opacity: 0, y: 150, scale: 0.5, rotateX: 45, rotateY: 30 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ type: "spring", stiffness: 60, damping: 12, delay: index * 0.1 }}
            className="group cursor-pointer p-4 border border-transparent hover:border-white/10 hover:bg-black/20 rounded-xl transition-all duration-500 backdrop-blur-sm"
          >
            <Link href={`/catalogue/${frame.slug?.current || frame.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`} className="block">
              <div className="relative aspect-[4/3] bg-[#06120b] mb-6 overflow-hidden rounded-lg border border-white/5 group-hover:border-gold/30 transition-colors duration-500 shadow-xl">
                <Image
                  src={frame.mainImage ? urlForImage(frame.mainImage).url() : '/placeholder.jpg'}
                  alt={frame.name}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm">
                  <span className="border border-gold text-gold px-6 py-2 uppercase text-sm tracking-wider hover:bg-gold hover:text-black transition-colors shadow-[0_0_15px_rgba(255,215,0,0.5)]">
                    Découvrir
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start px-2">
                <div>
                  <h3 className="text-xl font-serif font-semibold group-hover:text-gold transition-colors">{frame.name}</h3>
                  <p className="text-white/50 text-sm mt-1 uppercase tracking-wider">{frame.brand}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
        {filteredFrames.length === 0 && (
          <div className="col-span-full py-20 text-center text-white/50">
            Aucune monture ne correspond à votre recherche.
          </div>
        )}
      </div>
      </div>
    </main>
  );
}
