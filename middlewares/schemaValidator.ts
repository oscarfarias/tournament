import { NextApiRequest, NextApiResponse } from 'next'
import { AnySchema } from 'yup'
import Boom from '@hapi/boom'
import { errorResponse } from 'common/utils/api'

const withYup = (schemas: {
  body?: AnySchema
  headers?: AnySchema
  query?: AnySchema
}) => {
  return async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const promises: Promise<any>[] = []
      if (schemas.body) {
        promises.push(schemas.body.validate(req.body, { abortEarly: false }))
      }
      if (schemas.headers) {
        promises.push(
          schemas.headers.validate(req.headers, { abortEarly: false }),
        )
      }
      if (schemas.query) {
        promises.push(schemas.query.validate(req.query, { abortEarly: false }))
      }
      await Promise.all(promises)
      next()
    } catch (error) {
      errorResponse(res, Boom.badRequest(`Invalid Params`, error))
    }
  }
}

export default withYup
