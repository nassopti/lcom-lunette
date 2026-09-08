import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nom', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'icon', title: 'Icône (Lucide Name)', type: 'string' }),
  ],
});