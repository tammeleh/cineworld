import useDiscoverMovies from '@/hooks/useDiscoverMovies'
import Pagination from '@/components/Pagination'
import { useState, useMemo } from 'react'

const MovieList = () => {
  const [page, setPage] = useState(1)

  // Memoize the query params so the object identity only changes when 'page' changes.
  const queryParams = useMemo(() => ({ page }), [page])

  const { isLoading, error, data } = useDiscoverMovies(queryParams)

  // TMDB's API only supports page numbers between 1 and 500, pages after 500 are not accessible.
  // See: https://developer.themoviedb.org/docs/errors code 22
  const validTotalPages = data ? Math.min(data.total_pages, 500) : 0

  if (isLoading) return <div>Loading movies...</div>
  if (error) return <div>Error: {error.message}</div>
  console.log(data)
  return (
    <div>
      <h2>Movies</h2>
      {data && (
        <>
          <p>
            Total Results: {data.total_results} | Total Pages: {validTotalPages}
            {data.total_pages}
          </p>
          <ol>
            {data.results.map((movie, i) => (
              <li key={movie.id}>
                <h3>
                  {i + 1} - {movie.title}
                </h3>
                {/* <p>{movie.overview}</p> */}
              </li>
            ))}
          </ol>
          <Pagination
            onPageChange={(newPage) => setPage(newPage)}
            totalPages={validTotalPages}
            currentPage={page}
          />
        </>
      )}
    </div>
  )
}

export default MovieList
