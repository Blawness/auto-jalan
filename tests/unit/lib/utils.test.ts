import { describe, it, expect } from 'vitest'
import { formatRupiah, cn } from '@/lib/utils'

describe('formatRupiah', () => {
  it('formats 150000 as Indonesian Rupiah', () => {
    const result = formatRupiah(150000)
    expect(result).toContain('150')
    expect(result).toMatch(/Rp|IDR/)
  })

  it('formats 0', () => {
    const result = formatRupiah(0)
    expect(result).toMatch(/Rp|IDR/)
    expect(result).toContain('0')
  })

  it('formats 1000000 with thousand separators', () => {
    const result = formatRupiah(1_000_000)
    // Indonesian locale uses dots as thousands separator
    expect(result).toMatch(/1[.,]000[.,]000|1\.000\.000/)
  })

  it('formats 2500 correctly', () => {
    const result = formatRupiah(2500)
    expect(result).toContain('2')
    expect(result).toContain('500')
  })
})

describe('cn', () => {
  it('merges two class strings', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('deduplicates conflicting tailwind classes (last wins)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('handles undefined and empty values', () => {
    expect(cn('a', undefined, '', 'b')).toBe('a b')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'conditional')).toBe('base')
    expect(cn('base', true && 'conditional')).toBe('base conditional')
  })
})
