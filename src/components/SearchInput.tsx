import Search from '@/assets/search.svg?react'
import { ChangeEvent, FormEvent } from 'react'
import clsx from 'clsx'

interface SearchInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSearch?: () => void
  placeholder?: string
  className?: string
  value: string
}

const SearchInput = ({
  placeholder,
  className,
  onChange,
  onSearch,
  value,
}: SearchInputProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch?.()
  }

  return (
    <form className={clsx('relative mt-2', className)} onSubmit={handleSubmit}>
      <input
        className="peer bg-background block w-full px-3 py-1.5 pr-10 text-sm/6 outline-none placeholder:text-gray-500 focus:outline"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type="search"
      />
      <div
        className="border-border absolute inset-x-0 bottom-0 border-t peer-focus:border-t-2 peer-focus:border-yellow-500"
        aria-hidden="true"
      />
      <button className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 transform cursor-pointer items-center justify-center">
        <Search className="size-4 fill-yellow-500" />
      </button>
    </form>
  )
}

export default SearchInput
