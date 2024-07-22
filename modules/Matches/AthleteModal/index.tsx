import { Button, Grid, Typography } from '@mui/material'
import { Modal, Table } from 'common/components'
import { AthleteColumns, AthleteModalProps } from './types'
import useStore from 'stores'
const AthleteModal = ({ teamId }: AthleteModalProps) => {
  const { closeModal } = useStore((state) => state)
  const columns: AthleteColumns[] = [
    {
      title: `Atleta`,
      key: `fullName`,
    },
    {
      title: `Número de camiseta`,
      key: `shirtNumber`,
    },
    {
      title: `Goles`,
      key: `goals`,
    },
    {
      title: `Acciones`,
      render: () => <Button sx={{ maxWidth: `180px` }}>Registrar</Button>,
    },
  ]

  if (!teamId) {
    return null
  }

  return (
    <Modal isOpen onClose={closeModal}>
      <Grid container flexDirection="column" gap={2}>
        <Typography>Registrar goles realizados</Typography>
        <Grid item xs={12}>
          <Table columns={columns} rows={[]} rowsPerPage={4} />
        </Grid>
        <Grid
          item
          display="flex"
          flexDirection="row"
          justifyContent="center"
          xs={12}
        >
          <Button
            sx={{
              width: `300px`,
              '&:hover': {
                width: `300px`,
              },
            }}
            onClick={closeModal}
          >
            Cerrar
          </Button>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default AthleteModal
