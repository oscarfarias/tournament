import { UseQueryProps, MutationResult, SerializedResponse } from 'common/types'
import { Group } from 'entities'
import API from 'common/api'

import { useMutation, useQueryClient } from 'react-query'
import { enqueueSnackbar } from 'notistack'
import { QUERY_KEYS } from './keys'
export const useDeleteGroupMutation = (
  props?: UseQueryProps<Group, string>,
): MutationResult<Group, string> => {
  const queryClient = useQueryClient()
  const { options, onSuccessCallback } = props || {}

  const mutation = useMutation({
    mutationFn: (groupId: string) => API.deleteGroup(groupId),
    onSuccess: (group) => {
      onSuccessCallback && onSuccessCallback(group)
      queryClient.setQueryData<
        SerializedResponse<Group, { groups: string }> | null | undefined
      >(QUERY_KEYS.groups(group.category.year), (oldGroup) => {
        if (oldGroup == null) {
          return oldGroup
        }
        const { groupsById, groupsIds } = oldGroup
        const nextGroupsIds = groupsIds.filter((id) => id !== group.id)
        const nextGroupsById = { ...groupsById }
        delete nextGroupsById[group.id]
        return {
          groupsIds: nextGroupsIds,
          groupsById: nextGroupsById,
        }
      })

      enqueueSnackbar(`Grupo eliminado exitosamente`, { variant: `success` })
    },
    onError: (error) => {
      enqueueSnackbar(error as string, { variant: `error` })
    },
    ...options,
  })

  return mutation
}
