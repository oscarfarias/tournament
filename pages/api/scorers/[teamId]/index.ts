import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import getHandler from 'common/utils/next-connect'
import { getScorersByTeamId } from 'controllers/statistics'

const handler = getHandler()
handler.get(getScorersByTeamId)

export default withORM(handler)
