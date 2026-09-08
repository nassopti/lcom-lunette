import { client } from "@/lib/sanity/client";
import { ARTICLE_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import { PortableText } from "@portabletext/react";

export const dynamic = "force-dynamic";

export default async function ArticleDetailsPage({ params }: { params: { slug: string } }) {
  const slug = (await params).slug;
  const article = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug });

  if (!article) {
    notFound();
  }

  // Format date
  const date = new Date(article.publishedAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen pt-32 pb-32 bg-[#06120b] text-white relative z-20">
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="flex justify-center mb-16">
          <Link href="/conseils" className="inline-flex items-center text-white/40 hover:text-gold transition-all duration-300 uppercase tracking-[0.2em] text-xs font-bold group border border-white/10 rounded-full px-6 py-3 hover:border-gold/30 hover:bg-gold/5">
            <ArrowLeft size={14} className="mr-3 group-hover:-translate-x-1 transition-transform" />
            Retour à la lecture
          </Link>
        </div>

        {/* Article Header (Editorial Style) */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center gap-4 text-gold mb-8 text-xs font-bold uppercase tracking-[0.4em]">
            <span className="w-12 h-px bg-gold/40"></span>
            {article.category}
            <span className="w-12 h-px bg-gold/40"></span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-normal mb-10 leading-[1.1] capitalize drop-shadow-md break-words hyphens-auto px-4">{article.title.toLowerCase()}</h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10 text-white/50 text-xs uppercase tracking-[0.2em] font-bold px-4">
            {article.author && (
              <span className="flex items-center gap-2 max-w-full">
                PAR <span className="text-white truncate" title={article.author}>{article.author}</span>
              </span>
            )}
            <span className="flex items-center gap-2 whitespace-nowrap"><Calendar size={14} className="text-gold/70" /> {date}</span>
            {article.readTime && (
              <span className="flex items-center gap-2 whitespace-nowrap"><Clock size={14} className="text-gold/70" /> {article.readTime}</span>
            )}
          </div>
        </div>

        {/* Cover Image */}
        {article.coverImage && (
          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-2xl md:rounded-[2rem] overflow-hidden mb-20 border border-white/10 shadow-2xl group">
            <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-overlay z-10 pointer-events-none" />
            <Image
              src={urlForImage(article.coverImage).url()}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-[2s] group-hover:scale-105"
              priority
            />
          </div>
        )}

        {/* Content (Book Typography) */}
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert prose-lg md:prose-xl max-w-none break-words hyphens-auto
            prose-p:font-light prose-p:leading-[2.2] prose-p:text-white/80 prose-p:mb-10 prose-p:text-justify
            prose-headings:font-serif prose-headings:font-normal prose-headings:text-gold prose-headings:tracking-wide
            prose-a:text-gold hover:prose-a:text-white prose-a:underline-offset-4
            prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-xl">
            {article.content ? (
              <PortableText 
                value={article.content} 
                components={{
                  types: {
                    image: ({ value }) => {
                      if (!value?.asset?._ref) return null;
                      return (
                        <div className="relative aspect-video w-full my-16 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                          <Image
                            src={urlForImage(value).url()}
                            alt={value.alt || "Image de l'article"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      );
                    }
                  }
                }}
              />
            ) : (
              <p className="text-center italic">{article.excerpt}</p>
            )}
          </div>
          
          {/* End Mark */}
          <div className="mt-20 flex justify-center">
            <div className="w-16 h-px bg-gold/50 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
