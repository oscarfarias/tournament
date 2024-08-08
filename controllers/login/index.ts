/* eslint-disable @typescript-eslint/no-non-null-assertion */
import 'reflect-metadata'
import { NextApiHandler, NextApiResponse } from 'next'
import { successResponse } from 'common/utils/api'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { AuthorizedUser } from 'common/types'
import { errorResponse } from 'common/utils/api'
import { ExtendedRequest } from 'common/utils/next-connect'
import Boom from '@hapi/boom'
import { User } from 'entities/User'
import { getRepository } from 'common/utils/orm'

dotenv.config()
export const userLogin: NextApiHandler = async (req, res) => {
  const { username, password } = req.body
  const userRepository = getRepository(User)
  const user = await userRepository.findOne(
    { username },
    { populate: [`password`, `role`] },
  )
  if (user && bcrypt.compareSync(password, user?.password)) {
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET!)
    successResponse<AuthorizedUser>(res, { user, token })
  } else {
    errorResponse(res, `Usuario o contraseña incorrectos`)
  }
}
export const getCurrentUser = async (
  req: ExtendedRequest,
  res: NextApiResponse,
): Promise<void> => {
  const user = req.user
  if (user) {
    successResponse<User>(res, user)
  } else {
    throw Boom.badRequest(`Token inválido`)
  }
}
