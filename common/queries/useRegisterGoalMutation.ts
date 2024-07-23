import { UseQueryProps, MutationResult } from 'common/types'
import { Group } from 'entities'
import API from 'common/api'
import { useMutation, useQueryClient } from 'react-query'
import { enqueueSnackbar } from 'notistack'
import { RegisterGoalsProps } from 'common/types/goal'
import { QUERY_KEYS } from './keys'

export const useRegisterGoalMutation = (
  props?: UseQueryProps<Group, RegisterGoalsProps>,
): MutationResult<Group, RegisterGoalsProps> => {
  const { options, onSuccessCallback } = props || {}
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (props: RegisterGoalsProps) => API.registerGoal(props),
    onSuccess: (group) => {
      onSuccessCallback && onSuccessCallback(group)

      queryClient.setQueryData<Group>(QUERY_KEYS.group(group.id), group)

      enqueueSnackbar(`Registrado con éxito`, { variant: `success` })
    },

    onError: (error) => {
      enqueueSnackbar(error as string, { variant: `error` })
    },
    ...options,
  })

  return mutation
}
