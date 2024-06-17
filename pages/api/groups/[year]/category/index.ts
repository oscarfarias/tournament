import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import getHandler from 'common/utils/next-connect'
import { getGroupsByYear } from 'controllers/groups'

const handler = getHandler()
handler.get(getGroupsByYear)

export default withORM(handler)
