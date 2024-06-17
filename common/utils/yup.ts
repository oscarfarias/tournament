/* eslint-disable quotes */
import * as yup from 'yup'
declare module 'yup' {
  interface StringSchema {
    email(message?: string): StringSchema
  }
}

yup.addMethod(yup.string, `email`, function validateEmail(message) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  return this.matches(emailRegex, {
    message,
    name: 'email',
    excludeEmptyString: true,
  })
})

export default yup
