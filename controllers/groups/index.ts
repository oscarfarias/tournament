import { Category, Group } from 'entities'
import { getEntityManager, getRepository } from 'common/utils/orm'
import { NextApiResponse } from 'next'
import { successResponse } from 'common/utils/api'
import { errorResponse } from 'common/utils/api'
import { serializeCollection } from 'common/utils'
import { ExtendedRequest } from 'common/utils/next-connect'
import { PopulateHint, wrap } from '@mikro-orm/core'
import { isNumber } from 'lodash'

export const getGroupsByYear = async (
  req: ExtendedRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { year } = req.query

  const categoryRepository = getRepository(Category)
  const category = await categoryRepository.findOne({
    year,
  })
  if (!category) {
    errorResponse(res, `No se encontró la categoría con el año ${year}`)
    return
  }
  const groupRepository = getRepository(Group)
  const groups = await groupRepository.find(
    {
      category: category?.id,
    },
    {
      populate: [`teams`, `teams.athletes`],
      populateWhere: PopulateHint.INFER,
      orderBy: {
        order: `ASC`,
        teams: {
          order: `ASC`,
          athletes: {
            order: `ASC`,
          },
        },
      },
    },
  )

  const [groupsIds, groupsById] = serializeCollection({
    entity: groups,
  })
  successResponse(res, {
    groupsIds,
    groupsById,
  })
}

export const getGroupById = async (
  req: ExtendedRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { id } = req.query
  const groupRepository = getRepository(Group)
  const group = await groupRepository.findOne(
    {
      id,
    },
    {
      populate: [
        `teams`,
        `teams.athletes`,
        `category`,
        `matches`,
        `matches.teamA`,
        `matches.teamB`,
      ],
      populateWhere: PopulateHint.INFER,
    },
  )
  if (!group) {
    errorResponse(res, `No se encontró el grupo con el id ${id}`)
    return
  }
  successResponse(res, group)
}

export const upsertGroup = async (
  req: ExtendedRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { name, groupId, teams } = req.body

  const groupRepository = getRepository(Group)
  const group = await groupRepository.findOne(
    {
      id: groupId,
    },
    {
      populate: [`teams`, `category`],
    },
  )

  if (group == null) {
    errorResponse(res, `Grupo no encontrado`)
    return
  }
  if (group.name === name) {
    errorResponse(res, `Ya existe un grupo con el nombre ${name}`)
    return
  }
  let nextTeamsQuantity = 0

  if (teams) {
    nextTeamsQuantity = Number(teams)
  }

  const nextTeams = Array.from({ length: nextTeamsQuantity }).map(
    (_, index) => ({
      name: `Equipo ${index + 1}`,
      group: group.id,
      order: index + 1,
    }),
  )

  const nextGroup = {
    ...(name && { name }),
    ...(isNumber(teams) && { teams: nextTeams }),
  }

  const em = getEntityManager()
  const groupRef = em.getReference(`Group`, group.id)
  wrap(groupRef).assign(nextGroup)
  await em.persistAndFlush(groupRef)

  successResponse(res, groupRef)
}

export const createGroup = async (
  req: ExtendedRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { name, year } = req.body

  const categoryRepository = getRepository(Category)
  const category = await categoryRepository.findOne(
    {
      year,
    },
    {
      populate: [`groups`],
    },
  )
  if (!category) {
    errorResponse(res, `No se encontró la categoría con el año ${year}`)
    return
  }
  if (category.groups.length >= 3) {
    errorResponse(res, `No se pueden crear más de 3 grupos por categoría`)
    return
  }

  const groupRepository = getRepository(Group)
  const lastGroup = await groupRepository.findOne(
    {
      category: category.id,
    },
    {
      orderBy: {
        order: `DESC`,
      },
    },
  )
  const order = lastGroup?.order || 0

  const group = groupRepository.create({
    name,
    category: category.id,
    order: Number(order) + 1,
  })
  const em = getEntityManager()
  await em.persistAndFlush(group)
  await em.populate(group, [`teams`, `teams.athletes`, `category`])
  successResponse(res, group)
}

export const deleteGroup = async (
  req: ExtendedRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { id } = req.query
  const groupRepository = getRepository(Group)
  const group = await groupRepository.findOne(
    {
      id,
    },
    {
      populate: [`teams`, `teams.athletes`, `category`],
    },
  )
  if (!group) {
    errorResponse(res, `No se encontró el grupo con el id ${id}`)
    return
  }
  const em = getEntityManager()
  await em.removeAndFlush(group)
  successResponse(res, group)
}
