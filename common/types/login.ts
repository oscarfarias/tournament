import { User } from 'entities'

export interface LoginProps {
  username: string
  password: string
}

export interface AuthorizedUser {
  user: User
  token: string
}
