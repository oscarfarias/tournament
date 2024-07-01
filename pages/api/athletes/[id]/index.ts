import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import getHandler from 'common/utils/next-connect'
import { deleteAthlete } from 'controllers/athletes'

const handler = getHandler()
handler.delete(deleteAthlete)

export default withORM(handler)
