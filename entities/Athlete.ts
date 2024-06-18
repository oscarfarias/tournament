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
import { Team } from './index'

//CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
@SoftDeletable(() => Athlete, `deletedAt`, () => new Date())
@Entity()
@Unique({ properties: [`deletedAt`, `document`] })
export class Athlete extends CustomBaseEntity {
  @PrimaryKey({ type: `uuid`, defaultRaw: `uuid_generate_v4()` })
  id: string = uuid4()
  @Property({ nullable: true })
  firstName?: string
  @Property({ nullable: true })
  lastName?: string
  @Property({ nullable: true })
  document?: string
  @Property({ nullable: true })
  shirtNumber?: string
  @Property({ nullable: true })
  order: number | null = null
  @ManyToOne({ entity: () => Team })
  team!: Team

  constructor() {
    super()
  }
}
