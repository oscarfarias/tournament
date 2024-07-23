import { create } from 'zustand'
import { AthleteModalSlice } from './athleteModal/types'
import createAthleteModalSlice from './athleteModal'

const useStore = create<AthleteModalSlice>((...args) => ({
  ...createAthleteModalSlice(...args),
}))

export default useStore
