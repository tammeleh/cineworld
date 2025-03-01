import { MovieDetails } from '@/types/tmdb'
import { useEffect, useState } from 'react'

const useMovieDetails = (movieId?: string) => {
  const [data, setData] = useState<MovieDetails | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!movieId) return

    const fetchDetails = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Forward request to proxy server at ./api/tmdb.js
        const response = await fetch(
          `/api/movie/${movieId}?append_to_response=credits,similar,reviews`,
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const json: MovieDetails = await response.json()
        setData(json)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDetails()
  }, [movieId])

  return { isLoading, error, data }
}

export default useMovieDetails
