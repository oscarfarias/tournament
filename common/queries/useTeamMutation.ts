import {
  TeamProps,
  UseQueryProps,
  MutationResult,
  SerializedResponse,
} from 'common/types'
import { Group } from 'entities'
import API from 'common/api'

import { useMutation, useQueryClient } from 'react-query'
import { enqueueSnackbar } from 'notistack'
import { QUERY_KEYS } from './keys'

export const useTeamMutation = (
  props?: UseQueryProps<Group, TeamProps>,
): MutationResult<Group, TeamProps> => {
  const queryClient = useQueryClient()
  const { options, onSuccessCallback } = props || {}

  const mutation = useMutation({
    mutationFn: (props: TeamProps) => API.upsertTeam(props),
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
