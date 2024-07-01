import {
  TeamProps,
  UseQueryProps,
  MutationResult,
  SerializedResponse,
  AddMoreTeamsProps,
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

export const useTeamDeleteMutation = (
  props?: UseQueryProps<Group, string>,
): MutationResult<Group, string> => {
  const queryClient = useQueryClient()
  const { options, onSuccessCallback } = props || {}

  const mutation = useMutation({
    mutationFn: (teamId: string) => API.deleteTeam(teamId),
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

      enqueueSnackbar(`Eliminado exitosamente`, { variant: `success` })
    },
    onError: (error) => {
      enqueueSnackbar(error as string, { variant: `error` })
    },
    ...options,
  })

  return mutation
}

export const useAddMoreTeamsMutation = (
  props?: UseQueryProps<Group, AddMoreTeamsProps>,
): MutationResult<Group, AddMoreTeamsProps> => {
  const queryClient = useQueryClient()
  const { options, onSuccessCallback } = props || {}

  const mutation = useMutation({
    mutationFn: (props: AddMoreTeamsProps) => API.addMoreTeams(props),
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
      enqueueSnackbar(`Agregado exitosamente`, { variant: `success` })
    },
    onError: (error) => {
      enqueueSnackbar(error as string, { variant: `error` })
    },
    ...options,
  })

  return mutation
}
