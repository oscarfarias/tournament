import { Athlete, Group } from 'entities'
import { getEntityManager, getRepository } from 'common/utils/orm'
import { NextApiResponse } from 'next'
import { successResponse } from 'common/utils/api'
import { errorResponse } from 'common/utils/api'
import { ExtendedRequest } from 'common/utils/next-connect'
import { PopulateHint, wrap } from '@mikro-orm/core'

export const upsertAthlete = async (
  req: ExtendedRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { firstName, lastName, athleteId, shirtNumber, document } = req.body

  const athleteRepository = getRepository(Athlete)
  const athlete = await athleteRepository.findOne(
    {
      id: athleteId as string,
    },
    {
      populate: [`team`, `team.group`],
      populateWhere: PopulateHint.INFER,
    },
  )
  if (athlete == null) {
    errorResponse(res, `No se encontró el atleta con el id ${athleteId}`)
    return
  }

  const nextAthlete = {
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    ...(shirtNumber && { shirtNumber }),
    ...(document && { document }),
  }

  const em = getEntityManager()
  const athleteRef = em.getReference(`Athlete`, athlete.id)
  wrap(athleteRef).assign(nextAthlete)
  await em.persistAndFlush(athleteRef)
  const groupRepository = getRepository(Group)
  const group = await groupRepository.findOne(
    {
      id: athlete.team.group.id,
    },
    {
      populate: [`teams`, `teams.athletes`, `category`],
      populateWhere: PopulateHint.INFER,
      orderBy: {
        teams: {
          order: `ASC`,
          athletes: {
            order: `ASC`,
          },
        },
      },
    },
  )

  successResponse(res, group)
}
