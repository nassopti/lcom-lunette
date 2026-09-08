import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'brand',
  title: 'Marques',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nom', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
  ],
});