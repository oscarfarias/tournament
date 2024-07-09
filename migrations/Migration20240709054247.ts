import { Migration } from '@mikro-orm/migrations'

export class Migration20240709054247 extends Migration {
  async up(): Promise<void> {
    this.addSql(`alter table "Matches" add column "groupId" uuid not null;`)
    this.addSql(
      `alter table "Matches" add constraint "Matches_groupId_foreign" foreign key ("groupId") references "Groups" ("id") on update cascade;`,
    )
  }

  async down(): Promise<void> {
    this.addSql(
      `alter table "Matches" drop constraint "Matches_groupId_foreign";`,
    )

    this.addSql(`alter table "Matches" drop column "groupId";`)
  }
}
