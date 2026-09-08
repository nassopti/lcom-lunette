import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '../env' // We will define this env or just use process.env

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
})

export const urlForImage = (source: any) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}
