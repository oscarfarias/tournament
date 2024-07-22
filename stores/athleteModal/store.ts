import { StateCreator } from 'common/types/zustand'
import { AthleteModalSlice } from './types'

export const createAthleteModalSlice: StateCreator<AthleteModalSlice> = (
  set,
) => ({
  isModalOpen: false,
  teamId: null,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
})
