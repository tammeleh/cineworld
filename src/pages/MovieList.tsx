import useDiscoverMovies from '@/hooks/useDiscoverMovies'
import Pagination from '@/components/Pagination'
import CardMovie from '@/components/CardMovie'
import PageTitle from '@/components/PageTitle'
import { useState, useMemo } from 'react'
import clsx from 'clsx'

const MovieList = () => {
  const [page, setPage] = useState(1)

  // Memoize the query params so the object identity only changes when 'page' changes.
  const queryParams = useMemo(() => ({ page }), [page])

  const { isLoading, error, data } = useDiscoverMovies(queryParams)

  // TMDB's API only supports page numbers between 1 and 500, pages after 500 are not accessible.
  // See: https://developer.themoviedb.org/docs/errors code 22
  const maxPagesFromTmdb = 500 // 20 items per page
  const maxUiPages = maxPagesFromTmdb * 2 // Show 10 items per page
  const validTotalPages = data ? Math.min(data.total_pages, maxUiPages) : 0

  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <PageTitle>Discover Movies</PageTitle>

      {data && !isLoading && (
        <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {data.results.map((movie) => (
            <li key={movie.id}>
              <CardMovie
                imageId={movie.backdrop_path || ''}
                rating={movie.vote_average}
                overview={movie.overview}
                title={movie.title}
                movieId={movie.id}
              />
            </li>
          ))}
        </ul>
      )}
      {isLoading && <div>Loading...</div>}
      <Pagination
        className={clsx('mt-4 md:mt-8', isLoading && 'pointer-events-none')}
        onPageChange={(newPage) => setPage(newPage)}
        totalPages={validTotalPages}
        currentPage={page}
      />
    </>
  )
}

export default MovieList
