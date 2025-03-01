import { ReactNode } from 'react'

interface MetaDataItemProps {
  children: ReactNode
  className?: string
  label: string
}

const MetaDataItem = ({ className, children, label }: MetaDataItemProps) => {
  return (
    <div className={className}>
      {label}: <span className="text-foreground">{children}</span>
    </div>
  )
}

export default MetaDataItem
