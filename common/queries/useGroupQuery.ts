import API from 'common/api'
import { QUERY_KEYS } from './keys'
import { useQuery } from 'react-query'

const useGroupQuery = (groupId?: string) => {
  const currentUserQuery = useQuery({
    queryKey: QUERY_KEYS.group(groupId),
    queryFn: () => API.getGroupById(groupId),
    retry: false,
  })
  return currentUserQuery
}
export default useGroupQuery
