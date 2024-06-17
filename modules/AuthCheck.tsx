import { TOKEN_KEY } from 'common/config/constants'
import useAuth from 'common/hooks/useAuth'
import { useCurrentUserQuery } from 'common/queries/useCurrentUserQuery'
import { User } from 'entities'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from 'common/config/constants'
import Loading from './Loading'

const publicRoutes: string[] = [`/login`]
export interface AuthCheckProps {
  children: React.ReactNode
}

const Redirect = (): JSX.Element => {
  const router = useRouter()
  useEffect(() => {
    router.push(ROUTES.LOGIN)
  }, [])

  return <Loading text="Redirecting..." />
}

const AuthCheck = ({ children }: AuthCheckProps): JSX.Element => {
  const { setUser, setToken, user } = useAuth()
  const router = useRouter()
  const currentUserQuery = useCurrentUserQuery()
  const isFetching = currentUserQuery.isFetching

  const handleUser = (user: User | undefined): void => {
    setUser(user ?? null)
    if (user == null) {
      return
    }
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      setToken(token)
    }
  }
  const isAuthorized = (user: User | null): boolean => {
    return !!user || publicRoutes.includes(router.pathname)
  }

  useEffect(() => {
    handleUser(currentUserQuery.data)
  }, [currentUserQuery.data])

  if (isFetching) {
    return <Loading text="Loading..." />
  }
  if (!isAuthorized(user)) {
    return <Redirect />
  }

  return <>{children}</>
}

export default AuthCheck
