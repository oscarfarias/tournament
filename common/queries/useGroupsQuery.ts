import API from 'common/api'
import { QUERY_KEYS } from './keys'
import { useQuery } from 'react-query'

const useGroupsQuery = (year?: string) => {
  const currentUserQuery = useQuery({
    queryKey: QUERY_KEYS.groups(year),
    queryFn: () => API.getGroupsByYear(year),
    retry: false,
  })
  return currentUserQuery
}
export default useGroupsQuery
