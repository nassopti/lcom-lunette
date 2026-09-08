import { groq } from 'next-sanity'

// Montures
export const ALL_FRAMES_QUERY = groq`*[_type == "frame"] | order(displayOrder asc) {
  _id,
  name,
  slug,
  brand,
  type,
  target,
  description,
  mainImage,
  isFeatured,
  isAvailable
}`

export const FEATURED_FRAMES_QUERY = groq`*[_type == "frame" && isFeatured == true] | order(displayOrder asc) {
  _id,
  name,
  slug,
  brand,
  type,
  target,
  mainImage,
  isAvailable
}[0...3]`

export const FRAME_BY_SLUG_QUERY = groq`*[_type == "frame" && (slug.current == $slug || _id == $slug || name match $slug)][0] {
  _id,
  name,
  slug,
  brand,
  type,
  target,
  description,
  mainImage,
  gallery,
  isFeatured,
  isAvailable,
  "videoFileUrl": associatedVideo->videoFile.asset->url
}`

// Vidéos
export const ALL_VIDEOS_QUERY = groq`*[_type == "video"] | order(displayOrder asc, publishedAt desc) {
  _id,
  title,
  description,
  videoUrl,
  "videoFileUrl": videoFile.asset->url,
  thumbnail,
  duration,
  category,
  isFeatured,
  publishedAt
}`

export const FEATURED_VIDEOS_QUERY = groq`*[_type == "video" && isFeatured == true] | order(displayOrder asc, publishedAt desc) {
  _id,
  title,
  thumbnail,
  category,
  videoUrl,
  "videoFileUrl": videoFile.asset->url
}[0...3]`

// Articles
export const ALL_ARTICLES_QUERY = groq`*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  coverImage,
  excerpt,
  author,
  category,
  publishedAt,
  readTime
}`

export const FEATURED_ARTICLES_QUERY = groq`*[_type == "article" && isFeatured == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  coverImage,
  excerpt,
  category,
  publishedAt,
  readTime
}[0...3]`

export const ARTICLE_BY_SLUG_QUERY = groq`*[_type == "article" && (slug.current == $slug || _id == $slug)][0] {
  _id,
  title,
  slug,
  coverImage,
  content,
  author,
  category,
  publishedAt,
  readTime,
  seoTitle,
  seoDescription
}`

// Assurances
export const ALL_INSURANCES_QUERY = groq`*[_type == "insurance" && isAccepted == true] {
  _id,
  name
}`

// Avis
export const HOMEPAGE_REVIEWS_QUERY = groq`*[_type == "review" && showOnHomepage == true] {
  _id,
  clientName,
  rating,
  comment
}`

// Paramètres
export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0] {
  siteName,
  email,
  phone,
  address,
  hours
}`
