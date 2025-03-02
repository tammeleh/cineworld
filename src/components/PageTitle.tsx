import { ReactNode } from 'react'
import clsx from 'clsx'

interface PageTitleProps {
  children: ReactNode
  className?: string
}

const PageTitle = ({ className, children }: PageTitleProps) => {
  return (
    <h1
      className={clsx(
        'md:mb-8" mb-4 text-2xl tracking-wide lg:text-4xl',
        className,
      )}
    >
      {children}
    </h1>
  )
}

export default PageTitle
