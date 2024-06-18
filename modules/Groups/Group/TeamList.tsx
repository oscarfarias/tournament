import { Grid, Typography } from '@mui/material'
import { Table, TextField } from 'common/components'
import { useEffect, useMemo, useState } from 'react'
import { HeadCell } from 'common/components/TableMui'
import { Athlete, Team } from 'entities'
import { useDebounce } from 'common/hooks'
import { useTeamMutation } from 'common/queries/useTeamMutation'
import { isNumber } from 'lodash'
import { useAthleteMutation } from 'common/queries/useAthleteMutation'

interface AthleteProps {
  index: string
  id: string
  firstName: string
  lastName: string
  document: string
  shirtNumber: string
}

const FieldUpsert = ({
  athlete,
  field,
}: {
  athlete: AthleteProps
  field: keyof AthleteProps
}) => {
  const athleteMutation = useAthleteMutation()
  const [value, setValue] = useState(athlete[field] || ``)
  const debouncedValue = useDebounce(value, 500)

  useEffect(() => {
    if (debouncedValue?.length > 0 && debouncedValue !== athlete[field]) {
      athleteMutation.mutate({
        athleteId: athlete.id,
        [field]: debouncedValue,
      })
    }
  }, [debouncedValue])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue(value)
  }

  return (
    <Grid container>
      <TextField defaultValue={value} onChange={onChange} />
    </Grid>
  )
}

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

  const columns: HeadCell<AthleteProps>[] = [
    {
      title: `#`,
      key: `index`,
    },
    {
      title: `Nombre`,
      key: `firstName`,
      render: (athlete) => <FieldUpsert athlete={athlete} field="firstName" />,
    },
    {
      title: `Apellido`,
      key: `lastName`,
      render: (athlete) => <FieldUpsert athlete={athlete} field="lastName" />,
    },
    {
      title: `Cedula`,
      key: `document`,
      render: (athlete) => <FieldUpsert athlete={athlete} field="document" />,
    },
    {
      title: `# Camiseta`,
      key: `shirtNumber`,
      render: (athlete) => (
        <FieldUpsert athlete={athlete} field="shirtNumber" />
      ),
    },
  ]

  const data = useMemo(() => {
    if (team?.athletes == null || team?.athletes?.length === 0) {
      return []
    }
    const nextData: AthleteProps[] = []
    const athletes = team?.athletes as unknown as Athlete[]
    athletes?.forEach((athlete, index) => {
      if (athlete?.id != null) {
        nextData.push({
          index: `${index + 1}`,
          id: `${athlete?.id}`,
          firstName: athlete?.firstName || ``,
          lastName: athlete?.lastName || ``,
          document: athlete?.document || ``,
          shirtNumber: athlete?.shirtNumber || ``,
        })
      }
    })

    return nextData
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
