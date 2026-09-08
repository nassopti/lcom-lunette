import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'teamMember',
  title: 'Équipe',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nom', type: 'string' }),
    defineField({ name: 'role', title: 'Rôle', type: 'string' }),
    defineField({ name: 'image', title: 'Photo', type: 'image' }),
    defineField({ name: 'bio', title: 'Biographie', type: 'text' }),
  ],
});