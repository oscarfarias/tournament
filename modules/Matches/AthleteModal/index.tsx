import { Button, Grid, TextField, Typography } from '@mui/material'
import { Modal, Table } from 'common/components'
import { AthleteColumns, AthleteModalProps } from './types'
import useStore from 'stores'
import useAthletesByTeamQuery from 'common/queries/useAthletesByTeamQuery'
import { useMemo, useState } from 'react'
import { useRegisterGoalMutation } from 'common/queries/useRegisterGoalMutation'

interface GoalFieldProps {
  athleteId: string
  goals: number
  teamId: string
  matchId: string
}

const GoalField = ({ athleteId, goals, teamId, matchId }: GoalFieldProps) => {
  const registerGoal = useRegisterGoalMutation()
  const [goal, setGoal] = useState(goals)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(parseInt(e.target.value, 10))
  }

  return (
    <Grid container gap={2} flexDirection="row">
      <TextField value={goal} sx={{ maxWidth: `70px` }} onChange={onChange} />
      <Button
        sx={{ maxWidth: `80px` }}
        onClick={() =>
          registerGoal.mutate({
            goals: goal,
            athleteId,
            teamId,
            matchId,
          })
        }
      >
        Registrar
      </Button>
    </Grid>
  )
}

const AthleteModal = ({ teamId, matchId }: AthleteModalProps) => {
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
      render: ({ goals, id }) => (
        <GoalField
          athleteId={id}
          goals={goals}
          teamId={teamId}
          matchId={matchId}
        />
      ),
    },
  ]
  const athletesQuery = useAthletesByTeamQuery(teamId)
  const data = useMemo(() => {
    if (!athletesQuery.data) {
      return []
    }
    return athletesQuery.data.map((athlete) => {
      return {
        id: athlete.id,
        fullName: `${athlete.firstName} ${athlete.lastName}`,
        shirtNumber: `${athlete.shirtNumber}`,
        goals: 0,
      }
    })
  }, [athletesQuery.data])

  return (
    <Modal isOpen onClose={closeModal}>
      <Grid container flexDirection="column" gap={2}>
        <Typography
          sx={{
            fontSize: `24px !important`,
            fontWeight: `bold`,
          }}
        >
          Registrar goles
        </Typography>
        <Grid item xs={12}>
          <Table columns={columns} rows={data} rowsPerPage={4} />
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
