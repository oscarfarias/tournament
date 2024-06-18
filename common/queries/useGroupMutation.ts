import { GroupProps, UseQueryProps, MutationResult } from 'common/types'
import { Group } from 'entities'
import API from 'common/api'

import { useMutation } from 'react-query'
import { enqueueSnackbar } from 'notistack'

export const useGroupMutation = (
  props?: UseQueryProps<Group, GroupProps>,
): MutationResult<Group, GroupProps> => {
  const { options, onSuccessCallback } = props || {}

  const mutation = useMutation({
    mutationFn: (props: GroupProps) => API.upsertGroup(props),
    onSuccess: (data) => {
      onSuccessCallback && onSuccessCallback(data)
      enqueueSnackbar(`Actualizado`, { variant: `success` })
    },
    onError: (error) => {
      enqueueSnackbar(error as string, { variant: `error` })
    },
    ...options,
  })

  return mutation
}
