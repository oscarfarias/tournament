import { ReactElement, useMemo } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import Layout from 'modules/Layout'
import useGroupQuery from 'common/queries/useGroupQuery'
import { useRouter } from 'next/router'
import { HeadCell } from 'common/components/TableMui'
import { MatchListProps } from './types'
import { Table } from 'common/components'

const Group = (): JSX.Element => {
  const router = useRouter()
  const groupId = router.query.groupId as string
  const groupQuery = useGroupQuery(groupId)

  const columns: HeadCell<MatchListProps>[] = [
    {
      title: `Equipo Jugador`,
      key: `teamA`,
    },
    {
      title: `Equipo Oponente`,
      key: `teamB`,
    },
    {
      title: `Acciones`,
      render: () => (
        <Button sx={{ maxWidth: `180px` }}>Cargar resultados</Button>
      ),
    },
  ]

  const group = useMemo(() => {
    return groupQuery.data
  }, [groupQuery.data])

  const data = useMemo(() => {
    if (!group) {
      return []
    }
    return group.matches.map((match) => {
      return {
        id: match.id,
        teamA: match.teamA.name,
        teamB: match.teamB.name,
      }
    })
  }, [group])

  return (
    <Grid container flexDirection="column">
      <Typography variant="h5" gutterBottom>
        Emparejamientos {group?.name}
      </Typography>
      <Table columns={columns} rows={data} />
    </Grid>
  )
}
Group.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Group
