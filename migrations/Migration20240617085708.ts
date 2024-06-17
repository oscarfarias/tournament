import { Migration } from '@mikro-orm/migrations'

export class Migration20240617085708 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `create table "Roles" ("id" serial primary key, "createdAt" timestamptz(0) not null default now(), "updatedAt" timestamptz(0) not null default now(), "deletedAt" timestamptz(0) null default null, "name" varchar(255) not null);`,
    )
    this.addSql(
      `alter table "Roles" add constraint "Roles_deletedAt_unique" unique ("deletedAt");`,
    )

    this.addSql(`alter table "Users" add column "roleId" int not null;`)
    this.addSql(
      `alter table "Users" add constraint "Users_roleId_foreign" foreign key ("roleId") references "Roles" ("id") on update cascade;`,
    )
  }

  async down(): Promise<void> {
    this.addSql(`alter table "Users" drop constraint "Users_roleId_foreign";`)

    this.addSql(`drop table if exists "Roles" cascade;`)

    this.addSql(`alter table "Users" drop column "roleId";`)
  }
}
