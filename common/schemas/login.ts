/* eslint-disable quotes */
import { LoginProps } from 'common/types/login'
import { SchemaOf } from 'common/types/yup'
import Yup from 'common/utils/yup'

const schema = Yup.object().shape<SchemaOf<LoginProps>>({
  username: Yup.string().required(`Usuario requerido`),
  password: Yup.string().required(`Contraseña requerida`),
})
export default schema
