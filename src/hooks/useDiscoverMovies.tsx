import { getTmdbPagination } from '@/utils/getTmdbPagination'
import { TmdbListResponse } from '@/types/tmdb'
import { useEffect, useState } from 'react'

const cache = new Map<string, TmdbListResponse>()

export interface DiscoverMovieParams {
  page?: number
  // Add any additional parameters from the docs if building a filter.
}

const useDiscoverMovies = (queryParams: DiscoverMovieParams = {}) => {
  const [data, setData] = useState<TmdbListResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const uiPage = queryParams.page || 1
  const { tmdbPage, offset } = getTmdbPagination(uiPage)

  const effectiveParams = { ...queryParams, page: tmdbPage }
  const cacheKey = JSON.stringify(effectiveParams)

  useEffect(() => {
    const fetchMovies = async () => {
      if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey)!
        const transformed: TmdbListResponse = {
          ...cached,
          results: cached.results.slice(offset, offset + 10),
          total_pages: Math.ceil(cached.total_results / 10),
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
        const json: TmdbListResponse = await response.json()
        cache.set(cacheKey, json)

        const transformed: TmdbListResponse = {
          ...json,
          results: json.results.slice(offset, offset + 10),
          total_pages: Math.ceil(json.total_results / 10),
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
