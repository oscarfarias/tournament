import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import getHandler from 'common/utils/next-connect'
import { deleteTeam } from 'controllers/teams'

const handler = getHandler()
handler.delete(deleteTeam)

export default withORM(handler)
