import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StokBadge } from '@/components/sparepart/StokBadge'

describe('StokBadge', () => {
  it('shows "Kosong" with red styling when stok is 0', () => {
    render(<StokBadge stok={0} />)
    const badge = screen.getByText('Kosong')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('text-red-600')
  })

  it('shows "Sisa 1" with amber styling when stok is 1', () => {
    render(<StokBadge stok={1} />)
    const badge = screen.getByText('Sisa 1')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('text-amber-600')
  })

  it('shows "Sisa 3" with amber styling when stok is 3', () => {
    render(<StokBadge stok={3} />)
    const badge = screen.getByText('Sisa 3')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('text-amber-600')
  })

  it('shows "Tersedia" with green styling when stok is 4', () => {
    render(<StokBadge stok={4} />)
    const badge = screen.getByText('Tersedia')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('text-green-600')
  })

  it('shows "Tersedia" when stok is 100', () => {
    render(<StokBadge stok={100} />)
    expect(screen.getByText('Tersedia')).toBeInTheDocument()
  })
})
