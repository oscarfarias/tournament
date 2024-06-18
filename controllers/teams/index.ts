import { Team } from 'entities'
import { getEntityManager, getRepository } from 'common/utils/orm'
import { NextApiResponse } from 'next'
import { successResponse } from 'common/utils/api'
import { errorResponse } from 'common/utils/api'
import { ExtendedRequest } from 'common/utils/next-connect'
import { wrap } from '@mikro-orm/core'
import { isNumber } from 'lodash'

export const upsertTeam = async (
  req: ExtendedRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { id } = req.query
  const { name, athletes } = req.body

  const teamRepository = getRepository(Team)
  const team = await teamRepository.findOne({
    id,
  })
  if (team == null) {
    errorResponse(res, `No se encontró el equipo con el id ${id}`)
    return
  }
  let nextAthletesQuantity = 0
  if (athletes) {
    nextAthletesQuantity = Number(athletes)
  }
  const nextAthletes = Array.from({ length: nextAthletesQuantity }).map(() => ({
    firstName: null,
    lastName: null,
    document: null,
    shirtNumber: null,
  }))
  const nextTeam = {
    ...(name && { name }),
    ...(isNumber(athletes) && { teams: nextAthletes }),
  }

  const em = getEntityManager()
  const teamRef = em.getReference(`Team`, team.id)
  wrap(teamRef).assign(nextTeam)
  await em.persistAndFlush(teamRef)
  successResponse(res, teamRef)
}