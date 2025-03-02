import MovieCardListSkeleton from '@/components/skeletons/MovieCardListSkeleton'
import SearchInput from '@/components/SearchInput'
import Pagination from '@/components/Pagination'
import { TmdbListResponse } from '@/types/tmdb'
import CardMovie from '@/components/CardMovie'
import PageTitle from '@/components/PageTitle'
import { ChangeEvent } from 'react'
import clsx from 'clsx'

interface MovieListTemplateProps {
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  onPageChange: (page: number) => void
  data: TmdbListResponse | null
  searchQuery: string
  currentPage: number
  isLoading: boolean
  totalPages: number
  error?: string
}

const MovieListTemplate = ({
  onSearchChange,
  onPageChange,
  searchQuery,
  currentPage,
  totalPages,
  isLoading,
  error,
  data,
}: MovieListTemplateProps) => {
  const hasResults = data && data.results && data.results.length > 0

  return (
    <>
      <PageTitle>
        {searchQuery.trim().length > 0 ? 'Search Results' : 'Discover Movies'}
        <SearchInput onChange={onSearchChange} value={searchQuery} />
      </PageTitle>

      {error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          {isLoading && <MovieCardListSkeleton />}
          {!hasResults && !isLoading && searchQuery.trim().length > 0 && (
            <div className="mt-12 flex flex-col gap-8 text-center md:mt-12">
              <div className="text-5xl md:text-9xl" aria-label="Shrug">
                ¯\_(ツ)_/¯
              </div>
              <p className="text-xs text-gray-500 md:text-base">
                Found no results for "{searchQuery}"
              </p>
            </div>
          )}

          {hasResults && !isLoading && (
            <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
              {data!.results.map((movie) => (
                <li key={movie.id}>
                  <CardMovie
                    imageId={movie.backdrop_path}
                    rating={movie.vote_average}
                    overview={movie.overview}
                    title={movie.title}
                    movieId={movie.id}
                  />
                </li>
              ))}
            </ul>
          )}

          <Pagination
            className={clsx('mt-4 md:mt-8', isLoading && 'pointer-events-none')}
            onPageChange={onPageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </>
  )
}

export default MovieListTemplate
