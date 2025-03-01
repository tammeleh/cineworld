import useMovieDetails from '@/hooks/useMovieDetails'
import { useParams } from 'react-router-dom'
import Card from '@/components/Card'

const MovieDetails = () => {
  const { id } = useParams()
  const { isLoading, error, data } = useMovieDetails(id!)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data) return <div>No data found.</div>
  console.log(data)

  // Limit displayed items
  const maxCast = 10
  const maxSimilar = 10
  const maxReviews = 5

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <h1>{data.title}</h1>

        {data.overview && <p>{data.overview}</p>}
      </Card>

      {data.credits?.cast?.length > 0 && (
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
        {data.similar?.results?.length > 0 && (
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
        {data.reviews?.results?.length > 0 && (
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
  )
}

export default MovieDetails
