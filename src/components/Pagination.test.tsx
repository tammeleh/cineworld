import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import Pagination from './Pagination'

describe('Pagination', () => {
  it('does not render if there is only one page', () => {
    render(<Pagination onPageChange={vi.fn()} currentPage={1} totalPages={1} />)
    expect(screen.queryAllByRole('button')).toHaveLength(0)
  })

  it('renders pagination buttons and dots correctly', () => {
    render(
      <Pagination onPageChange={vi.fn()} currentPage={5} totalPages={10} />,
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(3)
    expect(screen.getAllByText('...')).toHaveLength(2)
  })

  it('calls onPageChange when a page number is clicked', () => {
    const onPageChangeMock = vi.fn()
    render(
      <Pagination
        onPageChange={onPageChangeMock}
        currentPage={5}
        totalPages={10}
      />,
    )
    const page6Button = screen.getByRole('button', { name: '6' })
    fireEvent.click(page6Button)
    expect(onPageChangeMock).toHaveBeenCalledWith(6)
  })

  it('calls onPageChange when the left arrow is clicked', () => {
    const onPageChangeMock = vi.fn()
    render(
      <Pagination
        onPageChange={onPageChangeMock}
        currentPage={5}
        totalPages={10}
      />,
    )
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(onPageChangeMock).toHaveBeenCalledWith(4)
  })

  it('calls onPageChange when the right arrow is clicked', () => {
    const onPageChangeMock = vi.fn()
    render(
      <Pagination
        onPageChange={onPageChangeMock}
        currentPage={5}
        totalPages={10}
      />,
    )
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[buttons.length - 1])
    expect(onPageChangeMock).toHaveBeenCalledWith(6)
  })

  it('disables the left arrow when currentPage is 1', () => {
    const onPageChangeMock = vi.fn()
    render(
      <Pagination
        onPageChange={onPageChangeMock}
        currentPage={1}
        totalPages={10}
      />,
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toBeDisabled()
  })

  it('disables the right arrow when currentPage equals totalPages', () => {
    const onPageChangeMock = vi.fn()
    render(
      <Pagination
        onPageChange={onPageChangeMock}
        currentPage={10}
        totalPages={10}
      />,
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons[buttons.length - 1]).toBeDisabled()
  })
})
