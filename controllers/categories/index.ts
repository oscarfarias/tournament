import { Category } from 'entities'
import { getEntityManager, getRepository } from 'common/utils/orm'
import { NextApiHandler, NextApiResponse } from 'next'
import { successResponse } from 'common/utils/api'
import { errorResponse } from 'common/utils/api'
import { serializeCollection } from 'common/utils'
import { ExtendedRequest } from 'common/utils/next-connect'

export const getCategories: NextApiHandler = async (req, res) => {
  const categoryRepositoy = getRepository(Category)
  try {
    const categories = await categoryRepositoy.findAll({
      orderBy: { year: `DESC`, groups: { order: `ASC` } },
      populate: [
        `groups`,
        `groups.teams`,
        `groups.teams.athletes`,
        `groups.matches`,
      ],
    })
    const [categoriesIds, categoriesById] = serializeCollection({
      entity: categories,
    })
    successResponse(res, {
      categoriesIds,
      categoriesById,
    })
  } catch (error) {
    errorResponse(res, `Error al obtener las categorías`)
  }
}

export const upsertCategory = async (
  req: ExtendedRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { year, groups } = req.body
  const categoryRepository = getRepository(Category)
  const categories = await categoryRepository.find({
    year,
  })
  if (categories.length > 0) {
    errorResponse(res, `Ya existe una categoría con el año ${year}`)
    return
  }
  const nextCategories = await categoryRepository.findAll({
    orderBy: { year: `ASC` },
  })
  if (nextCategories.length > 0) {
    const firstCategory = nextCategories[0]
    const lastCategory = nextCategories[nextCategories.length - 1]
    const lastYear = Number(lastCategory.year)
    const firstYear = Number(firstCategory.year)
    if (Number(year) < firstYear) {
      errorResponse(
        res,
        `El año debe ser consecutivo al año ${firstYear}, puede intentar con el año ${
          lastYear + 1
        }`,
      )
      return
    }
  }

  const nextGroups = Array.from({ length: groups }).map((_, index) => ({
    name: `Grupo ${index + 1}`,
    order: index + 1,
  }))

  const newCategory = await categoryRepository.create({
    year,
    groups: nextGroups,
  })

  const em = getEntityManager()
  await em.persistAndFlush(newCategory)
  successResponse(res, newCategory)
}
