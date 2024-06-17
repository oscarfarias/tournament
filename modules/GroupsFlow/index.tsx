import { Button, Grid } from '@mui/material'
import { GroupsFlowActionsProps, GroupsFlowProps } from './types'
import { Modal } from 'common/components'
import Group from './Group'
import { useState } from 'react'
import Teams from './Teams'

const ButtonActions = ({
  onClose,
  onNext = () => null,
}: GroupsFlowActionsProps) => {
  return (
    <Grid container justifyContent="space-between" flexDirection="row">
      <Grid item xs={4}>
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button onClick={onNext}>Siguiente</Button>
      </Grid>
    </Grid>
  )
}

const GroupsFlow = ({ isOpen, onClose }: GroupsFlowProps) => {
  const [flow, setFlow] = useState(0)
  if (!isOpen) {
    return null
  }
  const componentByFlow: { [key: number]: JSX.Element } = {
    0: <Group />,
    1: <Teams />,
  }

  return (
    <Grid container>
      <Modal
        onCancel={onClose}
        isOpen={isOpen}
        actions={
          <ButtonActions onClose={onClose} onNext={() => setFlow(flow + 1)} />
        }
        title="Crear grupo"
      >
        {componentByFlow[flow]}
      </Modal>
    </Grid>
  )
}

export default GroupsFlow
