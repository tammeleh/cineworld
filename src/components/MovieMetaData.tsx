import MetaDataItem from '@/components/MetaDataItem'
import formatDuration from '@/utils/formatDuration'
import formatCurrency from '@/utils/formatCurrency'
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
        'text-paragraph mb-4 flex flex-col gap-1 py-1.5 text-xs lg:gap-2 lg:text-base',
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
      {data.runtime && (
        <MetaDataItem label="Duration">
          {formatDuration(data.runtime)}
        </MetaDataItem>
      )}
      {data.budget && data.budget > 0 && (
        <MetaDataItem label="Budget">
          {formatCurrency(data.budget)}
        </MetaDataItem>
      )}
      {data.revenue && data.revenue > 0 && (
        <MetaDataItem label="Revenue">
          {formatCurrency(data.revenue)}
        </MetaDataItem>
      )}
      <MetaDataItem label="Rating">
        {data.vote_average} ({data.vote_count} votes)
      </MetaDataItem>
      {data.original_language && (
        <MetaDataItem label="Language">
          {data.original_language.toUpperCase()}
        </MetaDataItem>
      )}
    </div>
  )
}

export default MovieMetaData
