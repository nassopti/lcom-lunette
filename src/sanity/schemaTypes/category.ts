import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Catégories',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nom', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
  ],
});