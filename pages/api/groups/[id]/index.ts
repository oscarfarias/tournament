import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import getHandler from 'common/utils/next-connect'
import { getGroupById, deleteGroup } from 'controllers/groups'

const handler = getHandler()
handler.get(getGroupById)
handler.delete(deleteGroup)

export default withORM(handler)
