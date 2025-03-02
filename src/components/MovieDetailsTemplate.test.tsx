import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MovieDetails } from '@/types/tmdb'

import MovieDetailsTemplate from './MovieDetailsTemplate'

const sampleMovieDetails: MovieDetails = {
  reviews: {
    results: [
      {
        author_details: {
          avatar_path: '/mwR7rFHoDcobAx1i61I3skzMW3U.jpg',
          username: 'r96sk',
          rating: 8,
          name: '',
        },
        content:
          "Rubbish poster aside, <em>'Mufasa: The Lion King'</em> is a success. ...",
        url: 'https://www.themoviedb.org/review/6769a84846a5a438790b24d1',
        created_at: '2024-12-23T18:13:28.704Z',
        updated_at: '2024-12-23T18:13:28.807Z',
        id: '6769a84846a5a438790b24d1',
        author: 'r96sk',
      },
      {
        author_details: {
          avatar_path: '/yz2HPme8NPLne0mM8tBnZ5ZWJzf.jpg',
          username: 'Geronimo1967',
          name: 'CinemaSerf',
          rating: 6,
        },
        content:
          "They've been praying for rain for ages but are ill-prepared ...",
        url: 'https://www.themoviedb.org/review/676a6df0a05c09ebea7eae94',
        created_at: '2024-12-24T08:16:48.389Z',
        updated_at: '2024-12-24T08:16:48.764Z',
        id: '676a6df0a05c09ebea7eae94',
        author: 'CinemaSerf',
      },
    ],
    total_results: 2,
    total_pages: 1,
    page: 1,
  },
  credits: {
    cast: [
      {
        profile_path: '/z2cMMZyWzv5ztT6pFdAAjB3u7CQ.jpg',
        credit_id: '6784ce60bd793c03544ec5ff',
        character: 'Mufasa (voice)',
        name: 'Aaron Pierre',
        id: 1763709,
        cast_id: 73,
        gender: 2,
        order: 0,
      },
      {
        profile_path: '/6kpDyaZzmSbqCNYuXZUfeMwS1bq.jpg',
        credit_id: '61290ee48d1b8e00274ef40e',
        name: 'Kelvin Harrison, Jr.',
        character: 'Taka (voice)',
        id: 1344361,
        cast_id: 13,
        gender: 2,
        order: 1,
      },
    ],
    crew: [],
  },
  similar: {
    results: [
      {
        overview: 'Prince Ali wants the Golden Idol of Watusi ...',
        backdrop_path: '/8ymrBz3UnUqZSW4qKotOzk1zncF.jpg',
        poster_path: '/5kSUbRTBUru1ELMdiG8ofadX6Tf.jpg',
        original_title: 'The Golden Idol',
        release_date: '1954-01-10',
        title: 'The Golden Idol',
        original_language: 'en',
        vote_average: 4.2,
        popularity: 1.323,
        vote_count: 4,
        adult: false,
        id: 252904,
      },
    ],
    total_results: 1,
    total_pages: 1,
    page: 1,
  },
  overview:
    'Mufasa, a cub lost and alone, meets a sympathetic lion named Taka, the heir to a royal bloodline. The chance meeting sets in motion an expansive journey of a group of misfits searching for their destiny.',
  production_companies: [
    {
      logo_path: '/wdrCwmRnLFJhEoH8GSfymY85KHT.png',
      name: 'Walt Disney Pictures',
      origin_country: 'US',
      id: 2,
    },
  ],
  genres: [
    { name: 'Adventure', id: 12 },
    { name: 'Family', id: 10751 },
    { name: 'Animation', id: 16 },
  ],
  spoken_languages: [
    { english_name: 'English', iso_639_1: 'en', name: 'English' },
  ],
  production_countries: [
    { name: 'United States of America', iso_3166_1: 'US' },
  ],
  homepage: 'https://movies.disney.com/mufasa-the-lion-king',
  tagline: 'The story of an orphan who would be king.',
  backdrop_path: '/oHPoF0Gzu8xwK4CtdXDaWdcuZxZ.jpg',
  poster_path: '/lurEK87kukWNaHd0zYnsi3yzJrs.jpg',
  title: 'Mufasa: The Lion King',
  release_date: '2024-12-18',
  original_language: 'en',
  imdb_id: 'tt13186482',
  popularity: 2300.734,
  vote_average: 7.463,
  original_title: '',
  revenue: 700197856,
  status: 'Released',
  budget: 200000000,
  vote_count: 1465,
  adult: false,
  runtime: 118,
  video: false,
  id: 762509,
}

describe('MovieDetailsTemplate', () => {
  it('renders the movie title, overview and metadata', () => {
    render(
      <MemoryRouter>
        <MovieDetailsTemplate data={sampleMovieDetails} isLoading={false} />
      </MemoryRouter>,
    )
    const pageTitle = screen.getByRole('heading', {
      name: /Mufasa: The Lion King/i,
    })
    expect(pageTitle).toBeInTheDocument()

    expect(
      screen.getByText(/Mufasa, a cub lost and alone/i),
    ).toBeInTheDocument()

    expect(screen.getByText(/Dec 18, 2024/i)).toBeInTheDocument()
  })

  it('renders a loading state', () => {
    render(
      <MemoryRouter>
        <MovieDetailsTemplate isLoading={true} data={null} />
      </MemoryRouter>,
    )
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('renders an error state', () => {
    render(
      <MemoryRouter>
        <MovieDetailsTemplate
          error="Test error message"
          isLoading={false}
          data={null}
        />
      </MemoryRouter>,
    )
    expect(screen.getByText(/Error: Test error message/i)).toBeInTheDocument()
  })

  it('renders the cast section', () => {
    render(
      <MemoryRouter>
        <MovieDetailsTemplate data={sampleMovieDetails} isLoading={false} />
      </MemoryRouter>,
    )
    expect(screen.getByText(/Aaron Pierre/i)).toBeInTheDocument()
    expect(screen.getByText(/Mufasa \(voice\)/i)).toBeInTheDocument()
  })

  it('renders the reviews section', () => {
    render(
      <MemoryRouter>
        <MovieDetailsTemplate data={sampleMovieDetails} isLoading={false} />
      </MemoryRouter>,
    )
    expect(screen.getByText(/Rubbish poster aside/i)).toBeInTheDocument()
    expect(screen.getByText(/r96sk/i)).toBeInTheDocument()
  })

  it('renders the similar movies section', () => {
    render(
      <MemoryRouter>
        <MovieDetailsTemplate data={sampleMovieDetails} isLoading={false} />
      </MemoryRouter>,
    )

    const similarMovies = screen.getAllByText(/The Golden Idol/i)
    expect(similarMovies.length).toBeGreaterThan(0)
  })
})
