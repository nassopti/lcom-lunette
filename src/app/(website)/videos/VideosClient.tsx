"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { urlForImage } from "@/lib/sanity/image";
import VideoModal from "@/components/shared/VideoModal";

interface Video {
  _id: string;
  title: string;
  thumbnail: any;
  videoUrl?: string;
  videoFileUrl?: string;
}

export default function VideosClient({ videos }: { videos: Video[] }) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <main className="min-h-screen pt-32 pb-24 bg-black/10 backdrop-blur-md text-white relative z-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 45, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
          className="mb-16 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 drop-shadow-md">Contenus Vidéo</h1>
          <p className="text-white/60 font-light max-w-2xl mx-auto md:mx-0">Plongez dans les coulisses de l'excellence optique.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video._id}
              initial={{ opacity: 0, scale: 0.5, y: 150, rotateX: 45, rotateY: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ type: "spring", stiffness: 60, damping: 12, delay: index * 0.2 }}
              onClick={() => setSelectedVideo(video)}
              className="group cursor-pointer p-4 border border-transparent hover:border-white/10 hover:bg-black/20 rounded-xl transition-all duration-500 backdrop-blur-sm shadow-xl hover:shadow-[0_0_50px_rgba(255,215,0,0.2)]"
            >
              <div className="relative aspect-video bg-[#06120b] border border-white/10 group-hover:border-gold/30 rounded-lg transition-colors mb-4 overflow-hidden shadow-xl">
                <Image
                  src={video.thumbnail ? urlForImage(video.thumbnail).url() : '/placeholder.jpg'}
                  alt={video.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle size={64} className="text-white/80 group-hover:text-gold group-hover:scale-110 transition-all duration-500 shadow-sm" strokeWidth={1} />
                </div>
              </div>
              <h3 className="text-lg font-serif font-semibold px-2 group-hover:text-gold transition-colors line-clamp-2">
                {video.title}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        <VideoModal 
          isOpen={!!selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
          videoUrl={selectedVideo?.videoUrl} 
          videoFileUrl={selectedVideo?.videoFileUrl}
        />

      </div>
    </main>
  );
}
