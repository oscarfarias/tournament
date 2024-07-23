interface OpenModalProps {
  teamId: string
  matchId: string
}
export interface AthleteModalSlice {
  teamId: string | null
  matchId: string | null
  openModal: (props: OpenModalProps) => void
  closeModal: () => void
}
