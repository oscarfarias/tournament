import { Grid, Typography } from '@mui/material'
import { Accordion, Table, TextField } from 'common/components'
import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { HeadCell } from 'common/components/TableMui'

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

const CategoriesList = () => {
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
          <TextField />
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

const Categories = () => {
  const [value, setValue] = useState(`1`)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Grid container flexDirection="column">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: `divider` }}>
          <TabList onChange={handleChange}>
            <Tab label="Grupo 1" value="1" />
            <Tab label="Grupo 2" value="2" />
            <Tab label="Grupo 3" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <CategoriesList />
        </TabPanel>
        <TabPanel value="2">
          <CategoriesList />
        </TabPanel>
        <TabPanel value="3">
          <CategoriesList />
        </TabPanel>
      </TabContext>
    </Grid>
  )
}

export default Categories