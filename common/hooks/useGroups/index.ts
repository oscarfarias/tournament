import useGroupsQuery from 'common/queries/useGroupsQuery'
import { useEffect } from 'react'
import useGroupStore from './store'

export const useGroups = (year?: string) => {
  const groupsQuery = useGroupsQuery(year)
  const {
    setGroups,
    setGroupsIds,
    setGroupsById,
    groups,
    setGroup,
    group,
    groupsById,
  } = useGroupStore((state) => state)

  useEffect(() => {
    if (groupsQuery?.data) {
      const { groupsIds, groupsById } = groupsQuery.data
      const groups = groupsIds.map((id) => groupsById[id])
      setGroups(groups)
      setGroupsIds(groupsIds)
      setGroupsById(groupsById)
    }
  }, [groupsQuery?.dataUpdatedAt])

  return {
    groupsQuery,
    groups,
    group,
    setGroup,
    groupsById,
  }
}
