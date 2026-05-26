import { create } from "zustand"

type CartItem = { sparepartId: string; qty: number }

type CartStore = {
  items: CartItem[]
  addItem: (sparepartId: string) => void
  removeItem: (sparepartId: string) => void
  setQty: (sparepartId: string, qty: number) => void
  clear: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (sparepartId) =>
    set((state) => {
      const existing = state.items.find((i) => i.sparepartId === sparepartId)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.sparepartId === sparepartId ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }
      return { items: [...state.items, { sparepartId, qty: 1 }] }
    }),
  removeItem: (sparepartId) =>
    set((state) => ({
      items: state.items.filter((i) => i.sparepartId !== sparepartId),
    })),
  setQty: (sparepartId, qty) =>
    set((state) => ({
      items:
        qty <= 0
          ? state.items.filter((i) => i.sparepartId !== sparepartId)
          : state.items.map((i) =>
              i.sparepartId === sparepartId ? { ...i, qty } : i
            ),
    })),
  clear: () => set({ items: [] }),
}))
