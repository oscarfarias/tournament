import { Category, Group } from 'entities'
import { getEntityManager, getRepository } from 'common/utils/orm'
import { NextApiResponse } from 'next'
import { successResponse } from 'common/utils/api'
import { errorResponse } from 'common/utils/api'
import { serializeCollection } from 'common/utils'
import { ExtendedRequest } from 'common/utils/next-connect'
import { wrap } from '@mikro-orm/core'
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
      populate: [`teams`],
      orderBy: {
        teams: {
          order: `ASC`,
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
  const group = await groupRepository.findOne({
    id,
  })
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
      populate: [`teams`],
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
