import API from 'common/api'
import { CategoriesProps, MutationOptions, MutationResult } from 'common/types'
import { useMutation } from 'react-query'
import { enqueueSnackbar } from 'notistack'
import { Category } from 'entities'

interface UseLoginProps {
  options?: MutationOptions<Category, CategoriesProps>
  onSuccessCallback?: () => void
}

const useCategory = () => {
  const useCategoryMutation = (
    props?: UseLoginProps,
  ): MutationResult<Category, CategoriesProps> => {
    const { options, onSuccessCallback } = props || {}

    const mutation = useMutation({
      mutationFn: (props: CategoriesProps) => API.createCategory(props),
      onSuccess: () => {
        onSuccessCallback && onSuccessCallback()
      },
      onError: (error) => {
        enqueueSnackbar(error as string, { variant: `error` })
      },
      ...options,
    })

    return mutation
  }

  return {
    useCategoryMutation,
  }
}

export default useCategory
