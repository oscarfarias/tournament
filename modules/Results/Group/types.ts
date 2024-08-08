export interface MatchListProps {
  id: string
  teamA: string
  goalsTeamA: number | null
  teamB: string
  goalsTeamB: number | null
}

export interface StatisticListProps {
  id: string
  team: string
  goalsInFavor: number
  goalsAgainst: number
  difference: number
  points: number
}
