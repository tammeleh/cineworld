import MovieListTemplate from '@/components/MovieListTemplate'
import React, { useEffect, useState, useMemo } from 'react'
import useDebounce from '@/hooks/useDebounce'
import useMovies from '@/hooks/useMovies'

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
  // On UI we show 10 movies per page as per the requirements.
  const maxUiPages = 1000
  const validTotalPages = data ? Math.min(data.total_pages, maxUiPages) : 0

  const handlePaginationChange = (newPage: number) => {
    if (isSearching) {
      setSearchPage(newPage)
    } else {
      setDiscoverPage(newPage)
    }
  }
  const paginationCurrentPage = isSearching ? searchPage : discoverPage

  return (
    <MovieListTemplate
      error={error ? error.message : undefined}
      onPageChange={handlePaginationChange}
      onSearchChange={handleSearchChange}
      currentPage={paginationCurrentPage}
      totalPages={validTotalPages}
      searchQuery={searchQuery}
      data={data || undefined}
      isLoading={isLoading}
    />
  )
}

export default MovieList
