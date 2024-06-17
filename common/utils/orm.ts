import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import {
  EntityName,
  GetRepository,
  MikroORM,
  RequestContext,
} from '@mikro-orm/core'
import {
  EntityManager,
  EntityRepository,
  SqlEntityRepository,
} from '@mikro-orm/postgresql'
import config from '../../config/mikro-orm'
import { NextHandler } from 'next-connect'

declare global {
  // eslint-disable-next-line no-var
  var __MikroORM__: MikroORM
}
async function getORM(): Promise<MikroORM> {
  if (!global.__MikroORM__) {
    global.__MikroORM__ = await MikroORM.init(config)
  }
  return global.__MikroORM__
}

export async function useORM(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler,
): Promise<void> {
  const orm = await getORM()
  RequestContext.create(orm.em, next)
}

export function withORM(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const orm = await getORM()
    return RequestContext.createAsync(orm.em, async () => handler(req, res))
  }
}

export function getEntityManager(): EntityManager {
  const em = RequestContext.getEntityManager() as EntityManager | undefined
  if (!em)
    throw new Error(
      `Entity manager not found. Are you in a 'withORM'-wrapped Context?`,
    )
  return em
}
export function getRepository<
  T extends object,
  U extends EntityRepository<T> = SqlEntityRepository<T>,
>(entityName: EntityName<T>): GetRepository<T, U> {
  const em = getEntityManager()
  return em.getRepository(entityName)
}
