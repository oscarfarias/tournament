type LogoutState = {
  isModalOpen: boolean
}
type LogoutActions = {
  openModal: () => void
  closeModal: () => void
}

export type LogoutStore = LogoutState & LogoutActions
