import { create } from 'zustand'
import { GroupStore } from './types'
const useGroupStore = create<GroupStore>((set) => ({
  group: {},
  groups: [],
  groupsIds: [],
  groupsById: {},
  setGroup: (group) => set({ group }),
  setGroups: (groups) => set({ groups }),
  setGroupsIds: (groupsIds) => set({ groupsIds }),
  setGroupsById: (groupsById) => set({ groupsById }),
  clearGroup: () => set({ group: {} }),
  clearGroups: () => set({ groups: [] }),
  clearGroupsIds: () => set({ groupsIds: [] }),
  clearGroupsById: () => set({ groupsById: {} }),
}))

export default useGroupStore
