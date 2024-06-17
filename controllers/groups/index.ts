import { Category, Group } from 'entities'
import { getEntityManager, getRepository } from 'common/utils/orm'
import { NextApiResponse } from 'next'
import { successResponse } from 'common/utils/api'
import { errorResponse } from 'common/utils/api'
import { serializeCollection } from 'common/utils'
import { ExtendedRequest } from 'common/utils/next-connect'
import { wrap } from '@mikro-orm/core'

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
  const groups = await groupRepository.find({
    category: category?.id,
  })
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
  const { categoryId, name } = req.body
  const categoryRepository = getRepository(Category)
  const category = await categoryRepository.findOne({
    id: categoryId,
  })
  if (!category) {
    errorResponse(res, `No se encontró la categoría`)
    return
  }
  const groupRepository = getRepository(Group)
  const group = await groupRepository.findOne({
    category: category?.id,
  })

  if (group == null) {
    errorResponse(res, `Grupo no encontrado`)
    return
  }
  if (group.name === name) {
    errorResponse(res, `Ya existe un grupo con el nombre ${name}`)
    return
  }
  const nextGroup = {
    ...group,
    name,
  }
  const em = getEntityManager()
  const groupRef = em.getReference(`Group`, group.id)
  wrap(groupRef).assign(nextGroup)
  await em.persistAndFlush(groupRef)
  successResponse(res, groupRef)
}
