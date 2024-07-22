import { StateCreator } from 'common/types/zustand'
import { AthleteModalSlice } from './types'

export const createAthleteModalSlice: StateCreator<AthleteModalSlice> = (
  set,
) => ({
  teamId: null,
  openModal: (teamId) => set({ teamId }),
  closeModal: () => set({ teamId: null }),
})
