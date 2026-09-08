import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Articles',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Auteur (Optionnel)',
      type: 'string',
      initialValue: 'Dr. Konan',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: ['Conseils Visuels', 'Tendances', 'Technologie', 'Santé', 'Nouveautés'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Contenu de l\'article',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'readTime',
      title: 'Temps de lecture estimé',
      type: 'string',
      description: 'Ex: 5 min',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Article mis en avant (Accueil)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'seoTitle',
      title: 'Titre SEO',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Description SEO',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
