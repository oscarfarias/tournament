import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import getHandler from 'common/utils/next-connect'
import { getAthletesByTeam } from 'controllers/athletes'

const handler = getHandler()
handler.get(getAthletesByTeam)

export default withORM(handler)
