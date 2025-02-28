import formatRating from '@/utils/formatRating'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import Card from './Card'

interface CardMovieProps {
  className?: string
  overview: string
  imageId: string
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
  const getImageUrl = (imageId: string) => {
    return `https://image.tmdb.org/t/p/w500/${imageId}.jpg`
  }

  return (
    <Link className="transition-all hover:scale-50" to={`/movies/${movieId}`}>
      <Card
        className={clsx(
          'flex h-full flex-col gap-1 transition-all hover:scale-102',
          className,
        )}
      >
        <img
          className="border-border rounded-t border"
          src={getImageUrl(imageId)}
          alt={title}
        />
        <h2 className="text-md font-bold" aria-label="Movie title">
          {title}
        </h2>
        <p
          className="text-paragraph line-clamp-5 flex-grow text-xs font-thin"
          aria-label="Movie overview"
        >
          {overview}
        </p>
        <div className="ml-auto inline text-sm" aria-label="Movie rating">
          Rating:{' '}
          <span className="text-yellow-400">{formatRating(rating)}</span>
        </div>
      </Card>
    </Link>
  )
}

export default CardMovie
