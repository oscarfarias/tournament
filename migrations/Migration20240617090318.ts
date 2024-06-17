import { Migration } from '@mikro-orm/migrations'
import { ROLES } from '../common/config/constants'
export class Migration2024061709031 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `insert into "Roles" ("name") values ('${ROLES.ADMIN}'),('${ROLES.SUPERVISOR}');`,
    )
  }
  async down(): Promise<void> {
    this.addSql(
      `delete from "Roles" where "name" in ('${ROLES.ADMIN}','${ROLES.SUPERVISOR}');`,
    )
  }
}
