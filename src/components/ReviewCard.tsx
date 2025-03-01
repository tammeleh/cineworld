import getTmdbImageUrl from '@/utils/getTmdbImageUrl'
import formatDate from '@/utils/formatDate'
import { Review } from '@/types/tmdb'

import Card from './Card'

interface ReviewCardProps {
  review: Review
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const authorName =
    review.author_details.name ||
    review.author_details.username ||
    review.author ||
    'Anonymous'
  const avatarUrl = getTmdbImageUrl(review.author_details.avatar_path, 'w92')
  const formattedDate = formatDate(review.created_at)

  return (
    <Card>
      <div className="mb-2 flex items-center">
        <img
          className="mr-2 size-14 rounded-full object-cover"
          alt={authorName}
          src={avatarUrl}
        />
        <div>
          <div className="font-semibold">{authorName}</div>
          <div className="text-xs text-gray-500">{formattedDate}</div>
          {review.author_details.rating != null && (
            <div className="text-xs text-yellow-500">
              Rating: {review.author_details.rating}
            </div>
          )}
        </div>
      </div>
      {/* TODO: Feels fishy, add sanitization to dangerouslySetInnerHTML={{ __html: review.content }} */}
      <div
        className="text-card-foreground line-clamp-3 text-xs"
        dangerouslySetInnerHTML={{ __html: review.content }}
      />
      <a className="text-xs text-yellow-500" href={review.url} target="_blank">
        Full review
      </a>
    </Card>
  )
}

export default ReviewCard
