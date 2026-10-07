import { NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity/client';
import { z } from 'zod';

const reviewSchema = z.object({
  clientName: z.string().min(2).max(100).trim(),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(5).max(1000).trim(),
  consent: z.boolean().refine(val => val === true, { message: "Le consentement est obligatoire" })
});

// Simple in-memory rate limiting (for demo/protection purposes)
const rateLimit = new Map<string, { count: number, timestamp: number }>();

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting (Basé sur l'IP)
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    
    if (ip !== 'unknown') {
      const record = rateLimit.get(ip) || { count: 0, timestamp: now };
      if (now - record.timestamp < windowMs) {
        record.count += 1;
        if (record.count > 5) {
          return NextResponse.json({ success: false, error: 'Trop de requêtes. Veuillez patienter.' }, { status: 429 });
        }
      } else {
        record.count = 1;
        record.timestamp = now;
      }
      rateLimit.set(ip, record);
    }

    // 2. Validation Zod
    const body = await req.json();
    const validatedData = reviewSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ success: false, error: 'Données invalides', details: validatedData.error.errors }, { status: 400 });
    }

    if (!process.env.SANITY_API_TOKEN) {
      console.warn('SANITY_API_TOKEN is not set.');
      return NextResponse.json({ success: false, error: 'Configuration serveur invalide' }, { status: 500 });
    }

    // 3. Enregistrement sécurisé
    const data = validatedData.data;
    
    // Échappement HTML basique pour éviter les XSS
    const escapeHtml = (unsafe: string) => {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const newReview = await writeClient.create({
      _type: 'review',
      clientName: escapeHtml(data.clientName),
      rating: data.rating,
      comment: escapeHtml(data.comment),
      showOnHomepage: false, // Forcé côté serveur : ne peut pas être contourné
    });

    return NextResponse.json({ success: true, message: 'Avis enregistré avec succès', id: newReview._id });
  } catch (error) {
    console.error('Erreur lors de la création de l\'avis :', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
