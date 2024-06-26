import type { Options } from '@mikro-orm/core'
import {
  User,
  Athlete,
  Category,
  Game,
  Group,
  Match,
  Statistic,
  Team,
} from '../entities'
import {
  DB_NAME,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  IS_LOCAL,
} from './constants'
import CustomNamingStrategy from './namingStrategy'
const entities = [User, Athlete, Category, Game, Group, Match, Statistic, Team]
const config: Options = {
  dbName: DB_NAME,
  type: `postgresql`,
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
  entities,
  debug: Boolean(IS_LOCAL),
  allowGlobalContext: true,
  namingStrategy: CustomNamingStrategy,
}

export default config
