import {
  UseQueryResult,
  QueryKey,
  UseQueryOptions,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query'

interface QueryResultBase<T> extends Omit<UseQueryResult<T, unknown>, `data`> {
  data: T
}

export type QueryResult<T> = QueryResultBase<T>

export interface ExtendedQueryOptions<T, V extends QueryKey = string[], K = T>
  extends Omit<UseQueryOptions<T, unknown, K, V>, `initialData`> {
  initialData: T
}
export type QueryOptions<
  T,
  V extends QueryKey = string[],
  K = T,
> = ExtendedQueryOptions<T, V, K>
export type MutationOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, unknown, TVariables, unknown>,
  `mutationFn`
>
export type MutationResult<
  TData = unknown,
  TVariables = unknown,
> = UseMutationResult<TData, unknown, TVariables, unknown>
