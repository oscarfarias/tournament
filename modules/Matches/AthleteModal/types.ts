import { HeadCell } from 'common/components/TableMui'
export interface AthleteModalProps {
  teamId: string
}

export interface AthleteList {
  id: string
  fullName: string
  shirtNumber: number
  goals: number
}

export type AthleteColumns = HeadCell<AthleteList>
