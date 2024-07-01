import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import getHandler from 'common/utils/next-connect'
import { createGroup } from 'controllers/groups'

const handler = getHandler()
handler.post(createGroup)
export default withORM(handler)
