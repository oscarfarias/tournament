import { Migration } from '@mikro-orm/migrations'

export class Migration20240722154034 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `create table "Goals" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null default now(), "updatedAt" timestamptz(0) not null default now(), "deletedAt" timestamptz(0) null default null, "goals" int not null, "athleteId" uuid not null, "statisticId" uuid not null, constraint "Goals_pkey" primary key ("id"));`,
    )
    this.addSql(
      `alter table "Goals" add constraint "Goals_athleteId_unique" unique ("athleteId");`,
    )
    this.addSql(
      `alter table "Goals" add constraint "Goals_deletedAt_unique" unique ("deletedAt");`,
    )

    this.addSql(
      `alter table "Goals" add constraint "Goals_athleteId_foreign" foreign key ("athleteId") references "Athletes" ("id") on update cascade;`,
    )
    this.addSql(
      `alter table "Goals" add constraint "Goals_statisticId_foreign" foreign key ("statisticId") references "Statistics" ("id") on update cascade;`,
    )

    this.addSql(`alter table "Statistics" drop column "goals";`)
  }

  async down(): Promise<void> {
    this.addSql(`drop table if exists "Goals" cascade;`)

    this.addSql(`alter table "Statistics" add column "goals" int not null;`)
  }
}
