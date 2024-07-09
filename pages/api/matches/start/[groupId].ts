import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import getHandler from 'common/utils/next-connect'
import { startMatch } from 'controllers/matches'

const handler = getHandler()
handler.post(startMatch)

export default withORM(handler)
