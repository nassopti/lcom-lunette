import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity/client';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Verify token presence (optional but good for logs)
    if (!process.env.SANITY_API_TOKEN) {
      console.warn('SANITY_API_TOKEN is not set. The request will likely fail if the dataset is not public for writing.');
    }

    const newMessage = await client.create({
      _type: 'message',
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email || '',
      date: data.date,
      time: data.time,
      reason: data.reason,
      comments: data.comments || '',
      status: 'new',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: 'Message créé avec succès', id: newMessage._id });
  } catch (error) {
    console.error('Erreur lors de la création du message :', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
