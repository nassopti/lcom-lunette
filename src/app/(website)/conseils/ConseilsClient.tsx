"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, User } from "lucide-react";
import { urlForImage } from "@/lib/sanity/image";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  readTime?: string;
  author?: string;
  coverImage?: any;
}

export default function ConseilsClient({ posts }: { posts: Post[] }) {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-black/10 backdrop-blur-md text-white relative z-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -100, rotateY: 45, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
          className="mb-16 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 drop-shadow-md">Conseils & Actualités</h1>
          <p className="text-white/60 font-light max-w-2xl mx-auto md:mx-0">L'expertise de nos opticiens au service de votre vision et de votre style.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.map((post, index) => (
            <Link href={`/conseils/${post.slug?.current || post._id}`} key={post._id}>
              <motion.div 
                initial={{ opacity: 0, y: 150, scale: 0.5, rotateX: 45, rotateY: -30 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ type: "spring", stiffness: 60, damping: 12, delay: index * 0.2 }}
                className="group cursor-pointer flex flex-col h-full p-6 border border-white/5 hover:border-white/20 hover:bg-black/20 rounded-2xl transition-all duration-500 backdrop-blur-sm shadow-xl hover:shadow-[0_0_40px_rgba(255,215,0,0.2)]"
              >
                <div className="relative aspect-video mb-6 overflow-hidden bg-[#06120b] border border-white/10 group-hover:border-gold/30 rounded-lg transition-colors shadow-xl">
                  <Image 
                    src={post.coverImage ? urlForImage(post.coverImage).url() : '/placeholder.jpg'} 
                    alt={post.title} 
                    fill 
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-transparent to-transparent opacity-60" />
                </div>
                <div className="flex-grow flex flex-col justify-between px-2">
                  <div>
                    <h2 className="text-2xl font-serif font-semibold mb-3 group-hover:text-gold transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-white/70 font-light mb-6 leading-relaxed break-words hyphens-auto border-l-2 border-gold/30 pl-4 italic">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-white/40 uppercase tracking-widest pt-4 border-t border-white/20">
                    <span className="flex items-center gap-2"><Clock size={14} className="text-gold" /> {post.readTime}</span>
                    <span className="flex items-center gap-2"><User size={14} className="text-gold" /> {post.author}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
