import placeholder from '@/assets/placeholder-image.webp'

export type TmdbImageSize =
  | 'original'
  | 'w154'
  | 'w185'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'w92'

const getTmdbImageUrl = (
  imageId: string | null,
  size: TmdbImageSize = 'w500',
): string => {
  if (imageId) return `https://image.tmdb.org/t/p/${size}/${imageId}.jpg`
  return placeholder
}

export default getTmdbImageUrl
