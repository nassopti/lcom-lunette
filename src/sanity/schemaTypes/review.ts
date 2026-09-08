import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'review',
  title: 'Avis Clients',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Nom du client',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Note sur 5',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'comment',
      title: 'Commentaire',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Afficher sur la page d\'accueil',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
