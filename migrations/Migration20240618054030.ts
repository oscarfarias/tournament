import { Migration } from '@mikro-orm/migrations'

export class Migration20240618054030 extends Migration {
  async up(): Promise<void> {
    this.addSql(`alter table "Athletes" add column "order" varchar(255) null;`)
  }

  async down(): Promise<void> {
    this.addSql(`alter table "Athletes" drop column "order";`)
  }
}
