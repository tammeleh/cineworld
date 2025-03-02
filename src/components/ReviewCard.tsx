import getTmdbImageUrl from '@/utils/getTmdbImageUrl'
import formatDate from '@/utils/formatDate'
import { Review } from '@/types/tmdb'
import Card from '@/components/Card'

interface ReviewCardProps {
  review: Review
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const authorName =
    review.author ||
    review.author_details.username ||
    review.author_details.name ||
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
          {review.author_details.rating != null && (
            <div className="text-xs">
              Rating:{' '}
              <span className="text-yellow-500">
                {review.author_details.rating}
              </span>
            </div>
          )}
          <div className="text-xs text-gray-500">{formattedDate}</div>
        </div>
      </div>
      {/* TODO: Feels fishy, add sanitization to dangerouslySetInnerHTML={{ __html: review.content }} */}
      <div
        dangerouslySetInnerHTML={{ __html: review.content }}
        className="line-clamp-3 text-xs text-gray-500"
      />
      <a
        className="mt-2 block text-right text-xs text-yellow-50 hover:underline"
        href={review.url}
        target="_blank"
      >
        Full review
      </a>
    </Card>
  )
}

export default ReviewCard
