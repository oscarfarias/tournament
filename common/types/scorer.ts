import { Athlete, Team } from 'entities'

export interface Scorer {
  id: string
  athlete: Athlete
  goals: number
}

export interface ScorerResponse {
  team: Team
  athletesIds: string[]
  athletesById: Record<string, Scorer>
}
