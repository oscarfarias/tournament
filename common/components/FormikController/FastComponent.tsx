import { FormikValues } from 'formik'
import { memo } from 'react'
import { FastComponentProps } from './types'

const FastComponent = <T extends FormikValues>({
  children,
}: FastComponentProps<T>): JSX.Element => {
  return <>{children}</>
}
const MemoizedFastComponent: React.FC<FastComponentProps<any>> = memo(
  FastComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.helperText === nextProps.helperText &&
      prevProps.formik.isValid === nextProps.formik.isValid &&
      prevProps.formik.isSubmitting === nextProps.formik.isSubmitting &&
      prevProps.formik.isValidating === nextProps.formik.isValidating
    )
  },
)

export default MemoizedFastComponent
