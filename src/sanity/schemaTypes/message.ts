import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'message',
  title: 'Messages (Contact)',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'Prénom',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'lastName',
      title: 'Nom',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'phone',
      title: 'Numéro WhatsApp',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'date',
      title: 'Date souhaitée',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'time',
      title: 'Heure souhaitée',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'reason',
      title: 'Motif du RDV',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'comments',
      title: 'Commentaires',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'Nouveau', value: 'new' },
          { title: 'Traité', value: 'processed' },
          { title: 'Annulé', value: 'cancelled' }
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'createdAt',
      title: 'Date de réception',
      type: 'datetime',
      readOnly: true,
    })
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      reason: 'reason',
      date: 'date',
    },
    prepare(selection) {
      const { firstName, lastName, reason, date } = selection
      return {
        title: `${firstName} ${lastName} - ${reason}`,
        subtitle: date ? `RDV le ${date}` : '',
      }
    }
  }
})
