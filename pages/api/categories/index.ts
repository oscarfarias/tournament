import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import getHandler from 'common/utils/next-connect'
import { getCategories, upsertCategory } from 'controllers/categories'
import schemaValidator from 'middlewares/schemaValidator'
import schema from 'common/schemas/category'
const handler = getHandler()
handler.get(getCategories)
handler.post(schemaValidator({ body: schema }), upsertCategory)
export default withORM(handler)
