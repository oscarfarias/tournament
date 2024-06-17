import { FormikValues, useFormik } from 'formik'
import { InputProps, BaseTextFieldProps } from '@mui/material'
import { Option } from 'common/types'
type Key = string | number | symbol
type Join<L extends Key | undefined, R extends Key | undefined> = L extends
  | string
  | number
  ? R extends string | number
    ? `${L}.${R}`
    : L
  : R extends string | number
  ? R
  : undefined

type Union<
  L extends unknown | undefined,
  R extends unknown | undefined,
> = L extends undefined
  ? R extends undefined
    ? undefined
    : R
  : R extends undefined
  ? L
  : L | R

// Use this type to define object types you want to skip (no path-scanning)
type ObjectsToIgnore = { new (...parms: any[]): any } | Date | Array<any>

type ValidObject<T> = T extends object
  ? T extends ObjectsToIgnore
    ? false & 1
    : T
  : false & 1

export type KeyOf<
  T extends object,
  Prev extends Key | undefined = undefined,
  Path extends Key | undefined = undefined,
  PrevTypes extends object = T,
> = string &
  {
    [K in keyof T]: T[K] extends PrevTypes | T // T[K] is a type alredy checked?
      ? //  Return all previous paths.
        Union<Union<Prev, Path>, Join<Path, K>>
      : // T[K] is an object?.
      Required<T>[K] extends ValidObject<Required<T>[K]>
      ? // Continue extracting
        KeyOf<Required<T>[K], Union<Prev, Path>, Join<Path, K>, PrevTypes | T>
      : // Return all previous paths, including current key.
        Union<Union<Prev, Path>, Join<Path, K>>
  }[keyof T]
export interface SelectableAutoCompleteProps<T extends FormikValues> {
  formik: ReturnType<typeof useFormik<T>>
  name: FormikControllerProps<T>[`name`]
  helperText?: React.ReactNode
}
export interface SelectableAutoCompleteReturnProps {
  onChange: (e: React.SyntheticEvent, value: Option) => void
  inputProps?: BaseTextFieldProps
}

export type AugmentedElementType = React.ReactElement[`type`] & {
  name: string
}

export interface UseFormikController<T extends FormikValues>
  extends Omit<FormikControllerProps<T>, `children`> {
  type: AugmentedElementType
}

export interface FormikControllerProps<T extends FormikValues> {
  formik: ReturnType<typeof useFormik<T>>
  children: React.ReactElement
  name: KeyOf<T>
  onChange?: InputProps[`onChange`]
  onBlur?: InputProps[`onBlur`]
}
export interface FastComponentProps<T extends FormikValues>
  extends Pick<FormikControllerProps<T>, `formik` | `children`> {
  value?: any
  helperText?: React.ReactNode
}
