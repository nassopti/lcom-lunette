import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Articles de blog',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'author', title: 'Auteur', type: 'string' }),
    defineField({ name: 'publishedAt', title: 'Date de publication', type: 'datetime' }),
    defineField({ name: 'mainImage', title: 'Image principale', type: 'image' }),
    defineField({ name: 'content', title: 'Contenu', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'category', title: 'Catégorie', type: 'reference', to: [{ type: 'category' }] }),
    defineField({ name: 'readTime', title: 'Temps de lecture (min)', type: 'number' }),
  ],
});