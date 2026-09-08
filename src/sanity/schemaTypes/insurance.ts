import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'insurance',
  title: 'Assurances Partenaires',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom de l\'assurance',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Exemple: ASCOMA, MCI, Allianz...',
    }),
    defineField({
      name: 'isAccepted',
      title: 'Assurance Acceptée ?',
      type: 'boolean',
      initialValue: true,
      description: 'Cocher pour indiquer que cette assurance est un partenaire valide.',
    }),
  ],
})