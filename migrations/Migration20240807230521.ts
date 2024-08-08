import { Migration } from '@mikro-orm/migrations'

export class Migration20240807230521 extends Migration {
  async up(): Promise<void> {
    this.addSql(`alter table "Goals" drop constraint "Goals_athleteId_unique";`)
  }

  async down(): Promise<void> {
    this.addSql(
      `alter table "Goals" add constraint "Goals_athleteId_unique" unique ("athleteId");`,
    )
  }
}
