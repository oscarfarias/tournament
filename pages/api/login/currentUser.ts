import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import { getCurrentUser } from 'controllers/login'
import getHandler from 'common/utils/next-connect'
const handler = getHandler()
handler.get(getCurrentUser)
export default withORM(handler)
