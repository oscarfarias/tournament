import { Button, Grid } from '@mui/material'
import { GroupsFlowProps } from './types'
import { Modal } from 'common/components'

const ButtonActions = () => {
  return (
    <Grid container justifyContent="space-between" flexDirection="row">
      <Grid item xs={4}>
        <Button variant="outlined">Cancelar</Button>
      </Grid>
      <Grid item xs={4}>
        <Button>Siguiente</Button>
      </Grid>
    </Grid>
  )
}

const GroupsFlow = ({ isOpen }: GroupsFlowProps) => {
  if (!isOpen) {
    return null
  }
  return (
    <Grid container>
      <Modal
        isOpen={isOpen}
        actions={<ButtonActions />}
        title="Crear grupo"
      ></Modal>
    </Grid>
  )
}

export default GroupsFlow
