import { User } from 'entities'
export * from './validator'
export * from './react-query'
export * from './login'
export * from './yup'
export * from './category'
export * from './group'
export * from './team'
export * from './athlete'

export interface Option {
  label: string
  value: string | number
}
export type SerializedResponse<
  T extends { id: string | number },
  N extends { [key: string]: string },
  V extends T[`id`] = T[`id`],
> = {
  [K in keyof N & string as `${K}ById`]: Record<V, T>
} & {
  [K in keyof N & string as `${K}Ids`]: V[]
}
export interface AuthorizedUser {
  user: User
  token: string
}
