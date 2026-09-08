import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'frame',
  title: 'Montures',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du modèle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: (doc) => `${doc.brand}-${doc.name}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Marque',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Vue', value: 'vue' },
          { title: 'Solaire', value: 'solaire' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'target',
      title: 'Cible',
      type: 'string',
      options: {
        list: [
          { title: 'Homme', value: 'homme' },
          { title: 'Femme', value: 'femme' },
          { title: 'Enfant', value: 'enfant' },
          { title: 'Mixte', value: 'mixte' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie de photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'isFeatured',
      title: 'En vedette (Afficher sur l\'accueil)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isAvailable',
      title: 'Disponible en stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Plus le chiffre est petit, plus la monture apparaitra en premier.',
      initialValue: 0,
    }),
    defineField({
      name: 'associatedVideo',
      title: 'Vidéo publicitaire associée',
      type: 'reference',
      to: [{ type: 'video' }],
      description: 'Optionnel: lier cette monture à une vidéo.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'brand',
      media: 'mainImage',
    },
  },
})