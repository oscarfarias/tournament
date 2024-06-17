import { Category } from 'entities'
import { getRepository } from 'common/utils/orm'
import { NextApiHandler } from 'next'
import { successResponse } from 'common/utils/api'
import { errorResponse } from 'common/utils/api'
import { serializeCollection } from 'common/utils'

export const getCategories: NextApiHandler = async (req, res) => {
  const categoryRepositoy = getRepository(Category)
  try {
    const categories = await categoryRepositoy.findAll()
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
