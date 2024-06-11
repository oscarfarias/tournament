import { PrimaryKey, Entity, Property, Unique, OneToOne } from '@mikro-orm/core'

import { CustomBaseEntity } from './BaseEntity'
import { SoftDeletable } from 'mikro-orm-soft-delete'
import uuid4 from 'uuid4'

import { Team, Game } from './index'

//CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
@SoftDeletable(() => Statistic, `deletedAt`, () => new Date())
@Entity()
@Unique({ properties: [`deletedAt`] })
export class Statistic extends CustomBaseEntity {
  @PrimaryKey({ type: `uuid`, defaultRaw: `uuid_generate_v4()` })
  id: string = uuid4()
  @Property()
  goals!: number
  @Property()
  average!: number
  @Property()
  points!: number
  @OneToOne({ entity: () => Team })
  team!: Team
  @OneToOne({ entity: () => Game })
  game!: Game
  constructor() {
    super()
  }
}
