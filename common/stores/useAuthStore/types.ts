import { User } from 'entities/User'

export type AuthState = {
  user: User | null
  token: string | null
}
export type AuthActions = {
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
}

export type AuthStore = AuthState & AuthActions
