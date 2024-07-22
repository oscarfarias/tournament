import { Button, Grid } from '@mui/material'
import { Table } from 'common/components'
import { AthleteColumns } from './types'
const AthleteModal = () => {
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
      title: `Goles realizados`,
      key: `goals`,
    },
    {
      title: `Acciones`,
      render: () => <Button sx={{ maxWidth: `180px` }}>Registrar</Button>,
    },
  ]

  return (
    <Grid container>
      <Grid item xs={12}>
        <Table columns={columns} rows={[]} />
      </Grid>
    </Grid>
  )
}

export default AthleteModal
