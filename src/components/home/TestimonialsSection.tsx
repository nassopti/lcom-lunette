"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Link from "next/link";

interface Review {
  _id: string;
  clientName: string;
  rating: number;
  comment: string;
}

export default function TestimonialsSection({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold tracking-[0.2em] uppercase text-sm font-semibold mb-4 block">
            Ce que disent nos clients
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Témoignages</h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reviews.map((review, index) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl flex flex-col h-full"
            >
              <div className="flex text-gold mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={i < review.rating ? "fill-gold" : "text-gray-600"} 
                  />
                ))}
              </div>
              <p className="text-white/80 font-light italic mb-6 flex-grow">
                "{review.comment}"
              </p>
              <div className="border-t border-white/10 pt-4 mt-auto">
                <span className="font-serif font-semibold text-white">{review.clientName}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/avis"
            className="inline-block bg-transparent border border-gold text-gold hover:bg-gold hover:text-black py-3 px-8 uppercase tracking-widest text-sm font-semibold transition-all duration-300"
          >
            Laisser un avis
          </Link>
        </div>
      </div>
    </section>
  );
}
