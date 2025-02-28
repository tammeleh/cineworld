import ArrowRight from '@/assets/arrow-right.svg?react'
import clsx from 'clsx'

const DOTS = '...'

interface PaginationProps {
  onPageChange: (page: number) => void
  currentPage: number
  totalPages: number
  className?: string
}

const Pagination = ({
  onPageChange,
  currentPage,
  totalPages,
  className,
}: PaginationProps) => {
  const paginationRange = getPaginationRange(currentPage, totalPages)

  // Don't render if no pages exist or there's only one page.
  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onPageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page)
    }
  }

  const btnBaseStyle =
    'flex h-6 md:h-8 min-w-8 md:min-w-14 transition-colors text-xs md:text-md items-center justify-center rounded disabled:bg-gray-500'
  const arrowBtnStyle = clsx(
    'group hover:bg-yellow-500 hover:fill-black disabled:bg-transparent',
    btnBaseStyle,
  )
  const arrowIconStyle =
    'size-2 fill-white transition-colors group-hover:fill-black md:size-4'

  return (
    <nav
      className={clsx(
        'flex w-full items-center justify-center gap-2',
        className,
      )}
      aria-labelledby="pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={arrowBtnStyle}
      >
        <ArrowRight className={clsx(arrowIconStyle, 'rotate-180')} />
      </button>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <span className="px-3 py-1" key={index}>
              {DOTS}
            </span>
          )
        }
        return (
          <button
            className={clsx(
              btnBaseStyle,
              'border',
              pageNumber === currentPage
                ? 'pointer-events-none border border-white bg-yellow-500 text-black'
                : '',
            )}
            onClick={() => onPageClick(pageNumber as number)}
            key={index}
          >
            {pageNumber}
          </button>
        )
      })}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={arrowBtnStyle}
      >
        <ArrowRight className={arrowIconStyle} />
      </button>
    </nav>
  )
}

export default Pagination

/**
 * Calculates a pagination range.
 * - If totalPages ≤ 7, returns all page numbers.
 * - If currentPage is near the beginning, shows pages 1–5, then DOTS and the last page.
 * - If currentPage is near the end, shows the first page, DOTS, then the last 5 pages.
 * - Otherwise, shows the first page, DOTS, currentPage–1, currentPage, currentPage+1, DOTS, and the last page.
 */
const getPaginationRange = (
  currentPage: number,
  totalPages: number,
): (number | '...')[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // Near the beginning
  if (currentPage <= 4) {
    return [...Array.from({ length: 5 }, (_, i) => i + 1), DOTS, totalPages]
  }

  // Near the end
  if (currentPage >= totalPages - 3) {
    return [1, DOTS, ...Array.from({ length: 5 }, (_, i) => totalPages - 4 + i)]
  }

  // Somewhere in the middle
  return [
    1,
    DOTS,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    DOTS,
    totalPages,
  ]
}
