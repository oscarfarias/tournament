import { Group } from 'entities'
import { getRepository } from 'common/utils/orm'
import { NextApiResponse } from 'next'
import { successResponse } from 'common/utils/api'
import { errorResponse } from 'common/utils/api'
import { ExtendedRequest } from 'common/utils/next-connect'
import { PopulateHint } from '@mikro-orm/core'

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
