import { Migration } from '@mikro-orm/migrations'

export class Migration20240723034417 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `alter table "Statistics" drop constraint "Statistics_matchId_unique";`,
    )
  }

  async down(): Promise<void> {
    this.addSql(
      `alter table "Statistics" add constraint "Statistics_matchId_unique" unique ("matchId");`,
    )
  }
}
