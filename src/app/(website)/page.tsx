import HeroVideoStyle from "@/components/home/HeroVideoStyle";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import LatestContent from "@/components/home/LatestContent";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { client } from "@/lib/sanity/client";
import { FEATURED_FRAMES_QUERY, FEATURED_ARTICLES_QUERY, FEATURED_VIDEOS_QUERY, HOMEPAGE_REVIEWS_QUERY } from "@/lib/sanity/queries";

import { urlForImage } from "@/lib/sanity/image";

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  const featuredFrames = await client.fetch(FEATURED_FRAMES_QUERY);
  const featuredArticles = await client.fetch(FEATURED_ARTICLES_QUERY);
  const featuredVideos = await client.fetch(FEATURED_VIDEOS_QUERY);
  const homepageReviews = await client.fetch(HOMEPAGE_REVIEWS_QUERY);

  const mappedCollections = featuredFrames.map((frame: any) => ({
    _id: frame._id,
    name: frame.name,
    slug: frame.slug,
    image: frame.mainImage ? urlForImage(frame.mainImage).url() : "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
    description: frame.description || `Collection ${frame.brand}`,
  }));

  return (
    <main className="min-h-screen">
      <HeroVideoStyle />
      <div className="bg-transparent text-white relative z-20">
        <ServicesSection />
        <FeaturedCollections collections={mappedCollections.length > 0 ? mappedCollections : [
          { _id: 'demo-1', name: "Demo 1", slug: { current: 'demo-1' }, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800", description: "Ajoutez une monture en vedette." },
          { _id: 'demo-2', name: "Demo 2", slug: { current: 'demo-2' }, image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800", description: "Ajoutez une monture en vedette." },
          { _id: 'demo-3', name: "Demo 3", slug: { current: 'demo-3' }, image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800", description: "Ajoutez une monture en vedette." }
        ]} />
        <LatestContent posts={featuredArticles} videos={featuredVideos} />
        <TestimonialsSection reviews={homepageReviews} />
      </div>
    </main>
  );
}
