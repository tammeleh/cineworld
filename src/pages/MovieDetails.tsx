import MovieMetaData from '@/components/MovieMetaData'
import useMovieDetails from '@/hooks/useMovieDetails'
import getTmdbImageUrl from '@/utils/getTmdbImageUrl'
import SectionTitle from '@/components/SectionTitle'
import CastMember from '@/components/CastMember'
import ReviewCard from '@/components/ReviewCard'
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

  // Limit displayed items. Would be nice to build expand buttons/carousels instead.
  const maxCast = 10
  const maxSimilar = 10
  const maxReviews = 5

  return (
    <div className="flex flex-col gap-4 lg:gap-8">
      <section className="flex flex-col gap-4 md:flex-row">
        <div className="md:hidden">
          <div className="border-border relative aspect-[16/9] w-full overflow-hidden rounded border">
            <img
              src={getTmdbImageUrl(data.backdrop_path, 'w500')}
              className="h-full w-full object-cover"
              alt="Movie Poster"
              loading="lazy"
            />
          </div>
        </div>

        <div className="hidden md:block">
          <div className="border-border relative aspect-[2/3] w-full max-w-xs overflow-hidden rounded border lg:max-w-auto">
            <img
              src={getTmdbImageUrl(data.poster_path, 'w780')}
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
            className="max-w-[31.25rem] text-sm font-thin text-gray-500 lg:max-w-[50rem] lg:text-base"
            aria-label="Movie overview"
          >
            {data.overview}
          </p>
        </div>
      </section>

      <section>
        <SectionTitle>Cast</SectionTitle>
        {data.credits?.cast && data.credits.cast.length > 0 ? (
          <ul className="flex flex-col flex-wrap gap-8 sm:flex-row">
            {data.credits.cast.slice(0, maxCast).map((member) => (
              <li key={member.id}>
                <CastMember castMember={member} />
              </li>
            ))}
          </ul>
        ) : (
          <div>No cast information available.</div>
        )}
      </section>

      <section>
        <SectionTitle>Reviews</SectionTitle>
        {data.reviews?.results && data.reviews.results.length > 0 && (
          <ul className="flex flex-col gap-2">
            {data.reviews.results.slice(0, maxReviews).map((review) => (
              <li key={review.id}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <Card>
          {data.similar?.results && data.similar.results.length > 0 && (
            <>
              <SectionTitle>Similar Movies</SectionTitle>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {data.similar.results.slice(0, maxSimilar).map((movie) => (
                  <li key={movie.id}>{movie.title}</li>
                ))}
              </ul>
            </>
          )}
        </Card>
      </section>
    </div>
  )
}

export default MovieDetails
