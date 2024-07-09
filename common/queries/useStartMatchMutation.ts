import { UseQueryProps, MutationResult, SerializedResponse } from 'common/types'
import { Group } from 'entities'
import API from 'common/api'

import { useMutation, useQueryClient } from 'react-query'
import { enqueueSnackbar } from 'notistack'
import { QUERY_KEYS } from './keys'

export const useStartMatchMutation = (
  props?: UseQueryProps<Group, string>,
): MutationResult<Group, string> => {
  const { options, onSuccessCallback } = props || {}
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (groupId: string) => API.startMatch(groupId),
    onSuccess: (data) => {
      onSuccessCallback && onSuccessCallback(data)
      queryClient.setQueryData<
        SerializedResponse<Group, { groups: string }> | null | undefined
      >(QUERY_KEYS.groups(data.category.year), (oldData) => {
        if (oldData == null) {
          return oldData
        }
        const { groupsById, groupsIds } = oldData
        const nextGroupsById = {
          ...groupsById,
          [data.id]: data,
        }
        const nextGroupsIds = [...groupsIds, data.id]
        return { groupsIds: nextGroupsIds, groupsById: nextGroupsById }
      })
      enqueueSnackbar(
        `Iniciado con éxito, se generaron ${data.matches.length} emparejamientos`,
        { variant: `success` },
      )
    },
    onError: (error) => {
      enqueueSnackbar(error as string, { variant: `error` })
    },
    ...options,
  })

  return mutation
}
