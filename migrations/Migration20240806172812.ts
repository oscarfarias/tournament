import { Migration } from '@mikro-orm/migrations'

export class Migration20240806172812 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `alter table "Statistics" add column "goalsAgainst" int null, add column "goalsInFavor" int null, add column "difference" int null;`,
    )
  }

  async down(): Promise<void> {
    this.addSql(`alter table "Statistics" drop column "goalsAgainst";`)
    this.addSql(`alter table "Statistics" drop column "goalsInFavor";`)
    this.addSql(`alter table "Statistics" drop column "difference";`)
  }
}
