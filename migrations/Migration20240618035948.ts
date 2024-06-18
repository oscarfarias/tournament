import { Migration } from '@mikro-orm/migrations'

export class Migration20240618035948 extends Migration {
  async up(): Promise<void> {
    this.addSql(`alter table "Teams" add column "order" varchar(255) null;`)

    this.addSql(
      `alter table "Athletes" add column "shirtNumber" varchar(255) not null;`,
    )
    this.addSql(`alter table "Athletes" drop column "birthDate";`)
  }

  async down(): Promise<void> {
    this.addSql(`alter table "Teams" drop column "order";`)

    this.addSql(
      `alter table "Athletes" add column "birthDate" timestamptz(0) not null;`,
    )
    this.addSql(`alter table "Athletes" drop column "shirtNumber";`)
  }
}
