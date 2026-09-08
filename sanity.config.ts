import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemaTypes'
import { Settings, Glasses, Video, FileText, ShieldCheck, Star, MessageSquare } from 'lucide-react'

// Structure builder for custom navigation ordering
const myStructure = (S: any) =>
  S.list()
    .title('Gestion du Contenu')
    .items([
      S.listItem()
        .title('Paramètres du site')
        .icon(Settings)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      S.documentTypeListItem('frame').title('Montures').icon(Glasses),
      S.documentTypeListItem('video').title('Vidéos publicitaires').icon(Video),
      S.documentTypeListItem('article').title('Articles').icon(FileText),
      S.divider(),
      S.documentTypeListItem('insurance').title('Assurances').icon(ShieldCheck),
      S.documentTypeListItem('review').title('Avis').icon(Star),
      S.documentTypeListItem('message').title('Messages (Contact)').icon(MessageSquare),
    ])

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  
  title: "LCOM'LUNETTE Studio",

  plugins: [
    structureTool({
      structure: myStructure
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
