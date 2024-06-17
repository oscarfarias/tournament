import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import getHandler from 'common/utils/next-connect'
import { upsertGroup } from 'controllers/groups'
import schemaValidator from 'middlewares/schemaValidator'
import schema from 'common/schemas/group'
const handler = getHandler()
handler.post(schemaValidator({ body: schema }), upsertGroup)
export default withORM(handler)
