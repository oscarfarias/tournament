import { Migration } from '@mikro-orm/migrations'

export class Migration20240709100432 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `alter table "Matches" drop constraint "Matches_teamAId_unique";`,
    )
    this.addSql(
      `alter table "Matches" drop constraint "Matches_teamBId_unique";`,
    )
  }

  async down(): Promise<void> {
    this.addSql(
      `alter table "Matches" add constraint "Matches_teamAId_unique" unique ("teamAId");`,
    )
    this.addSql(
      `alter table "Matches" add constraint "Matches_teamBId_unique" unique ("teamBId");`,
    )
  }
}
