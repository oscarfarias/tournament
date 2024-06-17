import API from 'common/api'
import { QUERY_KEYS } from './keys'
import { QueryResult } from 'common/types'
import { useQuery } from 'react-query'

import { User } from 'entities'
import useAuth from 'common/hooks/useAuth'
export const useCurrentUserQuery = (): QueryResult<User | undefined> => {
  const { setUser } = useAuth()
  const currentUserQuery = useQuery({
    queryKey: QUERY_KEYS.currentUser,
    queryFn: () => API.getCurrentUser(),
    onSuccess: (data) => {
      setUser(data)
    },
    onError: () => {
      setUser(null)
    },
    retry: false,
  })
  return currentUserQuery
}
