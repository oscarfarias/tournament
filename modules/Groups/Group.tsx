import { Grid, Typography } from '@mui/material'
import { Accordion, Table, TextField } from 'common/components'
import { useMemo, useState } from 'react'
import { HeadCell } from 'common/components/TableMui'
import { Group } from 'entities'

interface AthleteProps {
  id: string
  name: string
  lastName: string
  ci: string
  shirtNumber: string
}
const columns: HeadCell<AthleteProps>[] = [
  {
    title: `#`,
    key: `id`,
  },
  {
    title: `Nombre`,
    key: `name`,
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
    key: `ci`,
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

const TeamList = () => {
  const [athletes, setAthletes] = useState(0)
  const [teamName, setTeamName] = useState(``)
  const data = useMemo(() => {
    const data = Array.from({ length: athletes }, (_, i) => {
      return {
        id: `${i + 1}`,
        name: ``,
        lastName: ``,
        ci: ``,
        shirtNumber: ``,
      }
    })
    return data
  }, [athletes])
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
      <Grid container sx={{ width: `100%` }}>
        <Table columns={columns} rows={data} />
      </Grid>
    </Grid>
  )
}

const GroupView = ({ group }: { group: Group }) => {
  const [teams, setTeams] = useState(0)
  const teamArray = Array.from({ length: teams }, (_, i) => i + 1)
  const onTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === ``) {
      setTeams(0)
    } else {
      setTeams(Number(value))
    }
  }

  return (
    <Grid container flexDirection="column">
      <Grid
        container
        sx={{
          display: `flex`,
        }}
        flexDirection="row"
        gap={2}
        mb={2}
      >
        <Typography mt={1}>Nombre Grupo :</Typography>
        <Grid item xs={5}>
          <TextField defaultValue={group.name} />
        </Grid>
      </Grid>
      <Grid container flexDirection="row" gap={2}>
        <Typography mt={1}>Numero de equipos:</Typography>
        <Grid item xs={5}>
          <TextField onChange={onTeamChange} value={teams} />
        </Grid>
      </Grid>

      <Grid container mt={2} flexDirection="column" ml={1} gap={1}>
        {teamArray.length > 0 &&
          teamArray.map((team) => (
            <Accordion key={team} title={`Equipo ${team}`}>
              <TeamList key={team} />
            </Accordion>
          ))}
      </Grid>
    </Grid>
  )
}

export default GroupView
