import { StateCreator } from 'common/types/zustand'
import { AthleteModalSlice } from './types'

export const createAthleteModalSlice: StateCreator<AthleteModalSlice> = (
  set,
) => ({
  teamId: null,
  matchId: null,
  openModal: ({ teamId, matchId }) => set({ teamId, matchId }),
  closeModal: () => set({ teamId: null, matchId: null }),
})
