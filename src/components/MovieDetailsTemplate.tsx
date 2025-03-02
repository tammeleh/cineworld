import MovieDetailsSkeleton from '@/components/skeletons/MovieDetailsSkeleton'
import MovieMetaData from '@/components/MovieMetaData'
import getTmdbImageUrl from '@/utils/getTmdbImageUrl'
import SectionTitle from '@/components/SectionTitle'
import CastMember from '@/components/CastMember'
import ReviewCard from '@/components/ReviewCard'
import PageTitle from '@/components/PageTitle'
import CardMovie from '@/components/CardMovie'
import { MovieDetails } from '@/types/tmdb'

interface MovieDetailsTemplateProps {
  data: MovieDetails | null
  isLoading: boolean
  error?: string
}

const MovieDetailsTemplate = ({
  isLoading,
  error,
  data,
}: MovieDetailsTemplateProps) => {
  if (error) return <div>Error: {error}</div>
  if (isLoading) return <MovieDetailsSkeleton />
  if (!data) return <div>Could not fetch data :(</div>

  // Limit displayed items. Would be nice to build expand buttons/carousels instead.
  const maxCast = 10
  const maxSimilar = 3
  const maxReviews = 5

  return (
    <div className="flex flex-col gap-4 lg:gap-8">
      <section className="flex flex-col gap-4 md:flex-row">
        <div className="border-border relative aspect-[16/9] w-full overflow-hidden rounded border md:hidden">
          <img
            src={getTmdbImageUrl(data.backdrop_path, 'w500')}
            className="h-full w-full object-cover"
            alt="Movie Poster"
            loading="lazy"
          />
        </div>

        <div className="border-border relative hidden aspect-[2/3] w-full max-w-xs overflow-hidden rounded border md:block lg:max-w-auto">
          <img
            src={getTmdbImageUrl(data.poster_path, 'w780')}
            className="h-full w-full object-cover"
            alt="Movie Poster"
            loading="lazy"
          />
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

      {data.credits?.cast && data.credits.cast.length > 0 && (
        <section>
          <SectionTitle>Cast</SectionTitle>
          <ul className="flex flex-col flex-wrap gap-8 sm:flex-row">
            {data.credits.cast.slice(0, maxCast).map((member) => (
              <li key={member.id}>
                <CastMember castMember={member} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.reviews?.results && data.reviews.results.length > 0 && (
        <section>
          <SectionTitle>Reviews</SectionTitle>
          <ul className="flex flex-col gap-2">
            {data.reviews.results.slice(0, maxReviews).map((review) => (
              <li key={review.id}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.similar?.results && data.similar.results.length > 0 && (
        <section>
          <SectionTitle>Similar Movies</SectionTitle>
          <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {data.similar.results.slice(0, maxSimilar).map((movie) => (
              <li key={movie.id}>
                <CardMovie
                  imageId={movie.backdrop_path}
                  rating={movie.vote_average}
                  overview={movie.overview}
                  title={movie.title}
                  movieId={movie.id}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default MovieDetailsTemplate
