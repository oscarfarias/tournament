import { Migration } from '@mikro-orm/migrations'

export class Migration20240807230555 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `alter table "Statistics" drop constraint "Statistics_teamId_unique";`,
    )
  }

  async down(): Promise<void> {
    this.addSql(
      `alter table "Statistics" add constraint "Statistics_teamId_unique" unique ("teamId");`,
    )
  }
}
