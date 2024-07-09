import {
  PrimaryKey,
  Entity,
  Property,
  Unique,
  ManyToOne,
  Collection,
  OneToMany,
} from '@mikro-orm/core'
import { CustomBaseEntity } from './BaseEntity'
import { SoftDeletable } from 'mikro-orm-soft-delete'
import uuid4 from 'uuid4'
import { Category, Match, Team } from './index'

@SoftDeletable(() => Group, `deletedAt`, () => new Date())
@Entity()
@Unique({ properties: [`deletedAt`, `name`] })
export class Group extends CustomBaseEntity {
  @PrimaryKey({ type: `uuid`, defaultRaw: `uuid_generate_v4()` })
  id: string = uuid4()
  @Property()
  name!: string
  @Property({ nullable: true })
  order: number | null = null
  @ManyToOne({ entity: () => Category })
  category!: Category
  @OneToMany(() => Team, (team) => team.group, {
    orphanRemoval: true,
    nullable: true,
  })
  teams = new Collection<Team>(this)
  @OneToMany(() => Match, (match) => match.group, {
    orphanRemoval: true,
    nullable: true,
  })
  matches = new Collection<Match>(this)

  constructor() {
    super()
  }
}
