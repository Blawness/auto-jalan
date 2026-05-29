import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MekanikCard } from '@/components/mekanik/MekanikCard'

vi.mock('next/link', () => ({
  default: ({ href, children, className, ...props }: any) => (
    <a href={href} className={className} {...props}>{children}</a>
  ),
}))

const defaultProps = {
  id: 'mek-1',
  nama: 'Budi Santoso',
  foto: 'https://example.com/foto.jpg',
  bengkel: 'Bengkel Maju',
  rating: 4.8,
  jarak: 2.3,
  spesialisasi: ['Rem', 'Mesin', 'Kelistrikan'],
}

describe('MekanikCard', () => {
  it('renders mechanic name', () => {
    render(<MekanikCard {...defaultProps} />)
    expect(screen.getByText('Budi Santoso')).toBeInTheDocument()
  })

  it('renders workshop name', () => {
    render(<MekanikCard {...defaultProps} />)
    expect(screen.getByText('Bengkel Maju')).toBeInTheDocument()
  })

  it('renders rating', () => {
    render(<MekanikCard {...defaultProps} />)
    expect(screen.getByText('4.8')).toBeInTheDocument()
  })

  it('renders distance', () => {
    render(<MekanikCard {...defaultProps} />)
    expect(screen.getByText(/2\.3 km/)).toBeInTheDocument()
  })

  it('links to the correct montir detail page', () => {
    render(<MekanikCard {...defaultProps} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/montir/mek-1')
  })

  it('renders all 3 specialization chips when given exactly 3', () => {
    render(<MekanikCard {...defaultProps} />)
    expect(screen.getByText('Rem')).toBeInTheDocument()
    expect(screen.getByText('Mesin')).toBeInTheDocument()
    expect(screen.getByText('Kelistrikan')).toBeInTheDocument()
  })

  it('renders only 3 chips when given 4+ specializations', () => {
    render(
      <MekanikCard
        {...defaultProps}
        spesialisasi={['Rem', 'Mesin', 'Kelistrikan', 'Transmisi']}
      />
    )
    expect(screen.getByText('Rem')).toBeInTheDocument()
    expect(screen.getByText('Mesin')).toBeInTheDocument()
    expect(screen.getByText('Kelistrikan')).toBeInTheDocument()
    expect(screen.queryByText('Transmisi')).not.toBeInTheDocument()
  })
})
