import API from 'common/api'
import { QUERY_KEYS } from './keys'
import { useQuery } from 'react-query'

const useScorersByTeamQuery = (teamId: string) => {
  const query = useQuery({
    queryKey: QUERY_KEYS.scorersByTeam(teamId),
    queryFn: () => API.getScorersByTeamId(teamId),
    retry: false,
  })
  return query
}
export default useScorersByTeamQuery
