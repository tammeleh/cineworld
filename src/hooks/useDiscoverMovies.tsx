import { API_TMDB_URL, API_TMDB_KEY } from '@/constants/tmdb'
import { useEffect, useState } from 'react'

export interface Movie {
  backdrop_path: string | null
  poster_path: string | null
  original_language: string
  original_title: string
  release_date: string
  vote_average: number
  genre_ids: number[]
  popularity: number
  vote_count: number
  overview: string
  adult: boolean
  video: boolean
  title: string
  id: number
}

// https://developer.themoviedb.org/reference/discover-movie
export interface DiscoverMovieParams {
  page?: number
  // add any additional parameters from the docs if building a filter
}

export interface DiscoverMovieResponse {
  total_results: number
  total_pages: number
  results: Movie[]
  page: number
}

const useDiscoverMovies = (queryParams: DiscoverMovieParams = {}) => {
  const [data, setData] = useState<DiscoverMovieResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams({
          page: String(queryParams.page || 1),
          api_key: API_TMDB_KEY,
        })

        const response = await fetch(
          `${API_TMDB_URL}/discover/movie?${params.toString()}`,
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const json: DiscoverMovieResponse = await response.json()
        setData(json)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [queryParams])

  return { isLoading, error, data }
}

export default useDiscoverMovies
