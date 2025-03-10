import MetaDataItem from '@/components/MetaDataItem'
import formatDuration from '@/utils/formatDuration'
import formatCurrency from '@/utils/formatCurrency'
import formatRating from '@/utils/formatRating'
import formatDate from '@/utils/formatDate'
import { MovieDetails } from '@/types/tmdb'
import { Fragment } from 'react'
import clsx from 'clsx'

interface MovieMetaDataProps {
  data: MovieDetails
  className?: string
}

const MovieMetaData = ({ className, data }: MovieMetaDataProps) => {
  return (
    <div
      className={clsx(
        'mb-4 flex flex-col gap-1 py-1.5 text-xs text-gray-500 lg:gap-2 lg:text-base',
        className,
      )}
    >
      {data.release_date && (
        <MetaDataItem label="Release Date">
          {formatDate(data.release_date)}
        </MetaDataItem>
      )}
      {data.genres && data.genres.length > 0 && (
        <div>
          Genre:{' '}
          {data.genres.map((genre, i) => (
            <Fragment key={i}>
              <span className="text-foreground">{genre.name}</span>
              {i + 1 !== data.genres.length && ', '}
            </Fragment>
          ))}
        </div>
      )}
      {data.runtime !== null && Number(data.runtime) > 0 && (
        <MetaDataItem label="Duration">
          {formatDuration(data.runtime)}
        </MetaDataItem>
      )}
      {Number(data.budget) > 0 && (
        <MetaDataItem label="Budget">
          {formatCurrency(data.budget)}
        </MetaDataItem>
      )}
      {Number(data.revenue) > 0 && (
        <MetaDataItem label="Revenue">
          {formatCurrency(data.revenue)}
        </MetaDataItem>
      )}
      {data.vote_average > 0 && data.vote_count > 0 && (
        <MetaDataItem label="Rating">
          {formatRating(data.vote_average)} ({data.vote_count} votes)
        </MetaDataItem>
      )}
      {data.original_language && (
        <MetaDataItem label="Language">
          {data.original_language.toUpperCase()}
        </MetaDataItem>
      )}
    </div>
  )
}

export default MovieMetaData
