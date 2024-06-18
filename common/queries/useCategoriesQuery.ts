import API from 'common/api'
import { QUERY_KEYS } from './keys'
import { useQuery } from 'react-query'
import useCategoryStore from 'common/stores/useCategoryStore'

const useCategoriesQuery = () => {
  const { setCategories, setCategoriesById, setCategoriesIds } =
    useCategoryStore((state) => state)
  const currentUserQuery = useQuery({
    queryKey: QUERY_KEYS.categories,
    queryFn: () => API.getCategories(),
    onSuccess: (serializedCategories) => {
      const { categoriesById, categoriesIds } = serializedCategories
      const categories = categoriesIds.map((id) => categoriesById[id])
      setCategories(categories)
      setCategoriesById(categoriesById)
      setCategoriesIds(categoriesIds)
    },

    retry: false,
  })
  return currentUserQuery
}
export default useCategoriesQuery
