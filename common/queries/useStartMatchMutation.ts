import { UseQueryProps, MutationResult, SerializedResponse } from 'common/types'
import { Category, Group } from 'entities'
import API from 'common/api'

import { useMutation, useQueryClient } from 'react-query'
import { enqueueSnackbar } from 'notistack'
import { QUERY_KEYS } from './keys'
import useCategoryStore from 'common/stores/useCategoryStore'
import { Collection } from '@mikro-orm/core'

export const useStartMatchMutation = (
  props?: UseQueryProps<Group, string>,
): MutationResult<Group, string> => {
  const { options, onSuccessCallback } = props || {}
  const queryClient = useQueryClient()
  const { setCategoriesById, categoriesById } = useCategoryStore(
    (state) => state,
  )

  const mutation = useMutation({
    mutationFn: (groupId: string) => API.startMatch(groupId),
    onSuccess: (data) => {
      const category = categoriesById[data.category.id]
      const categoryId = category.id
      const groups = category.groups.map((group) => {
        if (group.id === data.id) {
          return data
        }
        return group
      })

      const nextCategoriesById: Record<string, Category> = {
        ...categoriesById,
        [categoryId]: {
          ...category,
          groups: groups as unknown as Collection<Group, object>,
        },
      }

      setCategoriesById(nextCategoriesById)

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
