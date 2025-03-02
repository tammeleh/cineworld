import MovieDetailsTemplate from '@/components/MovieDetailsTemplate'
import useMovieDetails from '@/hooks/useMovieDetails'
import { useParams } from 'react-router-dom'

const MovieDetails = () => {
  const { id } = useParams()
  const { isLoading, error, data } = useMovieDetails(id)

  return (
    <MovieDetailsTemplate
      error={error ? error.message : undefined}
      isLoading={isLoading}
      data={data}
    />
  )
}

export default MovieDetails
