import { RequiredEntityData } from '@mikro-orm/core'
import { User } from '../entities'
import { EntityRepository } from '@mikro-orm/postgresql'
import bcrypt from 'bcrypt'
export class UserRepository extends EntityRepository<User> {
  upsert = async (user: RequiredEntityData<User>): Promise<User> => {
    this.getEntityManager()
    const em = await this.getEntityManager()
    if (user.id) {
      const updatedUser = await this.findOne(user.id, { populate: [`role`] })
      if (updatedUser) {
        const upsertedUser = await em.assign(updatedUser, user)
        await em.persistAndFlush(upsertedUser)
        await em.populate(upsertedUser, [`role`])
        return upsertedUser
      }
    }
    const upsertedUser = await this.create({
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    })
    await em.persistAndFlush(upsertedUser)
    await em.populate(upsertedUser, [`role`])
    return upsertedUser
  }
}
