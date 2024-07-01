import {
  GroupProps,
  UseQueryProps,
  MutationResult,
  SerializedResponse,
} from 'common/types'
import { Group } from 'entities'
import API from 'common/api'

import { useMutation, useQueryClient } from 'react-query'
import { enqueueSnackbar } from 'notistack'
import { QUERY_KEYS } from './keys'

export const useGroupMutation = (
  props?: UseQueryProps<Group, GroupProps>,
): MutationResult<Group, GroupProps> => {
  const { options, onSuccessCallback } = props || {}
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (props: GroupProps) => API.upsertGroup(props),
    onSuccess: (group) => {
      onSuccessCallback && onSuccessCallback(group)

      queryClient.setQueryData<
        SerializedResponse<Group, { groups: string }> | null | undefined
      >(QUERY_KEYS.groups(group.category.year), (oldGroup) => {
        if (oldGroup == null) {
          return oldGroup
        }
        const { groupsById } = oldGroup
        const nextGroupsById = {
          ...groupsById,
          [group.id]: group,
        }

        return {
          ...oldGroup,
          groupsById: nextGroupsById,
        }
      })

      enqueueSnackbar(`Actualizado`, { variant: `success` })
    },

    onError: (error) => {
      enqueueSnackbar(error as string, { variant: `error` })
    },
    ...options,
  })

  return mutation
}
