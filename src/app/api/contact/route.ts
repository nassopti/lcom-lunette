import { NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity/client';
import { z } from 'zod';

const contactSchema = z.object({
  firstName: z.string().min(2).max(100).trim(),
  lastName: z.string().min(2).max(100).trim(),
  phone: z.string().min(8).max(20).trim(),
  email: z.string().email().or(z.literal('')).optional(),
  date: z.string().min(10).max(10),
  time: z.string().min(4).max(5),
  reason: z.string().min(2).max(100),
  comments: z.string().max(1000).optional(),
  consent: z.boolean().refine(val => val === true, { message: "Le consentement est obligatoire" })
});

const rateLimit = new Map<string, { count: number, timestamp: number }>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowMs = 60 * 1000;
    
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

    const body = await req.json();
    const validatedData = contactSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ success: false, error: 'Données invalides', details: validatedData.error.issues }, { status: 400 });
    }

    if (!process.env.SANITY_API_TOKEN) {
      console.warn('SANITY_API_TOKEN is not set.');
      return NextResponse.json({ success: false, error: 'Configuration serveur invalide' }, { status: 500 });
    }

    const data = validatedData.data;

    const escapeHtml = (unsafe: string) => {
      if (!unsafe) return '';
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const newMessage = await writeClient.create({
      _type: 'message',
      firstName: escapeHtml(data.firstName),
      lastName: escapeHtml(data.lastName),
      phone: escapeHtml(data.phone),
      email: escapeHtml(data.email || ''),
      date: escapeHtml(data.date),
      time: escapeHtml(data.time),
      reason: escapeHtml(data.reason),
      comments: escapeHtml(data.comments || ''),
      status: 'new',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: 'Message créé avec succès', id: newMessage._id });
  } catch (error) {
    console.error('Erreur lors de la création du message :', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
