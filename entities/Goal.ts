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

import { Athlete, Statistic } from './index'

//CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
@SoftDeletable(() => Goal, `deletedAt`, () => new Date())
@Entity()
@Unique({ properties: [`deletedAt`] })
export class Goal extends CustomBaseEntity {
  @PrimaryKey({ type: `uuid`, defaultRaw: `uuid_generate_v4()` })
  id: string = uuid4()
  @Property()
  goals!: number
  @ManyToOne({ entity: () => Athlete })
  athlete!: Athlete
  @ManyToOne({ entity: () => Statistic })
  statistic!: Statistic

  constructor() {
    super()
  }
}
