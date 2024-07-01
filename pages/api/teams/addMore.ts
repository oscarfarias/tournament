import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import getHandler from 'common/utils/next-connect'
import { addMoreTeams } from 'controllers/teams'
const handler = getHandler()
handler.post(addMoreTeams)
export default withORM(handler)
