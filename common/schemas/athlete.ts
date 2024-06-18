/* eslint-disable quotes */

import { AthleteProps } from 'common/types/athlete'
import { SchemaOf } from 'common/types/yup'
import Yup from 'common/utils/yup'

const schema = Yup.object().shape<SchemaOf<AthleteProps>>({
  athleteId: Yup.string().required(`Id de atleta requerido`),
  firstName: Yup.string().optional(),
  lastName: Yup.string().optional(),
  document: Yup.string().optional(),
  shirtNumber: Yup.string().optional(),
})
export default schema
