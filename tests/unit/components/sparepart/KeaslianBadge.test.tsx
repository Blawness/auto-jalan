import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { KeaslianBadge } from '@/components/sparepart/KeaslianBadge'

describe('KeaslianBadge', () => {
  it('renders OEM with green classes', () => {
    render(<KeaslianBadge keaslian="OEM" />)
    const badge = screen.getByText('OEM')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-green-100', 'text-green-800')
  })

  it('renders Aftermarket with blue classes', () => {
    render(<KeaslianBadge keaslian="Aftermarket" />)
    const badge = screen.getByText('Aftermarket')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-blue-100', 'text-blue-800')
  })

  it('renders KW with yellow classes', () => {
    render(<KeaslianBadge keaslian="KW" />)
    const badge = screen.getByText('KW')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800')
  })
})
