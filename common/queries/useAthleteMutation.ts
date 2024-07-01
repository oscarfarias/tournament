import {
  AthleteProps,
  UseQueryProps,
  MutationResult,
  SerializedResponse,
  AddMoreAthletesProps,
} from 'common/types'
import { Group } from 'entities'
import API from 'common/api'

import { useMutation, useQueryClient } from 'react-query'
import { enqueueSnackbar } from 'notistack'
import { QUERY_KEYS } from './keys'

export const useAthleteMutation = (
  props?: UseQueryProps<Group, AthleteProps>,
): MutationResult<Group, AthleteProps> => {
  const queryClient = useQueryClient()
  const { options, onSuccessCallback } = props || {}

  const mutation = useMutation({
    mutationFn: (props: AthleteProps) => API.upsertAthlete(props),
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
export const useAthleteDeleteMutation = (
  props?: UseQueryProps<Group, string>,
): MutationResult<Group, string> => {
  const queryClient = useQueryClient()
  const { options, onSuccessCallback } = props || {}

  const mutation = useMutation({
    mutationFn: (athleteId: string) => API.deleteAthlete(athleteId),
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

export const useAddMoreAthletesMutation = (
  props?: UseQueryProps<Group, AddMoreAthletesProps>,
): MutationResult<Group, AddMoreAthletesProps> => {
  const queryClient = useQueryClient()
  const { options, onSuccessCallback } = props || {}

  const mutation = useMutation({
    mutationFn: (props: AddMoreAthletesProps) => API.addMoreAthletes(props),
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
