import { Grid, Typography } from '@mui/material'
import { Table, TextField } from 'common/components'
import { useEffect, useMemo, useState } from 'react'
import { HeadCell } from 'common/components/TableMui'
import { Team } from 'entities'
import { useDebounce } from 'common/hooks'
import { useTeamMutation } from 'common/queries/useTeamMutation'
import { isNumber } from 'lodash'

interface AthleteProps {
  index: string
  id: string
  firstName: string
  lastName: string
  document: string
  shirtNumber: string
}
const columns: HeadCell<AthleteProps>[] = [
  {
    title: `#`,
    key: `index`,
  },
  {
    title: `Nombre`,
    key: `firstName`,
    render: () => (
      <Grid container>
        <TextField />
      </Grid>
    ),
  },
  {
    title: `Apellido`,
    key: `lastName`,
    render: () => (
      <Grid container>
        <TextField />
      </Grid>
    ),
  },
  {
    title: `Cedula`,
    key: `document`,
    render: () => (
      <Grid container>
        <TextField />
      </Grid>
    ),
  },
  {
    title: `# Camiseta`,
    key: `shirtNumber`,
    render: () => (
      <Grid container>
        <TextField />
      </Grid>
    ),
  },
]

const TeamList = ({ team }: { team: Team }) => {
  const [athletes, setAthletes] = useState(team?.athletes?.length || 0)
  const [teamName, setTeamName] = useState(team.name || ``)
  const debouncedTeamName = useDebounce(teamName, 500)
  const debouncedAthletes = useDebounce(athletes, 500)

  const teamMutation = useTeamMutation()

  useEffect(() => {
    if (debouncedTeamName?.length > 0 && debouncedTeamName !== team.name) {
      teamMutation.mutate({
        name: debouncedTeamName,
        teamId: team.id,
      })
    }
  }, [debouncedTeamName])

  useEffect(() => {
    const currentAthletes = team?.athletes?.length || 0
    if (isNumber(debouncedAthletes) && debouncedAthletes !== currentAthletes) {
      teamMutation.mutate({
        athletes: debouncedAthletes,
        teamId: team.id,
      })
    }
  }, [debouncedAthletes])

  const data = useMemo(() => {
    if (team?.athletes == null || team?.athletes?.length === 0) {
      return []
    }
    return team?.athletes?.map((athlete, index) => ({
      index: `${index + 1}`,
      id: athlete?.id || ``,
      firstName: athlete?.firstName || ``,
      lastName: athlete?.lastName || ``,
      document: athlete?.document || ``,
      shirtNumber: athlete?.shirtNumber || ``,
    }))
  }, [team?.athletes])
  const onAthleteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === ``) {
      setAthletes(0)
    } else {
      setAthletes(Number(value))
    }
  }
  const onTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTeamName(value)
  }

  return (
    <Grid container>
      <Grid container flexDirection="row" gap={2}>
        <Typography mt={1}>Nombre del equipo:</Typography>
        <Grid item xs={5}>
          <TextField onChange={onTeamNameChange} value={teamName} />
        </Grid>
      </Grid>
      <Grid container mt={1} flexDirection="row" gap={2}>
        <Typography mt={1}>Cantidad de atletas:</Typography>
        <Grid item xs={5}>
          <TextField onChange={onAthleteChange} value={athletes} />
        </Grid>
      </Grid>
      <Grid container mt={3} sx={{ width: `100%` }}>
        <Table columns={columns} rows={data} />
      </Grid>
    </Grid>
  )
}

export default TeamList
