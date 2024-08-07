import { ReactElement, useMemo } from 'react'

import { Grid, Typography } from '@mui/material'
import Layout from 'modules/Layout'
import { ScorersListProps } from './types'
import { Table } from 'common/components'
import { HeadCell } from 'common/components/TableMui'
import { useRouter } from 'next/router'
import useScorersByTeamQuery from 'common/queries/useScorersByTeamQuery'

const Scorers = () => {
  const router = useRouter()
  const teamId = router.query.teamId as string
  const scorersByTeamQuery = useScorersByTeamQuery(teamId)

  const data = useMemo(() => {
    if (!scorersByTeamQuery?.data) {
      return []
    }
    const { athletesIds, athletesById } = scorersByTeamQuery.data

    return athletesIds
      .map((athleteId) => {
        const athlete = athletesById[athleteId]
        return {
          id: athlete.id,
          athleteName:
            athlete.athlete.firstName + ` ` + athlete.athlete.lastName,
          shirtNumber: athlete.athlete?.shirtNumber || ``,
          goals: athlete.goals,
        }
      })
      .sort((a, b) => b.goals - a.goals)
  }, [scorersByTeamQuery?.data])
  console.log(`scorersByTeamQuery?.data:`, scorersByTeamQuery?.data)

  const columns: HeadCell<ScorersListProps>[] = [
    {
      title: `Nombre de Atleta`,
      key: `athleteName`,
    },
    {
      title: `# Camiseta`,
      key: `shirtNumber`,
    },

    {
      title: `Goles`,
      key: `goals`,
    },
  ]

  return (
    <Grid container flexDirection="column" gap={2}>
      <Typography variant="h4">Lista de goleadores</Typography>
      <Table columns={columns} rows={data} />
    </Grid>
  )
}

Scorers.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Scorers
