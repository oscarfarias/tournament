import { TeamProps, UseQueryProps, MutationResult } from 'common/types'
import { Team } from 'entities'
import API from 'common/api'

import { useMutation } from 'react-query'
import { enqueueSnackbar } from 'notistack'

export const useTeamMutation = (
  props?: UseQueryProps<Team, TeamProps>,
): MutationResult<Team, TeamProps> => {
  const { options, onSuccessCallback } = props || {}

  const mutation = useMutation({
    mutationFn: (props: TeamProps) => API.upsertTeam(props),
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
