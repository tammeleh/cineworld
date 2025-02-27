import { useEffect, useState } from 'react'

// In-memory cache to store fetched data by query parameters.
const cache = new Map<string, DiscoverMovieResponse>()
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
  // Add any additional parameters from the docs if building a filter
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
      const cacheKey = JSON.stringify(queryParams)
      if (cache.has(cacheKey)) {
        setData(cache.get(cacheKey)!)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams({
          page: String(queryParams.page || 1),
        })

        // Forward request to proxy server at ./api/tmdb.js
        const response = await fetch(`/api/discover/movie?${params.toString()}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const json: DiscoverMovieResponse = await response.json()
        setData(json)
        cache.set(cacheKey, json)
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
