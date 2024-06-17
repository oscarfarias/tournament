import { User } from 'entities/User'
import { create } from 'zustand'
import { AuthStore } from './types'
const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  setUser: (user: User | null) => set({ user }),
  setToken: (token: string | null) => set({ token }),
}))

export default useAuthStore
