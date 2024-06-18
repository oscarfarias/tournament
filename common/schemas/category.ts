/* eslint-disable quotes */
import { CategoriesProps } from 'common/types'
import { SchemaOf } from 'common/types/yup'
import Yup from 'common/utils/yup'

const schema = Yup.object().shape<SchemaOf<CategoriesProps>>({
  year: Yup.string().required(`Año requerido`),
  groups: Yup.string().required(`Tipo de grupo requerido`),
})
export default schema
