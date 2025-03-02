import MovieCardListSkeleton from '@/components/skeletons/MovieCardListSkeleton'
import { useEffect, useState, useMemo } from 'react'
import SearchInput from '@/components/SearchInput'
import Pagination from '@/components/Pagination'
import CardMovie from '@/components/CardMovie'
import PageTitle from '@/components/PageTitle'
import useDebounce from '@/hooks/useDebounce'
import useMovies from '@/hooks/useMovies'
import clsx from 'clsx'

const MovieList = () => {
  const [discoverPage, setDiscoverPage] = useState(1)
  const [searchPage, setSearchPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  const isSearching = debouncedSearchQuery.trim().length > 0

  useEffect(() => {
    if (isSearching) {
      setSearchPage(1)
    } else {
      setDiscoverPage(1)
    }
  }, [debouncedSearchQuery, isSearching])

  const queryParams = useMemo(
    () =>
      isSearching
        ? { query: debouncedSearchQuery, page: searchPage }
        : { page: discoverPage },
    [isSearching, debouncedSearchQuery, discoverPage, searchPage],
  )

  const { isLoading, error, data } = useMovies(queryParams)

  // Tmdb returns maximum of 500 pages and each page has 20 movies.
  // On ui we show 10 movies per page as per the requirements.
  const maxUiPages = 1000
  const validTotalPages = data ? Math.min(data.total_pages, maxUiPages) : 0
  const hasResults = data && data.results.length > 0

  const handlePaginationChange = (newPage: number) => {
    if (isSearching) {
      setSearchPage(newPage)
    } else {
      setDiscoverPage(newPage)
    }
  }
  const paginationCurrentPage = isSearching ? searchPage : discoverPage

  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <PageTitle>
        {isSearching ? 'Search Results' : 'Discover Movies'}
        <SearchInput onChange={handleSearchChange} value={searchQuery} />
      </PageTitle>

      {!hasResults && !isLoading && isSearching && (
        <div className="mt-12 flex flex-col gap-8 text-center md:mt-12">
          <div className="text-5xl md:text-9xl" aria-label="Shrug">
            ¯\_(ツ)_/¯
          </div>
          <p className="text-xs text-gray-500 md:text-base">
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

      {isLoading && <MovieCardListSkeleton />}

      <Pagination
        className={clsx('mt-4 md:mt-8', isLoading && 'pointer-events-none')}
        onPageChange={handlePaginationChange}
        currentPage={paginationCurrentPage}
        totalPages={validTotalPages}
      />
    </>
  )
}

export default MovieList
