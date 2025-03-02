import { getTmdbPagination } from '@/utils/getTmdbPagination'
import { TmdbListResponse } from '@/types/tmdb'
import { useEffect, useState } from 'react'

const cache = new Map<string, TmdbListResponse>()

export interface MoviesParams {
  query?: string
  page?: number
}

const useMovies = (queryParams: MoviesParams = {}) => {
  const [data, setData] = useState<TmdbListResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const isSearching = Boolean(queryParams.query?.trim())
  const uiPage = queryParams.page || 1
  const { tmdbPage, offset } = getTmdbPagination(uiPage)

  const effectiveParams = isSearching
    ? { query: queryParams.query?.trim() || '', page: tmdbPage }
    : { page: tmdbPage }
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
        setIsLoading(false)
        setError(null)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams({
          page: String(tmdbPage),
        })
        if (isSearching) {
          params.append('query', queryParams.query!.trim())
        }

        // Forward request to proxy server at ./api/tmdb.js
        const endpoint = isSearching
          ? '/api/search/movie'
          : '/api/discover/movie'
        const response = await fetch(`${endpoint}?${params.toString()}`)

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
  }, [cacheKey, offset, tmdbPage, uiPage, isSearching, queryParams.query])

  return { isLoading, error, data }
}

export default useMovies
