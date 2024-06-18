/* eslint-disable quotes */
import { GroupProps } from 'common/types'
import { SchemaOf } from 'common/types/yup'
import Yup from 'common/utils/yup'

const schema = Yup.object().shape<SchemaOf<GroupProps>>({
  groupId: Yup.string().required(`Id grupo requerido`),
  name: Yup.string().optional(),
  teams: Yup.number().optional(),
})
export default schema
