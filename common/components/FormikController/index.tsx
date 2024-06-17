import { FormikValues } from 'formik'
import { FormikControllerProps, AugmentedElementType } from './types'
import useFormikController from './hooks'
import FastComponent from './FastComponent'

const FormikController = <T extends FormikValues>({
  formik,
  children,
  name,
  onChange,
  onBlur,
}: FormikControllerProps<T>): JSX.Element => {
  const Component = children
  const type = Component.type as AugmentedElementType
  const { handleOnBlur, props, handleOnChange, value, helperText } =
    useFormikController<T>({
      formik,
      name,
      onChange,
      onBlur,
      type,
    })
  return (
    <FastComponent formik={formik} value={value} helperText={helperText}>
      <Component.type
        name={name}
        value={value}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        error={!!helperText}
        helperText={helperText}
        {...props}
        {...Component.props}
      />
    </FastComponent>
  )
}

export default FormikController
