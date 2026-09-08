import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity/client';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!process.env.SANITY_API_TOKEN) {
      console.warn('SANITY_API_TOKEN is not set.');
    }

    const newReview = await client.create({
      _type: 'review',
      clientName: data.clientName,
      rating: parseInt(data.rating),
      comment: data.comment,
      showOnHomepage: false, // Toujours en brouillon/caché par défaut
    });

    return NextResponse.json({ success: true, message: 'Avis enregistré avec succès', id: newReview._id });
  } catch (error) {
    console.error('Erreur lors de la création de l\'avis :', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
