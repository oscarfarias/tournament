import { Group } from 'entities'

type GroupState = {
  group: Partial<Group>
  groups: Group[]
  groupsIds: string[]
  groupsById: Record<string, Group>
}
type GroupActions = {
  setGroup: (group: Partial<Group>) => void
  setGroups: (groups: Group[]) => void
  setGroupsIds: (groupsIds: string[]) => void
  setGroupsById: (groupsById: Record<string, Group>) => void
  clearGroup: () => void
  clearGroups: () => void
  clearGroupsIds: () => void
  clearGroupsById: () => void
}

export type GroupStore = GroupState & GroupActions
