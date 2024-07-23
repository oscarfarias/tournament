import { UseQueryProps, MutationResult } from 'common/types'
import { Group } from 'entities'
import API from 'common/api'
import { useMutation } from 'react-query'
import { enqueueSnackbar } from 'notistack'
import { RegisterGoalsProps } from 'common/types/goal'

export const useRegisterGoalMutation = (
  props?: UseQueryProps<Group, RegisterGoalsProps>,
): MutationResult<Group, RegisterGoalsProps> => {
  const { options, onSuccessCallback } = props || {}

  const mutation = useMutation({
    mutationFn: (props: RegisterGoalsProps) => API.registerGoal(props),
    onSuccess: (group) => {
      onSuccessCallback && onSuccessCallback(group)
      enqueueSnackbar(`Registrado con éxito`, { variant: `success` })
    },

    onError: (error) => {
      enqueueSnackbar(error as string, { variant: `error` })
    },
    ...options,
  })

  return mutation
}
