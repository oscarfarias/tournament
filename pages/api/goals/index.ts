import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import getHandler from 'common/utils/next-connect'
import { registerGoal } from 'controllers/statistics'
const handler = getHandler()
handler.post(registerGoal)
export default withORM(handler)
