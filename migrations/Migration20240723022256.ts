import { Migration } from '@mikro-orm/migrations'

export class Migration20240723022256 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `alter table "Statistics" drop constraint "Statistics_gameId_foreign";`,
    )

    this.addSql(
      `alter table "Games" drop constraint "Games_statisticTeamAId_foreign";`,
    )
    this.addSql(
      `alter table "Games" drop constraint "Games_statisticTeamBId_foreign";`,
    )

    this.addSql(
      `alter table "Matches" add column "date" timestamptz(0) not null default now(), add column "statisticTeamAId" uuid null, add column "statisticTeamBId" uuid null;`,
    )
    this.addSql(
      `alter table "Matches" add constraint "Matches_statisticTeamAId_foreign" foreign key ("statisticTeamAId") references "Statistics" ("id") on update cascade on delete set null;`,
    )
    this.addSql(
      `alter table "Matches" add constraint "Matches_statisticTeamBId_foreign" foreign key ("statisticTeamBId") references "Statistics" ("id") on update cascade on delete set null;`,
    )
    this.addSql(
      `alter table "Matches" add constraint "Matches_statisticTeamAId_unique" unique ("statisticTeamAId");`,
    )
    this.addSql(
      `alter table "Matches" add constraint "Matches_statisticTeamBId_unique" unique ("statisticTeamBId");`,
    )

    this.addSql(`alter table "Statistics" add column "matchId" uuid not null;`)
    this.addSql(
      `alter table "Statistics" alter column "average" type int using ("average"::int);`,
    )
    this.addSql(
      `alter table "Statistics" alter column "average" drop not null;`,
    )
    this.addSql(
      `alter table "Statistics" alter column "points" type int using ("points"::int);`,
    )
    this.addSql(`alter table "Statistics" alter column "points" drop not null;`)
    this.addSql(
      `alter table "Statistics" drop constraint "Statistics_gameId_unique";`,
    )
    this.addSql(
      `alter table "Statistics" add constraint "Statistics_matchId_foreign" foreign key ("matchId") references "Matches" ("id") on update cascade;`,
    )
    this.addSql(`alter table "Statistics" drop column "gameId";`)
    this.addSql(
      `alter table "Statistics" add constraint "Statistics_matchId_unique" unique ("matchId");`,
    )

    this.addSql(
      `alter table "Games" drop constraint "Games_statisticTeamAId_unique";`,
    )
    this.addSql(
      `alter table "Games" drop constraint "Games_statisticTeamBId_unique";`,
    )
    this.addSql(`alter table "Games" drop column "statisticTeamAId";`)
    this.addSql(`alter table "Games" drop column "statisticTeamBId";`)
  }

  async down(): Promise<void> {
    this.addSql(
      `alter table "Matches" drop constraint "Matches_statisticTeamAId_foreign";`,
    )
    this.addSql(
      `alter table "Matches" drop constraint "Matches_statisticTeamBId_foreign";`,
    )

    this.addSql(
      `alter table "Statistics" drop constraint "Statistics_matchId_foreign";`,
    )

    this.addSql(
      `alter table "Matches" drop constraint "Matches_statisticTeamAId_unique";`,
    )
    this.addSql(
      `alter table "Matches" drop constraint "Matches_statisticTeamBId_unique";`,
    )
    this.addSql(`alter table "Matches" drop column "date";`)
    this.addSql(`alter table "Matches" drop column "statisticTeamAId";`)
    this.addSql(`alter table "Matches" drop column "statisticTeamBId";`)

    this.addSql(
      `alter table "Games" add column "statisticTeamAId" uuid null, add column "statisticTeamBId" uuid null;`,
    )
    this.addSql(
      `alter table "Games" add constraint "Games_statisticTeamAId_foreign" foreign key ("statisticTeamAId") references "Statistics" ("id") on update cascade on delete set null;`,
    )
    this.addSql(
      `alter table "Games" add constraint "Games_statisticTeamBId_foreign" foreign key ("statisticTeamBId") references "Statistics" ("id") on update cascade on delete set null;`,
    )
    this.addSql(
      `alter table "Games" add constraint "Games_statisticTeamAId_unique" unique ("statisticTeamAId");`,
    )
    this.addSql(
      `alter table "Games" add constraint "Games_statisticTeamBId_unique" unique ("statisticTeamBId");`,
    )

    this.addSql(`alter table "Statistics" add column "gameId" uuid not null;`)
    this.addSql(
      `alter table "Statistics" alter column "average" type int using ("average"::int);`,
    )
    this.addSql(`alter table "Statistics" alter column "average" set not null;`)
    this.addSql(
      `alter table "Statistics" alter column "points" type int using ("points"::int);`,
    )
    this.addSql(`alter table "Statistics" alter column "points" set not null;`)
    this.addSql(
      `alter table "Statistics" drop constraint "Statistics_matchId_unique";`,
    )
    this.addSql(
      `alter table "Statistics" add constraint "Statistics_gameId_foreign" foreign key ("gameId") references "Games" ("id") on update cascade;`,
    )
    this.addSql(`alter table "Statistics" drop column "matchId";`)

    this.addSql(
      `alter table "Statistics" add constraint "Statistics_gameId_unique" unique ("gameId");`,
    )
  }
}
