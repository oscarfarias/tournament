import API from 'common/api'
import { QUERY_KEYS } from './keys'
import { useQuery } from 'react-query'

const useAthletesByTeamQuery = (teamId: string) => {
  const currentUserQuery = useQuery({
    queryKey: QUERY_KEYS.athletesByTeam(teamId),
    queryFn: () => API.getAthletesByTeam(teamId),
    retry: false,
  })
  return currentUserQuery
}
export default useAthletesByTeamQuery
