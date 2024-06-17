import type { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import { Faker, Factory } from '@mikro-orm/seeder'
import { User } from '../entities'
import bcrypt from 'bcrypt'
export class UserFactory extends Factory<User> {
  model = User
  definition(faker: Faker): Partial<User> {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.email(),
      password: bcrypt.hashSync(`123456`, 10),
    }
  }
}

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await new UserFactory(em)
      .each((user) => {
        user.firstName = `Admin`
        user.lastName = `Admin`
        user.username = `admin`
        user.role = em.getReference(`Role`, 1)
      })
      .makeOne()
    await new UserFactory(em)
      .each((user) => {
        user.role = em.getReference(`Role`, 2)
      })
      .create(5)
  }
}
