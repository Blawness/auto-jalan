import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SparepartCard } from '@/components/sparepart/SparepartCard'

vi.mock('next/link', () => ({
  default: ({ href, children, className, ...props }: any) => (
    <a href={href} className={className} {...props}>{children}</a>
  ),
}))

const defaultProps = {
  id: 'sp-1',
  nama: 'Kampas Rem Belakang',
  harga: 85000,
  foto: 'https://example.com/foto.jpg',
  keaslian: 'OEM' as const,
  stok: 10,
}

describe('SparepartCard', () => {
  it('renders product name', () => {
    render(<SparepartCard {...defaultProps} />)
    expect(screen.getByText('Kampas Rem Belakang')).toBeInTheDocument()
  })

  it('renders formatted price containing the amount', () => {
    render(<SparepartCard {...defaultProps} />)
    const priceEl = screen.getByText(/85/)
    expect(priceEl).toBeInTheDocument()
  })

  it('links to the correct sparepart detail page', () => {
    render(<SparepartCard {...defaultProps} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/sparepart/sp-1')
  })

  it('renders keaslian badge', () => {
    render(<SparepartCard {...defaultProps} />)
    expect(screen.getByText('OEM')).toBeInTheDocument()
  })

  it('renders stok badge "Tersedia" when stok is high', () => {
    render(<SparepartCard {...defaultProps} />)
    expect(screen.getByText('Tersedia')).toBeInTheDocument()
  })

  it('has opacity-60 and pointer-events-none when stok is 0', () => {
    render(<SparepartCard {...defaultProps} stok={0} />)
    const link = screen.getByRole('link')
    expect(link).toHaveClass('opacity-60', 'pointer-events-none')
  })

  it('does not have disabled classes when stok is positive', () => {
    render(<SparepartCard {...defaultProps} stok={5} />)
    const link = screen.getByRole('link')
    expect(link).not.toHaveClass('opacity-60')
    expect(link).not.toHaveClass('pointer-events-none')
  })
})
