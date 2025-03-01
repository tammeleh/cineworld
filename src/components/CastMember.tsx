import getTmdbImageUrl from '@/utils/getTmdbImageUrl'
import { CastMember } from '@/types/tmdb'
import clsx from 'clsx'

interface CastMemberCardProps {
  castMember: CastMember
  className?: string
}

const CastMemberCard = ({ castMember, className }: CastMemberCardProps) => {
  const imageUrl = getTmdbImageUrl(castMember.profile_path, 'w92')

  return (
    <div className={clsx('flex items-center space-x-4', className)}>
      <img
        className="h-16 w-16 rounded-full object-cover"
        alt={castMember.name}
        src={imageUrl}
      />
      <div className="flex flex-col">
        <span className="font-semibold">{castMember.name}</span>
        <span className="text-sm text-gray-500">{castMember.character}</span>
      </div>
    </div>
  )
}

export default CastMemberCard
