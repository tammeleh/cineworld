import MovieCardListSkeleton from '@/components/skeletons/MovieCardListSkeleton'
import Skeleton from '@/components/skeletons/Skeleton'
import SectionTitle from '@/components/SectionTitle'
import Card from '@/components/Card'

const MovieDetailsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 lg:gap-8">
      <section className="flex flex-col gap-4 md:flex-row">
        <div className="md:hidden">
          <div className="border-border aspect-[16/9] w-full rounded border">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
        <div className="hidden md:block">
          <div className="md:h-[478px] md:w-[318px]">
            <Skeleton className="h-full w-full" />
          </div>
        </div>

        <div className="flex-1">
          <Skeleton className="mb-4 h-6 w-1/3 lg:h-10" />
          <div className="mb-4 flex flex-col gap-2">
            <div className="flex gap-2">
              <Skeleton className="h-4 w-20 lg:h-5 lg:w-[120px]" />
              <Skeleton className="h-4 w-32 lg:h-5 lg:w-[180px]" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-4 w-20 lg:h-5 lg:w-[120px]" />
              <Skeleton className="h-4 w-32 lg:h-5 lg:w-[180px]" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-4 w-20 lg:h-5 lg:w-[120px]" />
              <Skeleton className="h-4 w-32 lg:h-5 lg:w-[180px]" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-4 w-20 lg:h-5 lg:w-[120px]" />
              <Skeleton className="h-4 w-32 lg:h-5 lg:w-[180px]" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-4 w-20 lg:h-5 lg:w-[120px]" />
              <Skeleton className="h-4 w-32 lg:h-5 lg:w-[180px]" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-4 w-20 lg:h-5 lg:w-[120px]" />
              <Skeleton className="h-4 w-32 lg:h-5 lg:w-[180px]" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-4 w-20 lg:h-5 lg:w-[120px]" />
              <Skeleton className="h-4 w-32 lg:h-5 lg:w-[180px]" />
            </div>
          </div>
          <Skeleton className="h-20 w-full max-w-[500px]" />
        </div>
      </section>
      <section>
        <SectionTitle>Cast</SectionTitle>
        <ul className="flex flex-col flex-wrap gap-8 sm:flex-row">
          {Array.from({ length: 10 }).map((_, i) => (
            <li className="flex items-center space-x-4" key={i}>
              <Skeleton className="h-16 w-16" shape="circle" />
              <div className="flex flex-col space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionTitle>Reviews</SectionTitle>
        <ul className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i}>
              <Card>
                <div className="mb-2 flex items-center">
                  <Skeleton className="mr-2 size-14" shape="circle" />
                  <div className="flex flex-1 flex-col space-y-1">
                    <Skeleton className="h-4 w-26" />
                    <Skeleton className="h-3 w-18" />
                    <Skeleton className="h-3 w-18" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                </div>
                <Skeleton className="mt-2 ml-auto h-3 w-24" />
              </Card>{' '}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionTitle>Similar Movies</SectionTitle>
        <MovieCardListSkeleton cardAmount={3} />
      </section>
    </div>
  )
}

export default MovieDetailsSkeleton
