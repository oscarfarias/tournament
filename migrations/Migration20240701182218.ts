import { Migration } from '@mikro-orm/migrations'

export class Migration20240701182218 extends Migration {
  async up(): Promise<void> {
    this.addSql(`alter table "Groups" add column "order" varchar(255) null;`)
  }

  async down(): Promise<void> {
    this.addSql(`alter table "Groups" drop column "order";`)
  }
}
