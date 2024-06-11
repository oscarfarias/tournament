import { Migration } from '@mikro-orm/migrations';

export class Migration20240425030158 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "Categories" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null default now(), "updatedAt" timestamptz(0) not null default now(), "deletedAt" timestamptz(0) null default null, "year" varchar(255) not null, constraint "Categories_pkey" primary key ("id"));');
    this.addSql('alter table "Categories" add constraint "Categories_deletedAt_year_unique" unique ("deletedAt", "year");');

    this.addSql('create table "Groups" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null default now(), "updatedAt" timestamptz(0) not null default now(), "deletedAt" timestamptz(0) null default null, "name" varchar(255) not null, "categoryId" uuid not null, constraint "Groups_pkey" primary key ("id"));');
    this.addSql('alter table "Groups" add constraint "Groups_deletedAt_name_unique" unique ("deletedAt", "name");');

    this.addSql('create table "Teams" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null default now(), "updatedAt" timestamptz(0) not null default now(), "deletedAt" timestamptz(0) null default null, "name" varchar(255) not null, "groupId" uuid not null, constraint "Teams_pkey" primary key ("id"));');
    this.addSql('alter table "Teams" add constraint "Teams_deletedAt_name_unique" unique ("deletedAt", "name");');

    this.addSql('create table "Matches" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null default now(), "updatedAt" timestamptz(0) not null default now(), "deletedAt" timestamptz(0) null default null, "teamAId" uuid not null, "teamBId" uuid not null, constraint "Matches_pkey" primary key ("id"));');
    this.addSql('alter table "Matches" add constraint "Matches_teamAId_unique" unique ("teamAId");');
    this.addSql('alter table "Matches" add constraint "Matches_teamBId_unique" unique ("teamBId");');
    this.addSql('alter table "Matches" add constraint "Matches_deletedAt_unique" unique ("deletedAt");');

    this.addSql('create table "Games" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null default now(), "updatedAt" timestamptz(0) not null default now(), "deletedAt" timestamptz(0) null default null, "matchId" uuid not null, "date" timestamptz(0) not null default now(), "statisticTeamAId" uuid null, "statisticTeamBId" uuid null, constraint "Games_pkey" primary key ("id"));');
    this.addSql('alter table "Games" add constraint "Games_matchId_unique" unique ("matchId");');
    this.addSql('alter table "Games" add constraint "Games_statisticTeamAId_unique" unique ("statisticTeamAId");');
    this.addSql('alter table "Games" add constraint "Games_statisticTeamBId_unique" unique ("statisticTeamBId");');
    this.addSql('alter table "Games" add constraint "Games_deletedAt_unique" unique ("deletedAt");');

    this.addSql('create table "Statistics" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null default now(), "updatedAt" timestamptz(0) not null default now(), "deletedAt" timestamptz(0) null default null, "goals" int not null, "average" int not null, "points" int not null, "teamId" uuid not null, "gameId" uuid not null, constraint "Statistics_pkey" primary key ("id"));');
    this.addSql('alter table "Statistics" add constraint "Statistics_teamId_unique" unique ("teamId");');
    this.addSql('alter table "Statistics" add constraint "Statistics_gameId_unique" unique ("gameId");');
    this.addSql('alter table "Statistics" add constraint "Statistics_deletedAt_unique" unique ("deletedAt");');

    this.addSql('create table "Athletes" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null default now(), "updatedAt" timestamptz(0) not null default now(), "deletedAt" timestamptz(0) null default null, "firstName" varchar(255) not null, "lastName" varchar(255) null, "document" varchar(255) not null, "birthDate" timestamptz(0) not null, "teamId" uuid not null, constraint "Athletes_pkey" primary key ("id"));');
    this.addSql('alter table "Athletes" add constraint "Athletes_deletedAt_document_unique" unique ("deletedAt", "document");');

    this.addSql('create table "Users" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null default now(), "updatedAt" timestamptz(0) not null default now(), "deletedAt" timestamptz(0) null default null, "firstName" varchar(255) not null, "lastName" varchar(255) null, "username" varchar(255) not null, "password" varchar(255) not null, constraint "Users_pkey" primary key ("id"));');
    this.addSql('alter table "Users" add constraint "Users_deletedAt_username_unique" unique ("deletedAt", "username");');

    this.addSql('alter table "Groups" add constraint "Groups_categoryId_foreign" foreign key ("categoryId") references "Categories" ("id") on update cascade;');

    this.addSql('alter table "Teams" add constraint "Teams_groupId_foreign" foreign key ("groupId") references "Groups" ("id") on update cascade;');

    this.addSql('alter table "Matches" add constraint "Matches_teamAId_foreign" foreign key ("teamAId") references "Teams" ("id") on update cascade;');
    this.addSql('alter table "Matches" add constraint "Matches_teamBId_foreign" foreign key ("teamBId") references "Teams" ("id") on update cascade;');

    this.addSql('alter table "Games" add constraint "Games_matchId_foreign" foreign key ("matchId") references "Matches" ("id") on update cascade;');
    this.addSql('alter table "Games" add constraint "Games_statisticTeamAId_foreign" foreign key ("statisticTeamAId") references "Statistics" ("id") on update cascade on delete set null;');
    this.addSql('alter table "Games" add constraint "Games_statisticTeamBId_foreign" foreign key ("statisticTeamBId") references "Statistics" ("id") on update cascade on delete set null;');

    this.addSql('alter table "Statistics" add constraint "Statistics_teamId_foreign" foreign key ("teamId") references "Teams" ("id") on update cascade;');
    this.addSql('alter table "Statistics" add constraint "Statistics_gameId_foreign" foreign key ("gameId") references "Games" ("id") on update cascade;');

    this.addSql('alter table "Athletes" add constraint "Athletes_teamId_foreign" foreign key ("teamId") references "Teams" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "Groups" drop constraint "Groups_categoryId_foreign";');

    this.addSql('alter table "Teams" drop constraint "Teams_groupId_foreign";');

    this.addSql('alter table "Matches" drop constraint "Matches_teamAId_foreign";');

    this.addSql('alter table "Matches" drop constraint "Matches_teamBId_foreign";');

    this.addSql('alter table "Statistics" drop constraint "Statistics_teamId_foreign";');

    this.addSql('alter table "Athletes" drop constraint "Athletes_teamId_foreign";');

    this.addSql('alter table "Games" drop constraint "Games_matchId_foreign";');

    this.addSql('alter table "Statistics" drop constraint "Statistics_gameId_foreign";');

    this.addSql('alter table "Games" drop constraint "Games_statisticTeamAId_foreign";');

    this.addSql('alter table "Games" drop constraint "Games_statisticTeamBId_foreign";');

    this.addSql('drop table if exists "Categories" cascade;');

    this.addSql('drop table if exists "Groups" cascade;');

    this.addSql('drop table if exists "Teams" cascade;');

    this.addSql('drop table if exists "Matches" cascade;');

    this.addSql('drop table if exists "Games" cascade;');

    this.addSql('drop table if exists "Statistics" cascade;');

    this.addSql('drop table if exists "Athletes" cascade;');

    this.addSql('drop table if exists "Users" cascade;');
  }

}
