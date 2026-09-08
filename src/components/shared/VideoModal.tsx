"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string; // YouTube or Vimeo URL
  videoFileUrl?: string; // Uploaded File URL
}

export default function VideoModal({ isOpen, onClose, videoUrl, videoFileUrl }: VideoModalProps) {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Global unhandledrejection listener to completely suppress AbortError overlay in Next.js
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason && event.reason.name === "AbortError") {
        event.preventDefault(); // Stops Next.js from throwing the red overlay
      }
    };
    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    return () => window.removeEventListener("unhandledrejection", handleUnhandledRejection);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Safely handle pause to avoid AbortError in Next.js
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      // Intentionally empty, we use src={isOpen ? url : ""} below to stop playback safely
    }
  }, [isOpen]);

  if (!mounted) return null;

  // Sanitize YouTube URL
  let formattedUrl = videoUrl;
  if (formattedUrl && !formattedUrl.startsWith("http")) {
    formattedUrl = `https://${formattedUrl}`;
  }

  // Helper to extract YouTube ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = formattedUrl ? getYouTubeId(formattedUrl) : null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 md:p-12"
        >
          {/* Close Button */}
          <motion.button 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={onClose}
            className="absolute top-6 right-6 lg:top-10 lg:right-10 bg-white/10 hover:bg-gold text-white hover:text-black rounded-full p-3 transition-all duration-300 z-50 backdrop-blur-md border border-white/20 hover:border-gold"
          >
            <X size={24} />
          </motion.button>
          
            <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full max-w-5xl h-[70vh] md:h-[85vh] bg-[#06120b] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(255,215,0,0.15)] relative border-2 border-gold/30 ring-1 ring-white/10"
          >
            {youtubeId ? (
              // Native YouTube Iframe (guaranteed to work, no AbortError, no SSR issues)
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${isOpen ? 1 : 0}&rel=0`}
                title="Lecteur Vidéo YouTube"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none bg-black"
              ></iframe>
            ) : videoFileUrl ? (
              // Native video player for uploaded files (most reliable, no gray boxes)
              <video 
                ref={videoRef}
                src={isOpen ? videoFileUrl : ""}
                controls
                autoPlay={isOpen}
                className="w-full h-full object-contain bg-black"
                controlsList="nodownload"
                poster="/logo.jpg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full text-white/50 bg-black">
                <span className="text-gold mb-4 text-4xl">!</span>
                <p>La vidéo est introuvable ou le lien est invalide.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
