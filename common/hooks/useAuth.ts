import API from 'common/api'
import { MutationOptions, MutationResult, AuthorizedUser } from 'common/types'
import { useMutation } from 'react-query'
import { enqueueSnackbar } from 'notistack'
import useAuthStore from 'common/stores/useAuthStore'
import { LoginProps } from 'common/types/login'
import { TOKEN_KEY } from 'common/config/constants'

interface UseLoginProps {
  options?: MutationOptions<AuthorizedUser, LoginProps>
  onSuccessCallback?: () => void
}

const useAuth = () => {
  const { user, token, setUser, setToken } = useAuthStore()
  const isLoggedIn = !!user

  const logOut = (): void => {
    setUser(null)
    setToken(null)
    localStorage.removeItem(TOKEN_KEY)
  }

  const useLogIn = (
    props?: UseLoginProps,
  ): MutationResult<AuthorizedUser, LoginProps> => {
    const { options, onSuccessCallback } = props || {}

    const mutation = useMutation({
      mutationFn: (props: LoginProps) => API.login(props),
      onSuccess: (authorizedUser) => {
        const { token, user } = authorizedUser
        setUser(user)
        setToken(token)
        localStorage.setItem(TOKEN_KEY, token)
        enqueueSnackbar(`Welcome ${user.firstName}`, { variant: `success` })
        onSuccessCallback && onSuccessCallback()
      },
      onError: (error) => {
        logOut()
        enqueueSnackbar(error as string, { variant: `error` })
      },
      ...options,
    })

    return mutation
  }

  return {
    user,
    isLoggedIn,
    useLogIn,
    token,
    logOut,
    setUser,
    setToken,
  }
}

export default useAuth
