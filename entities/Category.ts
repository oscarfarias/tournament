import {
  PrimaryKey,
  Entity,
  Property,
  Unique,
  OneToMany,
  Collection,
} from '@mikro-orm/core'

import { CustomBaseEntity } from './BaseEntity'
import { SoftDeletable } from 'mikro-orm-soft-delete'
import uuid4 from 'uuid4'
import { Group } from './index'

//CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
@SoftDeletable(() => Category, `deletedAt`, () => new Date())
@Entity()
@Unique({ properties: [`deletedAt`, `year`] })
export class Category extends CustomBaseEntity {
  @PrimaryKey({ type: `uuid`, defaultRaw: `uuid_generate_v4()` })
  id: string = uuid4()
  @Property()
  year!: string
  @OneToMany(() => Group, (group) => group.category)
  groups = new Collection<Group>(this)
  constructor() {
    super()
  }
}
