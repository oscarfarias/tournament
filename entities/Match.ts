import { PrimaryKey, Entity, Unique, ManyToOne } from '@mikro-orm/core'
import { CustomBaseEntity } from './BaseEntity'
import { SoftDeletable } from 'mikro-orm-soft-delete'
import uuid4 from 'uuid4'
import { Team } from './Team'
import { Group } from './Group'

//CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
@SoftDeletable(() => Match, `deletedAt`, () => new Date())
@Entity()
@Unique({ properties: [`deletedAt`] })
export class Match extends CustomBaseEntity {
  @PrimaryKey({ type: `uuid`, defaultRaw: `uuid_generate_v4()` })
  id: string = uuid4()
  @ManyToOne({ entity: () => Team })
  teamA!: Team
  @ManyToOne({ entity: () => Team })
  teamB!: Team
  @ManyToOne({ entity: () => Group })
  group!: Group

  constructor() {
    super()
  }
}
