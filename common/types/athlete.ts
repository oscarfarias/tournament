export interface AthleteProps {
  athleteId: string
  firstName?: string
  lastName?: string
  document?: string
  shirtNumber?: string
}

export interface AddMoreAthletesProps {
  athletesToAdd: number
  teamId: string
}
