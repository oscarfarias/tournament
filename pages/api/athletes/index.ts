import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import getHandler from 'common/utils/next-connect'
import schemaValidator from 'middlewares/schemaValidator'
import schema from 'common/schemas/athlete'

import { upsertAthlete } from 'controllers/athletes'
const handler = getHandler()
handler.post(schemaValidator({ body: schema }), upsertAthlete)
export default withORM(handler)
