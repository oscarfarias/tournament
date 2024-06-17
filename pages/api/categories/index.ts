import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import getHandler from 'common/utils/next-connect'
import { getCategories } from 'controllers/categories'

const handler = getHandler()
handler.get(getCategories)
export default withORM(handler)
