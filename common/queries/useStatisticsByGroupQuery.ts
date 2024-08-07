import API from 'common/api'
import { QUERY_KEYS } from './keys'
import { useQuery } from 'react-query'

const useStatisticsByGroupQuery = (groupId: string) => {
  const query = useQuery({
    queryKey: QUERY_KEYS.statisticsByGroup(groupId),
    queryFn: () => API.getStatisticsByGroupId(groupId),
    retry: false,
  })
  return query
}
export default useStatisticsByGroupQuery
