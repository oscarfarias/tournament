export interface GroupsFlowProps {
  isOpen: boolean
  onClose: () => void
}

export interface GroupsFlowActionsProps
  extends Pick<GroupsFlowProps, `onClose`> {
  onNext?: () => void
}
