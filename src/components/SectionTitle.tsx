import { ReactNode } from 'react'
import clsx from 'clsx'

const SectionTitle = ({
  className,
  children,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <h2
      className={clsx(
        'md:mb-8" mb-4 text-xl tracking-wide lg:text-2xl',
        className,
      )}
    >
      {children}
    </h2>
  )
}

export default SectionTitle
