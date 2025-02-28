import clsx from 'clsx'

interface SkeletonProps {
  shape?: 'circle' | 'rect'
  className?: string
}

const Skeleton = ({ shape = 'rect', className }: SkeletonProps) => {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-300',
        shape === 'circle' ? 'rounded-full' : 'rounded',
        className,
      )}
    />
  )
}

export default Skeleton
