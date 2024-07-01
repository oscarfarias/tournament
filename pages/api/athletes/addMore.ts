import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import getHandler from 'common/utils/next-connect'

import { addMoreAthletes } from 'controllers/athletes'
const handler = getHandler()
handler.post(addMoreAthletes)
export default withORM(handler)
