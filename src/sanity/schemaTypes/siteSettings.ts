import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du Site',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
      initialValue: "LCOM'LUNETTE",
    }),
    defineField({
      name: 'email',
      title: 'Email de contact',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
    }),
    defineField({
      name: 'hours',
      title: 'Horaires d\'ouverture',
      type: 'text',
      rows: 4,
      description: 'Lundi - Vendredi: 08h30 - 19h00...',
    }),
  ],
})