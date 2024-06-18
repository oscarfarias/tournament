import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import getHandler from 'common/utils/next-connect'
import { getGroupById } from 'controllers/groups'

const handler = getHandler()
handler.get(getGroupById)

export default withORM(handler)
