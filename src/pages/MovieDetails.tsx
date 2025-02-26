import { useParams } from 'react-router-dom'

const MovieDetails = () => {
  const { id } = useParams()

  return <div>Movie Details for movie id: {id}</div>
}

export default MovieDetails
