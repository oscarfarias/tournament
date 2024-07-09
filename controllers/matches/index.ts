import { Group, Match, Team } from 'entities'
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
      populate: [`matches`, `teams`, `category`],
      populateWhere: PopulateHint.INFER,
    },
  )
  if (!group) {
    errorResponse(res, `No se encontró el grupo con el id ${groupId}`)
    return
  }
  const matches: RequiredEntityData<Match>[] = []

  const isMatchable = (
    team: Team,
    opponent: Team,
    matches: RequiredEntityData<Match>[],
  ) => {
    const nextMatches = [...matches]
    const canMatch = nextMatches.every((match) => {
      return (
        team.id !== opponent.id &&
        match.teamA !== team.id &&
        match.teamB !== team.id &&
        match.teamA !== opponent.id &&
        match.teamB !== opponent.id
      )
    })

    return canMatch
  }

  group.teams.getItems().forEach((team) => {
    group.teams.getItems().forEach((opponent) => {
      if (isMatchable(team, opponent, matches)) {
        matches.push({
          group: group.id,
          teamA: team.id,
          teamB: opponent.id,
        })
      }
    })
  })
  console.log(`matches:`, matches)
  const em = getEntityManager()
  const groupRef = em.getReference(`Group`, group.id)
  wrap(groupRef).assign({
    matches,
  })
  await em.persistAndFlush(groupRef)
  await em.populate(groupRef as Group, [`category`, `teams`, `teams.athletes`])

  successResponse(res, groupRef)
}
