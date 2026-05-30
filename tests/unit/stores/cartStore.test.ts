import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useCartStore } from '@/stores/cartStore'

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  it('addItem adds a new item with qty 1', () => {
    useCartStore.getState().addItem('sp1')
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0]).toEqual({ sparepartId: 'sp1', qty: 1 })
  })

  it('addItem increments qty instead of duplicating when item exists', () => {
    useCartStore.getState().addItem('sp1')
    useCartStore.getState().addItem('sp1')
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0].qty).toBe(2)
  })

  it('addItem for two different items creates two entries', () => {
    useCartStore.getState().addItem('sp1')
    useCartStore.getState().addItem('sp2')
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(2)
  })

  it('removeItem removes the correct item', () => {
    useCartStore.getState().addItem('sp1')
    useCartStore.getState().addItem('sp2')
    useCartStore.getState().removeItem('sp1')
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0].sparepartId).toBe('sp2')
  })

  it('setQty changes qty to specified value', () => {
    useCartStore.getState().addItem('sp1')
    useCartStore.getState().setQty('sp1', 5)
    const { items } = useCartStore.getState()
    expect(items[0].qty).toBe(5)
  })

  it('setQty with 0 removes the item', () => {
    useCartStore.getState().addItem('sp1')
    useCartStore.getState().setQty('sp1', 0)
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('setQty with negative value removes the item', () => {
    useCartStore.getState().addItem('sp1')
    useCartStore.getState().setQty('sp1', -1)
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('setQty on non-existent item does nothing', () => {
    useCartStore.getState().setQty('nonexistent', 5)
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('removeItem on non-existent item does nothing', () => {
    useCartStore.getState().addItem('sp1')
    useCartStore.getState().removeItem('nonexistent')
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
  })

  it('clear empties the cart', () => {
    useCartStore.getState().addItem('sp1')
    useCartStore.getState().addItem('sp2')
    useCartStore.getState().clear()
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('cart store uses persist middleware', () => {
    // @ts-expect-error persist is available on persisted stores
    expect(useCartStore.persist).toBeDefined()
  })

  it('cart store uses persist middleware with correct storage key', () => {
    expect(useCartStore.persist).toBeDefined()
    expect(useCartStore.persist.getOptions().name).toBe('cart-storage')
  })

  it('persist rehydrates from localStorage when store re-created', async () => {
    localStorage.setItem('cart-storage', JSON.stringify({
      state: { items: [{ sparepartId: 'sp1', qty: 2 }] },
      version: 0,
    }))
    const mod = await import('@/stores/cartStore')
    mod.useCartStore.persist.rehydrate()
    const { items } = mod.useCartStore.getState()
    expect(items).toEqual([{ sparepartId: 'sp1', qty: 2 }])
  })

  it('empty localStorage results in empty cart', () => {
    localStorage.removeItem('cart-storage')
    useCartStore.persist.rehydrate()
    const { items } = useCartStore.getState()
    expect(items).toEqual([])
  })
})
