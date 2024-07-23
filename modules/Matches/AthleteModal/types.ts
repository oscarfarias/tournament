import { HeadCell } from 'common/components/TableMui'
import { Match } from 'entities'
export interface AthleteModalProps {
  teamId: string
  matchId: string
  match: Match
}

export interface AthleteList {
  id: string
  fullName: string
  shirtNumber: string
  goals: number
}

export type AthleteColumns = HeadCell<AthleteList>
