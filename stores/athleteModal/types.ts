export interface AthleteModalSlice {
  isModalOpen: boolean
  teamId: string | null
  openModal: () => void
  closeModal: () => void
}
