import { create } from 'zustand'
import { LogoutStore } from './types'
const useLogoutStore = create<LogoutStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}))

export default useLogoutStore
