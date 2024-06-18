/* eslint-disable quotes */

import { TeamProps } from 'common/types/team'
import { SchemaOf } from 'common/types/yup'
import Yup from 'common/utils/yup'

const schema = Yup.object().shape<SchemaOf<TeamProps>>({
  teamId: Yup.string().required(`Id equipo requerido`),
  name: Yup.string().optional(),
  athletes: Yup.number().optional(),
})
export default schema
