import { Role } from '../entities'
import { EntityRepository } from '@mikro-orm/postgresql'

export class RoleRepository extends EntityRepository<Role> {}
