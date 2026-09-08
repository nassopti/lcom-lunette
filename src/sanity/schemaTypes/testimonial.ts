import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Témoignages',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nom', type: 'string' }),
    defineField({ name: 'comment', title: 'Commentaire', type: 'text' }),
    defineField({ name: 'rating', title: 'Note (sur 5)', type: 'number', validation: Rule => Rule.min(1).max(5) }),
    defineField({ name: 'image', title: 'Photo', type: 'image' }),
  ],
});