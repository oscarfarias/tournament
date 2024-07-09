import { Group, Match } from 'entities'
import { getEntityManager, getRepository } from 'common/utils/orm'
import { NextApiResponse } from 'next'
import { successResponse } from 'common/utils/api'
import { errorResponse } from 'common/utils/api'
import { ExtendedRequest } from 'common/utils/next-connect'
import { PopulateHint, RequiredEntityData, wrap } from '@mikro-orm/core'

export const getMatchesByGroupId = async (
  req: ExtendedRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { groupId } = req.query
  const groupRepository = getRepository(Group)
  const group = await groupRepository.findOne(
    {
      id: groupId,
    },
    {
      populate: [`matches`],
      populateWhere: PopulateHint.INFER,
    },
  )
  if (!group) {
    errorResponse(res, `No se encontró el grupo con el id ${groupId}`)
    return
  }
  successResponse(res, group)
}

export const startMatch = async (
  req: ExtendedRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { groupId } = req.query
  const groupRepository = getRepository(Group)
  const group = await groupRepository.findOne(
    {
      id: groupId,
    },
    {
      populate: [`matches`, `teams`],
      populateWhere: PopulateHint.INFER,
    },
  )
  if (!group) {
    errorResponse(res, `No se encontró el grupo con el id ${groupId}`)
    return
  }
  const matches: RequiredEntityData<Match>[] = []
  group.teams.getItems().forEach((team) => {
    group.teams.getItems().forEach((opponent) => {
      if (team.id !== opponent.id) {
        matches.push({
          group,
          teamA: team,
          teamB: opponent,
        })
      }
    })
  })
  const em = getEntityManager()
  const groupRef = em.getReference(`Group`, group.id)
  wrap(groupRef).assign({
    matches,
  })
  await em.persistAndFlush(groupRef)

  successResponse(res, groupRef)
}
