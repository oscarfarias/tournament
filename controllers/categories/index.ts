import { Category } from 'entities'
import { getRepository } from 'common/utils/orm'
import { NextApiHandler } from 'next'
import { successResponse } from 'common/utils/api'
import { errorResponse } from 'common/utils/api'

export const getCategories: NextApiHandler = async (req, res) => {
  const categoryRepositoy = getRepository(Category)
  try {
    const categories = await categoryRepositoy.findAll()
    successResponse<Category[]>(res, categories)
  } catch (error) {
    errorResponse(res, `Error al obtener las categorías`)
  }
}
