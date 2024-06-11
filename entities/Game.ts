import { PrimaryKey, Entity, OneToOne, Unique, Property } from '@mikro-orm/core'

import { CustomBaseEntity } from './BaseEntity'
import { SoftDeletable } from 'mikro-orm-soft-delete'
import uuid4 from 'uuid4'

import { Statistic, Match } from './index'

//CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
@SoftDeletable(() => Game, `deletedAt`, () => new Date())
@Entity()
@Unique({ properties: [`deletedAt`] })
export class Game extends CustomBaseEntity {
  @PrimaryKey({ type: `uuid`, defaultRaw: `uuid_generate_v4()` })
  id: string = uuid4()
  @OneToOne({ entity: () => Match })
  match!: Match
  @Property({ defaultRaw: `now()` })
  date?: Date
  @OneToOne(() => Statistic, (statistic) => statistic.game, {
    owner: true,
    nullable: true,
    mappedBy: `game`,
  })
  statisticTeamA?: Statistic
  @OneToOne(() => Statistic, (statistic) => statistic.game, {
    owner: true,
    nullable: true,
  })
  statisticTeamB?: Statistic

  constructor() {
    super()
  }
}
