import { useState, useEffect } from 'react'
import { FormikValues } from 'formik'
import {
  UseFormikController,
  SelectableAutoCompleteProps,
  SelectableAutoCompleteReturnProps,
} from './types'
import { get } from 'lodash'
import useDebounce from 'common/hooks/useDebounce'
const selectableProps: {
  [key: string]: <T extends FormikValues>(
    props: SelectableAutoCompleteProps<T>,
  ) => SelectableAutoCompleteReturnProps
} = {
  Autocomplete: <T extends FormikValues>({
    formik,
    name,
    helperText,
  }: SelectableAutoCompleteProps<T>): SelectableAutoCompleteReturnProps => {
    return {
      onChange: (e, option) => {
        formik.setFieldValue(name, option?.label || ``)
      },
      inputProps: {
        error: !!helperText,
        helperText,
      },
    }
  },
}

const useFormikController = <T extends FormikValues>({
  formik,
  onChange,
  onBlur,
  type,
  name,
}: UseFormikController<T>) => {
  const formikValue = get(formik?.values, name)
  const helperText = get(formik?.errors, name)

  const [value, setValue] = useState(formikValue || ``)
  const debouncedValue = useDebounce(value, 10)
  useEffect(() => {
    if (formikValue !== debouncedValue) {
      formik?.setFieldValue(name, debouncedValue)
    }
  }, [debouncedValue])
  useEffect(() => {
    if (formikValue !== value) {
      setValue(formikValue)
    }
  }, [formikValue])
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value)
    if (onChange) {
      onChange(event)
    }
  }
  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    formik.handleBlur(event)
    if (onBlur) {
      onBlur(event)
    }
  }

  let props: any = {}
  const selectable = selectableProps[type?.name ?? ``]
  if (selectable) {
    props = {
      ...props,
      ...selectable({ formik, name, helperText }),
      onFocus: formik.handleBlur,
    }
  }

  return {
    handleOnChange,
    handleOnBlur,
    props,
    formikValue,
    value,
    helperText,
  }
}
export default useFormikController
