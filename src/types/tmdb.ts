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
// https://developer.themoviedb.org/reference/search-movie
export interface TmdbListResponse {
  total_results: number
  total_pages: number // TMDB total pages (20 items per page)
  results: Movie[]
  page: number
}
