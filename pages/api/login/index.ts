import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import { userLogin } from 'controllers/login'
import getHandler from 'common/utils/next-connect'
import schemaValidator from 'middlewares/schemaValidator'
import schema from 'common/schemas/login'

const handler = getHandler()
handler.post(schemaValidator({ body: schema }), userLogin)
export default withORM(handler)
