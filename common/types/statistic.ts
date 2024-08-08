import { Goal, Statistic, Group } from 'entities'

export interface AugmentedStatistic extends Omit<Statistic, `goals`> {
  goals: Goal[]
}

export interface StatisticResponse {
  teamsIds: string[]
  teamsById: Record<string, AugmentedStatistic>
  group: Group
}
