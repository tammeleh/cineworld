/* eslint-disable react-hooks/rules-of-hooks */
import useDiscoverMovies from '@/hooks/useDiscoverMovies'
import useSearchMovies from '@/hooks/useSearchMovies'
import { useEffect, useState, useMemo } from 'react'
import SearchInput from '@/components/SearchInput'
import Pagination from '@/components/Pagination'
import CardMovie from '@/components/CardMovie'
import PageTitle from '@/components/PageTitle'
import useDebounce from '@/hooks/useDebounce'
import clsx from 'clsx'

const MovieList = () => {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  const isSearching = debouncedSearchQuery.trim().length > 0

  // Build query parameters for the hook.
  const queryParams = useMemo(
    () => (isSearching ? { query: debouncedSearchQuery, page } : { page }),
    [isSearching, debouncedSearchQuery, page],
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

  useEffect(() => {
    if (isSearching && page !== 1) {
      setPage(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearching])

  if (error) return <div>Error: {error.message}</div>

  const hasResults = data && data.results.length > 0

  return (
    <>
      <PageTitle>
        {isSearching ? 'Search Results' : 'Discover Movies'}
        <SearchInput onChange={handleSearchChange} value={searchQuery} />
      </PageTitle>
      {!hasResults && !isLoading && (
        <div className="mt-12 flex flex-col gap-8 text-center md:mt-12">
          <div className="text-5xl md:text-9xl" aria-label="Shrug">
            ¯\_(ツ)_/¯
          </div>
          <p className="text-paragraph text-xs md:text-base">
            Found no results for "{debouncedSearchQuery}"
          </p>
        </div>
      )}
      {hasResults && !isLoading && (
        <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {data.results.map((movie) => (
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
