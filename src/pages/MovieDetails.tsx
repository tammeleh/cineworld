import MovieMetaData from '@/components/MovieMetaData'
import useMovieDetails from '@/hooks/useMovieDetails'
import getTmdbImageUrl from '@/utils/getTmdbImageUrl'
import PageTitle from '@/components/PageTitle'
import { useParams } from 'react-router-dom'
import Card from '@/components/Card'

const MovieDetails = () => {
  const { id } = useParams()
  const { isLoading, error, data } = useMovieDetails(id)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data) return <div>No data found.</div>
  console.log(data)

  // Limit displayed items
  const maxCast = 10
  const maxSimilar = 10
  const maxReviews = 5

  return (
    <div className="">
      <section className="flex flex-col gap-4 md:flex-row">
        <div className="mb-4 md:hidden">
          <div className="border-border relative aspect-[16/9] w-full overflow-hidden rounded border">
            <img
              src={getTmdbImageUrl(data.backdrop_path)}
              className="h-full w-full object-cover"
              alt="Movie Poster"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mb-4 hidden md:block">
          <div className="border-border relative aspect-[2/3] w-full max-w-xs overflow-hidden rounded border lg:max-w-auto">
            <img
              src={getTmdbImageUrl(data.poster_path)}
              className="h-full w-full object-cover"
              alt="Movie Poster"
              loading="lazy"
            />
          </div>
        </div>
        <div>
          <PageTitle>{data.title}</PageTitle>
          <MovieMetaData data={data} />
          <p
            className="text-paragraph max-w-[500px] text-sm font-thin lg:max-w-[800px] lg:text-base"
            aria-label="Movie overview"
          >
            {data.overview}
          </p>
        </div>
      </section>

      <div className="flex flex-col gap-8">
        {data.credits?.cast && data.credits.cast.length > 0 && (
          <>
            <h2>Cast</h2>
            <ul>
              {data.credits.cast.slice(0, maxCast).map((member) => (
                <li key={member.id}>
                  {member.name} as {member.character}
                </li>
              ))}
            </ul>
          </>
        )}
        <Card>
          {data.similar?.results && data.similar.results.length > 0 && (
            <>
              <h2>Similar Movies</h2>
              <ul>
                {data.similar.results.slice(0, maxSimilar).map((movie) => (
                  <li key={movie.id}>{movie.title}</li>
                ))}
              </ul>
            </>
          )}
        </Card>
        <Card>
          {data.reviews?.results && data.reviews.results.length > 0 && (
            <>
              <h2>Reviews</h2>
              <ul>
                {data.reviews.results.slice(0, maxReviews).map((review) => (
                  <li key={review.id}>
                    <strong>{review.author}:</strong> {review.content}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

export default MovieDetails
