import { Migration } from '@mikro-orm/migrations'

export class Migration20240618045524 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `alter table "Athletes" alter column "firstName" type varchar(255) using ("firstName"::varchar(255));`,
    )
    this.addSql(
      `alter table "Athletes" alter column "firstName" drop not null;`,
    )
    this.addSql(
      `alter table "Athletes" alter column "document" type varchar(255) using ("document"::varchar(255));`,
    )
    this.addSql(`alter table "Athletes" alter column "document" drop not null;`)
    this.addSql(
      `alter table "Athletes" alter column "shirtNumber" type varchar(255) using ("shirtNumber"::varchar(255));`,
    )
    this.addSql(
      `alter table "Athletes" alter column "shirtNumber" drop not null;`,
    )
  }

  async down(): Promise<void> {
    this.addSql(
      `alter table "Athletes" alter column "firstName" type varchar(255) using ("firstName"::varchar(255));`,
    )
    this.addSql(`alter table "Athletes" alter column "firstName" set not null;`)
    this.addSql(
      `alter table "Athletes" alter column "document" type varchar(255) using ("document"::varchar(255));`,
    )
    this.addSql(`alter table "Athletes" alter column "document" set not null;`)
    this.addSql(
      `alter table "Athletes" alter column "shirtNumber" type varchar(255) using ("shirtNumber"::varchar(255));`,
    )
    this.addSql(
      `alter table "Athletes" alter column "shirtNumber" set not null;`,
    )
  }
}
