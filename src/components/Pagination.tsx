import ArrowRight from '@/assets/arrow-right.svg?react'
import clsx from 'clsx'

const DOTS = '...'

interface PaginationProps {
  onPageChange: (page: number) => void
  currentPage: number
  totalPages: number
}

// TODO: Improve Styles
const Pagination = ({
  onPageChange,
  currentPage,
  totalPages,
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
    'flex h-8 min-w-14 transition-colors items-center justify-center rounded disabled:bg-gray-500'
  const arrowBtnStyle = clsx(
    'hover:bg-blue-500 disabled:bg-transparent',
    btnBaseStyle,
  )

  return (
    <div className="mt-4 flex w-14 items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={arrowBtnStyle}
      >
        <ArrowRight className="size-4 rotate-180" fill="white" />
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
                ? 'pointer-events-none bg-blue-500 text-white'
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
        <ArrowRight className="size-4 border-0" fill="white" />
      </button>
    </div>
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
