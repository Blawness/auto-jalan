import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThreadCard } from '@/components/forum/ThreadCard'

vi.mock('next/link', () => ({
  default: ({ href, children, className, ...props }: any) => (
    <a href={href} className={className} {...props}>{children}</a>
  ),
}))

const defaultProps = {
  id: 'thread-1',
  judul: 'Kenapa mesin motor sering mati?',
  kategori: 'Mesin',
  penulis: 'Andi',
  jumlahJawaban: 5,
  waktu: '2 jam lalu',
}

describe('ThreadCard', () => {
  it('renders thread title', () => {
    render(<ThreadCard {...defaultProps} />)
    expect(screen.getByText('Kenapa mesin motor sering mati?')).toBeInTheDocument()
  })

  it('renders category badge', () => {
    render(<ThreadCard {...defaultProps} />)
    expect(screen.getByText('Mesin')).toBeInTheDocument()
  })

  it('renders author name', () => {
    render(<ThreadCard {...defaultProps} />)
    expect(screen.getByText('Andi')).toBeInTheDocument()
  })

  it('renders answer count', () => {
    render(<ThreadCard {...defaultProps} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('renders relative time', () => {
    render(<ThreadCard {...defaultProps} />)
    expect(screen.getByText('2 jam lalu')).toBeInTheDocument()
  })

  it('links to the correct forum thread page', () => {
    render(<ThreadCard {...defaultProps} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/forum/thread-1')
  })
})
