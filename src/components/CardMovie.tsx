import placeholder from '@/assets/placeholder-image.webp'
import formatRating from '@/utils/formatRating'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import Card from './Card'

interface CardMovieProps {
  imageId: string | null
  className?: string
  overview: string
  movieId: number
  rating: number
  title: string
}

const CardMovie = ({
  className,
  overview,
  imageId,
  movieId,
  rating,
  title,
}: CardMovieProps) => {
  const getImageUrl = (imageId: CardMovieProps['imageId']) => {
    if (imageId) return `https://image.tmdb.org/t/p/w500/${imageId}.jpg`
    return placeholder
  }

  return (
    <Link className="transition-all hover:scale-50" to={`/movies/${movieId}`}>
      <Card
        className={clsx(
          'flex h-full flex-col gap-1 transition-all hover:scale-102',
          className,
        )}
      >
        <div className="border-border relative aspect-[16/9] w-full overflow-hidden rounded-t border">
          <img
            className="h-full w-full object-cover"
            src={getImageUrl(imageId)}
            loading="lazy"
            alt={title}
          />
        </div>
        <h2 className="text-md font-bold" aria-label="Movie title">
          {title}
        </h2>
        <p
          className="text-paragraph line-clamp-5 max-h-20 text-xs font-thin"
          aria-label="Movie overview"
        >
          {overview}
        </p>
        {rating !== 0 && (
          <div
            className="mt-auto ml-auto inline text-sm"
            aria-label="Movie rating"
          >
            Rating:{' '}
            <span className="text-yellow-400">{formatRating(rating)}</span>
          </div>
        )}
      </Card>
    </Link>
  )
}

export default CardMovie
