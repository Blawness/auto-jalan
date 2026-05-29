import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StarRating } from '@/components/rating/StarRating'

describe('StarRating', () => {
  it('renders 5 star buttons by default', () => {
    render(<StarRating value={0} onChange={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(5)
  })

  it('renders custom number of stars via max prop', () => {
    render(<StarRating value={0} onChange={vi.fn()} max={3} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
  })

  it('calls onChange with correct value when 3rd star is clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<StarRating value={0} onChange={onChange} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[2]) // index 2 = 3rd star
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('calls onChange with correct value when 5th star is clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<StarRating value={0} onChange={onChange} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[4]) // index 4 = 5th star
    expect(onChange).toHaveBeenCalledWith(5)
  })

  it('stars up to value have filled class, stars above do not', () => {
    render(<StarRating value={3} onChange={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    // Stars 1, 2, 3 should have filled star icon
    const star1 = buttons[0].querySelector('svg')
    const star4 = buttons[3].querySelector('svg')
    expect(star1).toHaveClass('fill-yellow-400')
    expect(star4).not.toHaveClass('fill-yellow-400')
  })

  it('hovering 4th star fills stars 1-4 temporarily', async () => {
    const user = userEvent.setup()
    render(<StarRating value={1} onChange={vi.fn()} />)
    const buttons = screen.getAllByRole('button')

    await user.hover(buttons[3]) // hover over 4th star
    // After hover, stars 1-4 should appear filled
    const star4 = buttons[3].querySelector('svg')
    expect(star4).toHaveClass('fill-yellow-400')
    // Star 5 should not be filled
    const star5 = buttons[4].querySelector('svg')
    expect(star5).not.toHaveClass('fill-yellow-400')
  })

  it('mouseLeave resets hover state so only value stars remain filled', async () => {
    const user = userEvent.setup()
    render(<StarRating value={1} onChange={vi.fn()} />)
    const buttons = screen.getAllByRole('button')

    await user.hover(buttons[3])
    await user.unhover(buttons[3])
    // After unhover, only star 1 (value=1) should be filled
    const star2 = buttons[1].querySelector('svg')
    expect(star2).not.toHaveClass('fill-yellow-400')
    const star1 = buttons[0].querySelector('svg')
    expect(star1).toHaveClass('fill-yellow-400')
  })
})
