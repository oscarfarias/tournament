import {
  PrimaryKey,
  Entity,
  Property,
  Collection,
  OneToMany,
  Unique,
} from '@mikro-orm/core'
import { CustomBaseEntity } from './BaseEntity'
import { User } from './index'
import { SoftDeletable } from 'mikro-orm-soft-delete'
import { RoleRepository } from '../repositories/roleRepository'

@SoftDeletable(() => Role, `deletedAt`, () => new Date())
@Entity({ customRepository: () => RoleRepository })
@Unique({ properties: [`deletedAt`] })
export class Role extends CustomBaseEntity {
  @PrimaryKey()
  id!: number
  @Property()
  name!: string
  //relationships
  @OneToMany(() => User, (user) => user.role)
  users = new Collection<User>(this)
  constructor({ name }: { name: string }) {
    super()
    this.name = name
  }
}
