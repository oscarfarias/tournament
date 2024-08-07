import { ReactElement, useMemo } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import Layout from 'modules/Layout'
import useGroupQuery from 'common/queries/useGroupQuery'
import { useRouter } from 'next/router'
import { HeadCell } from 'common/components/TableMui'
import { StatisticListProps } from './types'
import { Table } from 'common/components'

import useStatisticsByGroupQuery from 'common/queries/useStatisticsByGroupQuery'
import { ROUTES } from 'common/config/constants'

const Group = (): JSX.Element => {
  const router = useRouter()
  const groupId = router.query.groupId as string
  const groupQuery = useGroupQuery(groupId)
  const statisticsByGroupQuery = useStatisticsByGroupQuery(groupId)

  const group = useMemo(() => {
    return groupQuery.data
  }, [groupQuery.data])

  const onSeeScorers = (teamId: string) => {
    router.push(`${ROUTES.RESULTS}/scorers/${teamId}`)
  }

  const columns: HeadCell<StatisticListProps>[] = [
    {
      title: `Equipo`,
      key: `team`,
    },
    {
      title: `Goles a favor`,
      key: `goalsInFavor`,
    },

    {
      title: `Goles en contra`,
      key: `goalsAgainst`,
    },
    {
      title: `Diferencia`,
      key: `difference`,
    },
    {
      title: `Acciones`,
      render: (data) => (
        <Button
          onClick={() => onSeeScorers(data.id)}
          sx={{ maxWidth: `180px` }}
        >
          Ver goleadores
        </Button>
      ),
    },
  ]

  const data = useMemo(() => {
    if (!statisticsByGroupQuery?.data) {
      return []
    }
    const { teamsIds, teamsById } = statisticsByGroupQuery.data

    return teamsIds
      .map((teamId) => {
        const team = teamsById[teamId]
        return {
          id: teamId,
          team: team?.team?.name,
          goalsInFavor: team?.goalsInFavor || 0,
          goalsAgainst: team?.goalsAgainst || 0,
          difference: team?.difference || 0,
        }
      })
      .sort((a, b) => b.difference - a.difference)
  }, [statisticsByGroupQuery?.data])

  return (
    <Grid container flexDirection="column">
      <Typography variant="h5" gutterBottom>
        Equipos - {group?.name}
      </Typography>
      <Table columns={columns} rows={data} />
    </Grid>
  )
}
Group.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Group
