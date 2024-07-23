import {
  PrimaryKey,
  Entity,
  Property,
  Unique,
  OneToOne,
  OneToMany,
  Collection,
} from '@mikro-orm/core'

import { CustomBaseEntity } from './BaseEntity'
import { SoftDeletable } from 'mikro-orm-soft-delete'
import uuid4 from 'uuid4'

import { Team, Goal, Match } from './index'

//CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
@SoftDeletable(() => Statistic, `deletedAt`, () => new Date())
@Entity()
@Unique({ properties: [`deletedAt`] })
export class Statistic extends CustomBaseEntity {
  @PrimaryKey({ type: `uuid`, defaultRaw: `uuid_generate_v4()` })
  id: string = uuid4()
  @Property({ nullable: true })
  average?: number
  @Property({ nullable: true })
  points?: number
  @OneToOne({ entity: () => Team })
  team!: Team
  @OneToOne({ entity: () => Match })
  match!: Match

  @OneToMany(() => Goal, (goal) => goal.statistic, {
    orphanRemoval: true,
    nullable: true,
  })
  goals = new Collection<Goal>(this)

  constructor() {
    super()
  }
}
