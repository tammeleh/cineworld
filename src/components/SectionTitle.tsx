import { ReactNode } from 'react'
import clsx from 'clsx'

interface SectionTitleProps {
  children: ReactNode
  className?: string
}

const SectionTitle = ({ className, children }: SectionTitleProps) => {
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
