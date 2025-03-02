import { ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
}

const Card = ({ className, children }: CardProps) => {
  return (
    <section
      className={clsx('bg-card border-border rounded border p-2', className)}
    >
      {children}
    </section>
  )
}

export default Card
