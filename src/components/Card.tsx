import { ReactNode } from 'react'
import clsx from 'clsx'

const Card = ({
  className,
  children,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <section
      className={clsx('bg-card border-border rounded border p-2', className)}
    >
      {children}
    </section>
  )
}

export default Card
