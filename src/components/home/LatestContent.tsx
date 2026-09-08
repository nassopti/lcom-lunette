"use client";

import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Clock, User } from "lucide-react";

interface Post {
  _id: string;
  title: string;
  excerpt: string;
  readTime?: string;
  author?: string;
  coverImage?: any; // Sanity image
}

interface Video {
  _id: string;
  title: string;
  thumbnail?: any; // Sanity image
}

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { urlForImage } from "@/lib/sanity/image";
import dynamic from "next/dynamic";
const VideoModal = dynamic(() => import("@/components/shared/VideoModal"), { ssr: false });

export default function LatestContent({ posts, videos }: { posts: Post[], videos: Video[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  
  return (
    <section ref={containerRef} className="py-32 relative bg-black/20 backdrop-blur-md text-white border-t-2 border-white/10 border-b-2">
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        
        {/* Actualités & Conseils */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 pb-12 border-b-2 border-white/10">
            <div>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tighter uppercase leading-[0.9]">
                ACTUALITÉS
                <br />
                <span className="text-white/40">& CONSEILS</span>
              </h2>
            </div>
            <div>
              <Link
                href="/conseils"
                className="text-white hover:text-gold border-b-2 border-white hover:border-gold pb-1 transition-colors uppercase tracking-widest text-sm font-bold inline-flex items-center gap-2 group"
              >
                Tout le blog
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l-2 border-t-2 border-white/10">
            {posts.map((post, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 150, rotateY: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ type: "spring", stiffness: 80, damping: 15, delay: index * 0.3 }}
                key={post._id}
                className="group cursor-pointer border-r-2 border-b-2 border-white/10 hover:bg-white/5 transition-colors duration-500"
              >
                <Link href={`/conseils/${(post as any).slug?.current || post._id}`} className="flex flex-col h-full">
                  <div className="relative aspect-[16/9] overflow-hidden border-b-2 border-white/10 bg-[#06120b]">
                    <Image 
                      src={post.coverImage ? urlForImage(post.coverImage).url() : '/placeholder.jpg'} 
                      alt={post.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-all duration-700 opacity-80 group-hover:opacity-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-sans font-bold mb-4 uppercase tracking-tight group-hover:text-gold transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-white/70 font-light mb-6 leading-relaxed break-words hyphens-auto border-l-2 border-gold/30 pl-4 italic">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-6 text-sm uppercase tracking-widest pt-6 border-t-2 border-white/20 font-bold text-white/40 group-hover:text-gold/80 transition-colors">
                      <span className="flex items-center gap-2"><Clock size={16} /> {post.readTime}</span>
                      <span className="flex items-center gap-2"><User size={16} /> {post.author}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vidéos */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 pb-12 border-b-2 border-white/10">
            <div>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tighter uppercase leading-[0.9]">
                IMMERSION
                <br />
                <span className="text-white/40">VIDÉOS</span>
              </h2>
            </div>
            <div>
              <Link
                href="/videos"
                className="text-white hover:text-gold border-b-2 border-white hover:border-gold pb-1 transition-colors uppercase tracking-widest text-sm font-bold inline-flex items-center gap-2 group"
              >
                Toutes les vidéos
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l-2 border-t-2 border-white/10">
            {videos.map((video, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotateX: -45, y: 100 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ type: "spring", stiffness: 70, damping: 12, delay: index * 0.3 }}
                key={video._id}
                onClick={() => setSelectedVideo(video)}
                className="group cursor-pointer border-r-2 border-b-2 border-white/10 p-4 hover:bg-white/5 transition-colors duration-500"
              >
                <div className="relative aspect-video bg-[#06120b] overflow-hidden border-2 border-white/10 mb-6 group-hover:border-gold/30 transition-colors duration-700">
                  <Image
                    src={video.thumbnail ? urlForImage(video.thumbnail).url() : '/placeholder.jpg'}
                    alt={video.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle size={80} className="text-white group-hover:text-gold group-hover:scale-110 transition-all duration-300 drop-shadow-2xl" strokeWidth={1} />
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-2xl font-sans font-bold uppercase tracking-tight group-hover:text-gold transition-colors">
                    {video.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Video Modal */}
        <VideoModal 
          isOpen={!!selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
          videoUrl={(selectedVideo as any)?.videoUrl} 
          videoFileUrl={(selectedVideo as any)?.videoFileUrl}
        />

      </div>
    </section>
  );
}
