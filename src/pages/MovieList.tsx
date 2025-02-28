/* eslint-disable react-hooks/rules-of-hooks */
import useDiscoverMovies from '@/hooks/useDiscoverMovies'
import useSearchMovies from '@/hooks/useSearchMovies'
import SearchInput from '@/components/SearchInput'
import Pagination from '@/components/Pagination'
import CardMovie from '@/components/CardMovie'
import PageTitle from '@/components/PageTitle'
import { useState, useMemo } from 'react'
import clsx from 'clsx'

const MovieList = () => {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const isSearching = searchQuery.trim().length > 0

  // Build query parameters for the hook.
  // For search mode, include the "query" parameter; otherwise, just page.
  const queryParams = useMemo(
    () => (isSearching ? { query: searchQuery, page } : { page }),
    [isSearching, searchQuery, page],
  )

  // Use the appropriate hook: useSearchMovies if searching, else useDiscoverMovies.
  const { isLoading, error, data } = isSearching
    ? useSearchMovies(queryParams)
    : useDiscoverMovies(queryParams)

  // TMDB's API limits: max 500 TMDB pages (20 items per page).
  // For our UI (10 items per page), total UI pages = TMDB total_pages * 2.
  const maxPagesFromTmdb = 500
  const maxUiPages = maxPagesFromTmdb * 2
  const validTotalPages = data ? Math.min(data.total_pages, maxUiPages) : 0

  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <PageTitle>
        {isSearching ? 'Search Results' : 'Discover Movies'}
        <SearchInput onChange={handleSearchChange} value={searchQuery} />
      </PageTitle>
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
