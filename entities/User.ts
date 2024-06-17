import {
  PrimaryKey,
  Entity,
  Property,
  Unique,
  ManyToOne,
} from '@mikro-orm/core'

import { CustomBaseEntity } from './BaseEntity'
import { SoftDeletable } from 'mikro-orm-soft-delete'
import uuid4 from 'uuid4'
import { Role } from './Role'

//CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
@SoftDeletable(() => User, `deletedAt`, () => new Date())
@Entity()
@Unique({ properties: [`deletedAt`, `username`] })
export class User extends CustomBaseEntity {
  @PrimaryKey({ type: `uuid`, defaultRaw: `uuid_generate_v4()` })
  id: string = uuid4()
  @Property()
  firstName!: string
  @Property({ nullable: true })
  lastName?: string
  @Property()
  username!: string
  @Property()
  password!: string
  @ManyToOne({ entity: () => Role })
  role!: Role

  constructor() {
    super()
  }
}
