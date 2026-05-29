import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BottomNavbar } from '@/components/layout/BottomNavbar'
import { useCartStore } from '@/stores/cartStore'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

vi.mock('next/link', () => ({
  default: ({ href, children, className, ...props }: any) => (
    <a href={href} className={className} {...props}>{children}</a>
  ),
}))

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
}))

const mockUsePathname = vi.mocked(usePathname)
const mockUseSession = vi.mocked(useSession)

describe('BottomNavbar', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
    mockUseSession.mockReturnValue({ status: 'authenticated' } as any)
    mockUsePathname.mockReturnValue('/lobby')
  })

  it('renders SOS button linking to /sos', () => {
    render(<BottomNavbar />)
    // SOS button has no text (icon only), find by href
    const links = screen.getAllByRole('link')
    const sosAnchor = links.find(l => l.getAttribute('href') === '/sos')
    expect(sosAnchor).toBeInTheDocument()
  })

  it('Home link has active class when pathname is /lobby', () => {
    mockUsePathname.mockReturnValue('/lobby')
    render(<BottomNavbar />)
    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).toHaveClass('bg-blue-50', 'text-blue-600')
  })

  it('Keranjang link has active class when pathname is /keranjang', () => {
    mockUsePathname.mockReturnValue('/keranjang')
    render(<BottomNavbar />)
    const keranjangLink = screen.getByRole('link', { name: /keranjang/i })
    expect(keranjangLink).toHaveClass('bg-blue-50', 'text-blue-600')
  })

  it('Home link does not have active class when pathname is /keranjang', () => {
    mockUsePathname.mockReturnValue('/keranjang')
    render(<BottomNavbar />)
    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).not.toHaveClass('bg-blue-50')
  })

  it('Riwayat link has active class when pathname is /riwayat', () => {
    mockUsePathname.mockReturnValue('/riwayat')
    render(<BottomNavbar />)
    const riwayatLink = screen.getByRole('link', { name: /riwayat/i })
    expect(riwayatLink).toHaveClass('bg-blue-50', 'text-blue-600')
  })

  it('Akun link has active class when pathname is /akun', () => {
    mockUsePathname.mockReturnValue('/akun')
    render(<BottomNavbar />)
    const akunLink = screen.getByRole('link', { name: /akun/i })
    expect(akunLink).toHaveClass('bg-blue-50', 'text-blue-600')
  })

  it('unauthenticated user: Riwayat link redirects to /login with callbackUrl', () => {
    mockUseSession.mockReturnValue({ status: 'unauthenticated' } as any)
    mockUsePathname.mockReturnValue('/lobby')
    render(<BottomNavbar />)
    const riwayatLink = screen.getByRole('link', { name: /riwayat/i })
    expect(riwayatLink).toHaveAttribute('href', '/login?callbackUrl=%2Friwayat')
  })

  it('unauthenticated user: Akun link redirects to /login with callbackUrl', () => {
    mockUseSession.mockReturnValue({ status: 'unauthenticated' } as any)
    mockUsePathname.mockReturnValue('/lobby')
    render(<BottomNavbar />)
    const akunLink = screen.getByRole('link', { name: /akun/i })
    expect(akunLink).toHaveAttribute('href', '/login?callbackUrl=%2Fakun')
  })

  it('unauthenticated user: Keranjang link redirects to /login with callbackUrl', () => {
    mockUseSession.mockReturnValue({ status: 'unauthenticated' } as any)
    mockUsePathname.mockReturnValue('/lobby')
    render(<BottomNavbar />)
    const keranjangLink = screen.getByRole('link', { name: /keranjang/i })
    expect(keranjangLink).toHaveAttribute('href', '/login?callbackUrl=%2Fkeranjang')
  })

  it('cart badge is hidden when cart is empty', () => {
    render(<BottomNavbar />)
    // Query for a numeric badge text — should not exist when cart is empty
    expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument()
  })

  it('cart badge shows item count when cart has items', () => {
    useCartStore.setState({ items: [{ sparepartId: 'sp1', qty: 3 }] })
    render(<BottomNavbar />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('cart badge shows total qty across multiple items', () => {
    useCartStore.setState({
      items: [
        { sparepartId: 'sp1', qty: 2 },
        { sparepartId: 'sp2', qty: 4 },
      ],
    })
    render(<BottomNavbar />)
    expect(screen.getByText('6')).toBeInTheDocument()
  })
})
