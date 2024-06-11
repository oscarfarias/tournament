import {
  PrimaryKey,
  Entity,
  Property,
  Unique,
  ManyToOne,
  OneToMany,
  Collection,
} from '@mikro-orm/core'

import { CustomBaseEntity } from './BaseEntity'
import { SoftDeletable } from 'mikro-orm-soft-delete'
import uuid4 from 'uuid4'
import { Group, Athlete } from './index'

//CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
@SoftDeletable(() => Team, `deletedAt`, () => new Date())
@Entity()
@Unique({ properties: [`deletedAt`, `name`] })
export class Team extends CustomBaseEntity {
  @PrimaryKey({ type: `uuid`, defaultRaw: `uuid_generate_v4()` })
  id: string = uuid4()
  @Property()
  name!: string
  @ManyToOne({ entity: () => Group })
  group!: Group
  @OneToMany(() => Athlete, (athlete) => athlete.team)
  athletes = new Collection<Athlete>(this)

  constructor() {
    super()
  }
}
