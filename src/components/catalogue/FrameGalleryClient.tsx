"use client";

import { useState } from "react";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";

interface FrameGalleryClientProps {
  initialMainImage: any;
  galleryImages: any[];
  frameName: string;
}

export default function FrameGalleryClient({ initialMainImage, galleryImages, frameName }: FrameGalleryClientProps) {
  // We keep a list of all available images (main + gallery)
  // and we store the currently selected main image.
  const [mainImage, setMainImage] = useState(initialMainImage);
  
  // The small gallery should contain the images that are NOT the main image.
  const allImages = [initialMainImage, ...(galleryImages || [])].filter(Boolean);
  const thumbnails = allImages.filter(img => img !== mainImage);

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="relative aspect-square md:aspect-[4/3] bg-black/40 rounded-2xl overflow-hidden border border-white/5 shadow-2xl backdrop-blur-sm">
        <Image
          src={mainImage ? urlForImage(mainImage).url() : '/placeholder.jpg'}
          alt={frameName}
          fill
          className="object-cover object-center transition-opacity duration-500"
          priority
        />
      </div>
      
      {/* Gallery */}
      {thumbnails.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {thumbnails.map((image: any, index: number) => (
            <div 
              key={index} 
              onClick={() => setMainImage(image)}
              className="relative aspect-square bg-black/40 rounded-xl overflow-hidden border border-white/5 hover:border-gold/50 transition-colors cursor-pointer"
            >
              <Image
                src={urlForImage(image).url()}
                alt={`${frameName} vue ${index + 1}`}
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
