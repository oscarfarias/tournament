import { HeadCell } from 'common/components/TableMui'
export interface AthleteModalProps {
  teamId: string
  matchId: string
}

export interface AthleteList {
  id: string
  fullName: string
  shirtNumber: string
  goals: number
}

export type AthleteColumns = HeadCell<AthleteList>
