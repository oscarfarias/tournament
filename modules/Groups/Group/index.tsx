import { Grid, Typography } from '@mui/material'
import { Accordion, Modal, TextField } from 'common/components'
import { useEffect, useState } from 'react'
import { Group, Team } from 'entities'
import TeamList from './TeamList'
import { useDebounce } from 'common/hooks'
import { useGroupMutation } from 'common/queries/useGroupMutation'
import useGroupStore from 'common/hooks/useGroups/store'
import { useTeamDeleteMutation } from 'common/queries/useTeamMutation'

const GroupView = ({ group }: { group: Group }) => {
  const [teams, setTeams] = useState(group.teams?.length || 0)
  const [team, setTeam] = useState<Team | null>(null)

  const [groupName, setGroupName] = useState(group.name)

  const { groupsById, setGroupsById, setGroup } = useGroupStore(
    (state) => state,
  )

  const updateGroup = (updatedGroup?: Group) => {
    if (updatedGroup == null) {
      return
    }
    const nextGroupsById = {
      ...groupsById,
      [group.id]: {
        ...groupsById[group.id],
        ...updatedGroup,
      },
    }
    setGroupsById(nextGroupsById)
    setGroup(updatedGroup)
    setGroupName(updatedGroup.name)
  }

  const groupMutation = useGroupMutation({
    onSuccessCallback: (updatedGroup) => updateGroup(updatedGroup),
  })
  const debouncedGroupName = useDebounce(groupName, 500)
  const debouncedTeams = useDebounce(teams, 500)
  const deleteTeam = useTeamDeleteMutation()

  useEffect(() => {
    if (debouncedGroupName?.length > 0 && debouncedGroupName !== group.name) {
      groupMutation.mutate({
        name: debouncedGroupName,
        groupId: group.id,
      })
    }
  }, [debouncedGroupName])

  useEffect(() => {
    if (debouncedTeams !== group.teams?.length) {
      groupMutation.mutate({
        groupId: group.id,
        teams: Number(debouncedTeams),
      })
    }
  }, [debouncedTeams])

  const onTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === ``) {
      setTeams(0)
    } else {
      setTeams(Number(value))
    }
  }

  const onGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setGroupName(value)
  }

  const onDeleteTeam = (team: Team) => {
    setTeam(team)
  }

  const onConfirmDeleteTeam = () => {
    if (team == null) {
      return
    }
    setTeam(null)
    deleteTeam.mutateAsync(team.id).then(() => setTeam(null))
  }

  return (
    <Grid container flexDirection="column">
      {team ? (
        <Modal
          isOpen
          confirm
          onConfirm={onConfirmDeleteTeam}
          onCancel={() => setTeam(null)}
        >
          <Typography>
            ¿Estás seguro que deseas eliminar este equipo?
          </Typography>
        </Modal>
      ) : null}

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
          <TextField defaultValue={group.name} onChange={onGroupNameChange} />
        </Grid>
      </Grid>
      <Grid container flexDirection="row" gap={2}>
        <Typography mt={1}>Numero de equipos:</Typography>
        <Grid item xs={5}>
          <TextField onChange={onTeamChange} value={teams} />
        </Grid>
      </Grid>

      <Grid container mt={2} flexDirection="column" ml={1} gap={1}>
        {group.teams?.length > 0 &&
          group.teams?.map((team) => (
            <Accordion
              key={team.id}
              title={team.name}
              endIconOnClick={() => onDeleteTeam(team)}
              endIcon="delete"
            >
              <TeamList key={team.id} team={team} />
            </Accordion>
          ))}
      </Grid>
    </Grid>
  )
}

export default GroupView
