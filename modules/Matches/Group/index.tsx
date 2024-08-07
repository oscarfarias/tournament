import { ReactElement, useMemo } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import Layout from 'modules/Layout'
import useGroupQuery from 'common/queries/useGroupQuery'
import { useRouter } from 'next/router'
import { HeadCell } from 'common/components/TableMui'
import { MatchListProps } from './types'
import { Table } from 'common/components'
import useStore from 'stores'
import { serializeCollection } from 'common/utils'
import { Match } from 'entities'
import AthleteModal from '../AthleteModal'

const Group = (): JSX.Element => {
  const router = useRouter()
  const groupId = router.query.groupId as string
  const groupQuery = useGroupQuery(groupId)
  const { openModal, teamId, matchId } = useStore((state) => state)

  const group = useMemo(() => {
    return groupQuery.data
  }, [groupQuery.data])

  const serializedMatches = useMemo(() => {
    if (!group) {
      return null
    }
    return serializeCollection({
      entity: group.matches as unknown as Match[],
    })
  }, [group])

  const selectTeamA = (matchId: string) => {
    if (serializedMatches == null) {
      return
    }
    const [, matchesById] = serializedMatches
    const match = matchesById[matchId]
    if (match == null) {
      return
    }
    openModal({ teamId: match.teamA.id, matchId })
  }
  const selectTeamB = (matchId: string) => {
    if (serializedMatches == null) {
      return
    }
    const [, matchesById] = serializedMatches
    const match = matchesById[matchId]
    if (match == null) {
      return
    }
    openModal({ teamId: match.teamB.id, matchId })
  }

  const columns: HeadCell<MatchListProps>[] = [
    {
      title: `Equipo Jugador`,
      key: `teamA`,
    },
    {
      title: `Goles`,
      key: `goalsTeamA`,
    },
    {
      title: `Acciones`,
      render: (match) => (
        <Button
          sx={{ maxWidth: `180px` }}
          onClick={() => selectTeamA(match.id)}
        >
          Cargar goles
        </Button>
      ),
    },
    {
      title: `Equipo Oponente`,
      key: `teamB`,
    },
    {
      title: `Goles`,
      key: `goalsTeamB`,
    },
    {
      title: `Acciones`,
      render: (match) => (
        <Button
          sx={{ maxWidth: `180px` }}
          onClick={() => selectTeamB(match.id)}
        >
          Cargar goles
        </Button>
      ),
    },
  ]

  const data = useMemo(() => {
    if (!group) {
      return []
    }
    return group.matches.map((match) => {
      return {
        id: match.id,
        teamAId: match.teamA.id,
        teamA: match.teamA.name,
        goalsTeamA:
          match.statisticTeamA?.goals.reduce(
            (acc, goal) => acc + goal.goals,
            0,
          ) || 0,

        teamBId: match.teamB.id,
        teamB: match.teamB.name,
        goalsTeamB:
          match.statisticTeamB?.goals.reduce(
            (acc, goal) => acc + goal.goals,
            0,
          ) || 0,
      }
    })
  }, [group])

  const match = useMemo(() => {
    if (serializedMatches == null || !matchId) {
      return null
    }

    const [, matchesById] = serializedMatches
    const match = matchesById[matchId]
    if (match == null) {
      return null
    }
    return match
  }, [matchId, serializedMatches])

  return (
    <Grid container flexDirection="column">
      {teamId && matchId && match ? (
        <AthleteModal teamId={teamId} match={match} matchId={matchId} />
      ) : null}

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
