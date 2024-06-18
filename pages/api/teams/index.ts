import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import getHandler from 'common/utils/next-connect'
import schemaValidator from 'middlewares/schemaValidator'
import schema from 'common/schemas/team'
import { upsertTeam } from 'controllers/teams'
const handler = getHandler()
handler.post(schemaValidator({ body: schema }), upsertTeam)
export default withORM(handler)
