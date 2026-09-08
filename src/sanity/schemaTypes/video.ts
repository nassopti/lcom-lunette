import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'video',
  title: 'Vidéos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'videoFile',
      title: 'Fichier vidéo',
      type: 'file',
      description: 'Uploader le fichier vidéo directement (MP4 recommandé).',
      options: {
        accept: 'video/*',
      }
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL Vidéo Externe',
      type: 'url',
      description: 'Lien YouTube ou Vimeo (si vous ne téléversez pas de fichier).',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Miniature',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Durée',
      type: 'string',
      description: 'Ex: 02:30',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
    }),
    defineField({
      name: 'isFeatured',
      title: 'En vedette',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'thumbnail',
    },
  },
})