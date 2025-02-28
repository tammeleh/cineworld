import { getTmdbPagination } from '@/utils/getTmdbPagination'
import { useEffect, useState } from 'react'

// In-memory cache to store full TMDB responses by effective query parameters (TMDB page)
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

export interface DiscoverMovieResponse {
  total_results: number
  total_pages: number // TMDB total pages (20 movies per page)
  results: Movie[]
  page: number
}

// https://developer.themoviedb.org/reference/discover-movie
// TMDB returns 20 movies per page.
export interface DiscoverMovieParams {
  page?: number // UI page (10 movies per UI page)
  // Add any additional parameters from the docs if building a filter
}

const useDiscoverMovies = (queryParams: DiscoverMovieParams = {}) => {
  const [data, setData] = useState<DiscoverMovieResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const uiPage = queryParams.page || 1
  // Use the helper function to get the TMDB page and offset.
  const { tmdbPage, offset } = getTmdbPagination(uiPage)

  // Build effective query parameters for caching (based on TMDB page).
  const effectiveParams = { ...queryParams, page: tmdbPage }
  const cacheKey = JSON.stringify(effectiveParams)

  useEffect(() => {
    const fetchMovies = async () => {
      if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey)!
        const transformed: DiscoverMovieResponse = {
          ...cached,
          results: cached.results.slice(offset, offset + 10),
          total_pages: cached.total_pages * 2,
          page: uiPage,
        }
        setData(transformed)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams({
          page: String(tmdbPage),
        })

        // Forward request to proxy server at ./api/tmdb.js
        const response = await fetch(`/api/discover/movie?${params.toString()}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const json: DiscoverMovieResponse = await response.json()
        cache.set(cacheKey, json)

        const transformed: DiscoverMovieResponse = {
          ...json,
          results: json.results.slice(offset, offset + 10),
          total_pages: json.total_pages * 2,
          page: uiPage,
        }
        setData(transformed)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [cacheKey, offset, tmdbPage, uiPage])

  return { isLoading, error, data }
}

export default useDiscoverMovies
