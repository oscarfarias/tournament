import { FormikValues, useFormik } from 'formik'
import { InputProps, BaseTextFieldProps } from '@mui/material'
import { Option } from 'common/types'

export type KeyOf<T extends object, D extends string = ``> = {
  [K in keyof T]: `${D}${Exclude<K, symbol>}${
    | ``
    | (T[K] extends object & { length?: never } ? KeyOf<T[K], `.`> : ``)}`
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
