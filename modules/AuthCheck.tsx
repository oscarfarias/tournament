import { ROLES, TOKEN_KEY } from 'common/config/constants'
import useAuth from 'common/hooks/useAuth'
import { useCurrentUserQuery } from 'common/queries/useCurrentUserQuery'
import { User } from 'entities'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ROUTES, supervisorRoutes } from 'common/config/constants'
import Loading from './Loading'

const publicRoutes: string[] = [`${ROUTES.LOGIN}`]
export interface AuthCheckProps {
  children: React.ReactNode
}

const Redirect = ({ route }: { route: string }): JSX.Element => {
  const router = useRouter()
  useEffect(() => {
    router.push(route)
  }, [])

  return <Loading text="Redireccionando..." />
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

  const isLogin = router.pathname === ROUTES.LOGIN
  const isAuthorizedUser = isAuthorized(user)

  useEffect(() => {
    handleUser(currentUserQuery.data)
  }, [currentUserQuery.data])

  if (isFetching) {
    return <Loading text="Cargando..." />
  }
  if (!isAuthorizedUser) {
    return <Redirect route={ROUTES.LOGIN} />
  }
  if (isLogin && user && user.role?.name === ROLES.ADMIN) {
    return <Redirect route={ROUTES.INDEX} />
  }
  if (isLogin && user && user.role?.name === ROLES.SUPERVISOR) {
    return <Redirect route={ROUTES.MATCHES} />
  }
  if (
    user &&
    user.role?.name === ROLES.SUPERVISOR &&
    !supervisorRoutes.includes(router.pathname)
  ) {
    return <Redirect route={ROUTES.MATCHES} />
  }

  return <>{children}</>
}

export default AuthCheck
