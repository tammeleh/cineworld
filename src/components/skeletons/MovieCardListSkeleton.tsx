import Skeleton from '@/components/skeletons/Skeleton'
import Card from '@/components/Card'

const MovieCardSkeleton = () => {
  return (
    <Card className="flex h-full flex-col gap-1">
      <Skeleton className="relative aspect-[16/9] w-full animate-pulse rounded-t" />
      <Skeleton className="mt-2 h-4 w-3/5" />
      <div className="mt-2 space-y-1">
        <Skeleton className="h-3" />
        <Skeleton className="h-3" />
        <Skeleton className="h-3" />
        <Skeleton className="h-3" />
        <Skeleton className="h-3" />
      </div>
      <div className="ml-auto inline">
        <div className="h-3 w-12 animate-pulse rounded bg-gray-300" />
      </div>
    </Card>
  )
}

interface MovieCardListSkeletonProps {
  cardAmount?: number
}
const MovieCardListSkeleton = ({
  cardAmount = 10,
}: MovieCardListSkeletonProps) => {
  const skeletons = Array.from({ length: cardAmount }, (_, i) => i)
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
      {skeletons.map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default MovieCardListSkeleton
