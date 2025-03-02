// https://developer.themoviedb.org/reference/movie-details
export interface MovieDetails {
  production_companies: {
    logo_path: string | null
    origin_country: string
    name: string
    id: number
  }[]
  similar: {
    results: MovieSummary[]
    total_results: number
    total_pages: number
    page: number
  }
  reviews: {
    total_results: number
    total_pages: number
    results: Review[]
    page: number
  }
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  credits: {
    cast: CastMember[]
    crew: CrewMember[]
  }
  production_countries: { iso_3166_1: string; name: string }[]
  genres: { name: string; id: number }[]
  backdrop_path: string | null
  poster_path: string | null
  original_language: string
  homepage: string | null
  imdb_id: string | null
  original_title: string
  runtime: number | null
  release_date: string
  vote_average: number
  popularity: number
  vote_count: number
  overview: string
  revenue: number
  tagline: string
  adult: boolean
  budget: number
  status: string
  video: boolean
  title: string
  id: number
}

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

export interface MovieSummary {
  backdrop_path: string | null
  poster_path: string | null
  original_language: string
  original_title: string
  release_date: string
  vote_average: number
  vote_count: number
  popularity: number
  overview: string
  adult: boolean
  title: string
  id: number
}

export interface Review {
  author_details: {
    avatar_path: string | null
    rating: number | null
    username: string
    name: string
  }
  created_at: string
  updated_at: string
  content: string
  author: string
  url: string
  id: string
}

export interface CastMember {
  profile_path: string | null
  gender: number | null
  character: string
  credit_id: string
  cast_id: number
  order: number
  name: string
  id: number
}

export interface CrewMember {
  profile_path: string | null
  gender: number | null
  department: string
  credit_id: string
  name: string
  job: string
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
