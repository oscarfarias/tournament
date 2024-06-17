import API from 'common/api'
import { QUERY_KEYS } from './keys'
import { useQuery } from 'react-query'

const useCategoriesQuery = () => {
  const currentUserQuery = useQuery({
    queryKey: QUERY_KEYS.categories,
    queryFn: () => API.getCategories(),
    //onSuccess: (categories) => {},

    retry: false,
  })
  return currentUserQuery
}
export default useCategoriesQuery
