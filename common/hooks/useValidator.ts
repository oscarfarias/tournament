import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import type {
  UseFormHandleSubmit,
  FieldValues,
  UseFormWatch,
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
  Control,
} from 'react-hook-form'

interface Validator {
  handleSubmit: UseFormHandleSubmit<FieldValues>
  register: UseFormRegister<FieldValues>
  errors: any
  setValue: UseFormSetValue<FieldValues>
  watch: UseFormWatch<FieldValues>
  control: Control<FieldValues>
  getValues: UseFormGetValues<FieldValues>
}
export default function useValidator(schema: Joi.Schema<unknown>): Validator {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: joiResolver(schema),
  })
  return {
    handleSubmit,
    setValue,
    watch,
    register,
    control,
    errors,
    getValues,
  }
}
