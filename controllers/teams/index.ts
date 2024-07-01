import { Group, Team } from 'entities'
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
  const { name, athletes, teamId } = req.body

  const teamRepository = getRepository(Team)
  const team = await teamRepository.findOne({
    id: teamId as string,
  })
  if (team == null) {
    errorResponse(res, `No se encontró el equipo con el id ${teamId}`)
    return
  }
  let nextAthletesQuantity = 0
  if (athletes) {
    nextAthletesQuantity = Number(athletes)
  }
  const nextAthletes = Array.from({ length: nextAthletesQuantity }).map(
    (_, index) => ({
      firstName: null,
      lastName: null,
      document: null,
      shirtNumber: null,
      team: team.id,
      order: index + 1,
    }),
  )

  const nextTeam = {
    ...(name && { name }),
    ...(isNumber(athletes) && { athletes: nextAthletes }),
  }

  const em = getEntityManager()
  const teamRef = em.getReference(`Team`, team.id)
  wrap(teamRef).assign(nextTeam)
  await em.persistAndFlush(teamRef)
  const groupRepository = getRepository(Group)
  const group = await groupRepository.findOne(
    {
      id: team.group.id,
    },
    {
      populate: [`teams`, `teams.athletes`, `category`],
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

export const deleteTeam = async (
  req: ExtendedRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { id } = req.query
  const teamId = id as string
  const teamRepository = getRepository(Team)
  const team = await teamRepository.findOne({
    id: teamId as string,
  })
  if (team == null) {
    errorResponse(res, `No se encontró el equipo con el id ${teamId}`)
    return
  }
  const em = getEntityManager()
  await em.removeAndFlush(team)
  const groupRepository = getRepository(Group)
  const group = await groupRepository.findOne(
    {
      id: team.group.id,
    },
    {
      populate: [`teams`, `teams.athletes`, `category`],
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

export const addMoreTeams = async (
  req: ExtendedRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { teamsToAdd, groupId } = req.body
  const groupRepository = getRepository(Group)
  const teamRepository = getRepository(Team)
  const group = await groupRepository.findOne(
    {
      id: groupId as string,
    },
    {
      populate: [`teams`, `teams.athletes`, `teams.group`, `category`],
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
  if (group == null) {
    errorResponse(res, `No se encontró el grupo con el id ${groupId}`)
    return
  }
  const lastTeam = await teamRepository.findOne(
    {
      group: group.id,
    },
    {
      orderBy: {
        order: `DESC`,
      },
    },
  )

  const nextTeamsQuantity = Number(teamsToAdd)

  const em = getEntityManager()
  const teamOrder = lastTeam?.order ?? 1
  const nextTeams = Array.from({ length: nextTeamsQuantity }, (_, index) => {
    const order = Number(teamOrder) + Number(index) + 1
    const team = em.create(`Team`, {
      name: `Equipo ${order}`,
      order,
      group: group.id,
    })
    return team
  })
  await em.persistAndFlush(nextTeams)
  const nextGroup = await groupRepository.findOne(
    {
      id: group.id,
    },
    {
      populate: [`teams`, `teams.athletes`, `category`],
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

  successResponse(res, nextGroup)
}
