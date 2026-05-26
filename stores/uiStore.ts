import { create } from "zustand"

type UiStore = {
  selectedServiceId: string | null
  selectedMekanikId: string | null
  sosState: {
    userLat: number
    userLng: number
    mechLat: number
    mechLng: number
    eta: number
    mechName: string
    mechFoto: string
    mechId: string | null
    status: "idle" | "mencari" | "tracking" | "arrived"
  }
  setSelectedService: (id: string) => void
  setSelectedMekanik: (id: string) => void
  initSOSTracking: (data: {
    mechId: string
    mechName: string
    mechFoto: string
    mechLat: number
    mechLng: number
  }) => void
  updateSOSPosition: (mechLat: number, mechLng: number, eta: number) => void
  setSOSStatus: (status: UiStore["sosState"]["status"]) => void
  resetFlow: () => void
}

export const useUiStore = create<UiStore>((set) => ({
  selectedServiceId: null,
  selectedMekanikId: null,
  sosState: {
    userLat: -6.2088,
    userLng: 106.8456,
    mechLat: -6.22,
    mechLng: 106.86,
    eta: 15,
    mechName: "",
    mechFoto: "",
    mechId: null,
    status: "idle",
  },
  setSelectedService: (id) => set({ selectedServiceId: id }),
  setSelectedMekanik: (id) => set({ selectedMekanikId: id }),
  initSOSTracking: (data) =>
    set((state) => ({
      sosState: {
        ...state.sosState,
        mechId: data.mechId,
        mechName: data.mechName,
        mechFoto: data.mechFoto,
        mechLat: data.mechLat,
        mechLng: data.mechLng,
        eta: 15,
        status: "tracking",
      },
    })),
  updateSOSPosition: (mechLat, mechLng, eta) =>
    set((state) => ({
      sosState: { ...state.sosState, mechLat, mechLng, eta },
    })),
  setSOSStatus: (status) =>
    set((state) => ({
      sosState: { ...state.sosState, status },
    })),
  resetFlow: () =>
    set({
      selectedServiceId: null,
      selectedMekanikId: null,
    }),
}))
