import MovieListTemplate from '@/components/MovieListTemplate'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { TmdbListResponse } from '@/types/tmdb'

const sampleData: TmdbListResponse = {
  results: [
    {
      overview:
        'Two highly trained operatives grow close from a distance after being sent to guard opposite sides of a mysterious gorge.',
      backdrop_path: '/dummy-backdrop.jpg',
      poster_path: '/dummy-poster.jpg',
      genre_ids: [10749, 878, 53],
      original_title: 'The Gorge',
      release_date: '2025-02-13',
      original_language: 'en',
      popularity: 3114.265,
      title: 'The Gorge',
      vote_average: 7.79,
      vote_count: 1477,
      adult: false,
      video: false,
      id: 950396,
    },
    {
      overview: 'A U.S. Marshal escorts a government witness to trial...',
      backdrop_path: '/dummy-backdrop-2.jpg',
      poster_path: '/dummy-poster-2.jpg',
      original_title: 'Flight Risk',
      release_date: '2025-01-22',
      genre_ids: [28, 53, 80],
      original_language: 'en',
      popularity: 2865.763,
      title: 'Flight Risk',
      vote_average: 5.967,
      vote_count: 307,
      adult: false,
      video: false,
      id: 1126166,
    },
  ],
  total_results: 1000,
  total_pages: 100,
  page: 1,
}

describe('MovieListTemplate', () => {
  it('renders skeleton when loading', () => {
    render(
      <MemoryRouter>
        <MovieListTemplate
          onSearchChange={() => {}}
          onPageChange={() => {}}
          isLoading={true}
          totalPages={100}
          currentPage={1}
          searchQuery=""
          data={null}
        />
      </MemoryRouter>,
    )
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('renders error state', () => {
    render(
      <MemoryRouter>
        <MovieListTemplate
          error="Something went wrong"
          onSearchChange={() => {}}
          onPageChange={() => {}}
          isLoading={false}
          totalPages={100}
          currentPage={1}
          searchQuery=""
          data={null}
        />
      </MemoryRouter>,
    )
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
  })

  it('renders no results message when searching and no data is provided', () => {
    render(
      <MemoryRouter>
        <MovieListTemplate
          onSearchChange={() => {}}
          onPageChange={() => {}}
          searchQuery="mufasa"
          isLoading={false}
          totalPages={100}
          currentPage={1}
          data={null}
        />
      </MemoryRouter>,
    )
    expect(
      screen.getByText(/Found no results for "mufasa"/i),
    ).toBeInTheDocument()
  })

  it('renders movie list when data is provided', () => {
    render(
      <MemoryRouter>
        <MovieListTemplate
          onSearchChange={() => {}}
          onPageChange={() => {}}
          isLoading={false}
          data={sampleData}
          totalPages={100}
          currentPage={1}
          searchQuery=""
        />
      </MemoryRouter>,
    )
    expect(screen.getByText(/The Gorge/i)).toBeInTheDocument()
    expect(screen.getByText(/Flight Risk/i)).toBeInTheDocument()
  })
})
