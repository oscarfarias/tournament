export interface AthleteModalSlice {
  teamId: string | null
  openModal: (teamId: string) => void
  closeModal: () => void
}
