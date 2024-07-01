import { Grid, Typography, IconButton } from '@mui/material'
import { ReactElement, useState } from 'react'
import Layout from '../Layout'
import { useRouter } from 'next/router'
import { useGroups } from 'common/hooks/useGroups'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Icon, Modal } from 'common/components'
import Group from './Group'
import { Group as GroupEntity } from 'entities'
import { useCreateGroupMutation } from 'common/queries/useCreateGroupMutation'
import { useDeleteGroupMutation } from 'common/queries/useDeleteGroupMutation'

const ADD_TAB = `add`
const Groups = () => {
  const router = useRouter()
  const year = router?.query?.year as string
  const { setGroup, groupsById, groupsIds } = useGroups(year)
  const [groupId, setGroupId] = useState(`0`)
  const [selectedGroup, setSelectedGroup] = useState<GroupEntity | null>(null)
  const createGroup = useCreateGroupMutation()
  const deleteGroup = useDeleteGroupMutation()

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue !== ADD_TAB) {
      setGroupId(newValue)
      const group = groupsById[newValue]
      setGroup(group)
    }
  }

  const onDeleteGroup = (event: React.SyntheticEvent, groupId: string) => {
    event.stopPropagation()
    const group = groupsById[groupId]
    if (group) {
      setSelectedGroup(group)
    }
  }

  const onConfirmDeleteGroup = () => {
    if (selectedGroup) {
      deleteGroup.mutate(selectedGroup.id)
      setSelectedGroup(null)
    }
  }

  const onCreateGroup = () => {
    createGroup.mutate({
      name: `Nuevo grupo`,
      year: year as string,
    })
  }

  return (
    <Grid container flexDirection="column">
      {selectedGroup ? (
        <Modal
          isOpen
          title="Eliminar grupo"
          confirm
          onConfirm={onConfirmDeleteGroup}
          onCancel={() => setSelectedGroup(null)}
        >
          <Typography>
            ¿Estás seguro que de deseas eliminar: {selectedGroup.name}?
          </Typography>
        </Modal>
      ) : null}

      <TabContext value={groupId}>
        <Box sx={{ borderBottom: 1, borderColor: `divider` }}>
          <TabList onChange={handleChange}>
            {groupsIds.length > 0 &&
              groupsIds.map((groupId, index) => (
                <Tab
                  icon={
                    groupsIds.length > 1 ? (
                      <IconButton onClick={(e) => onDeleteGroup(e, groupId)}>
                        <Icon icon="delete" />
                      </IconButton>
                    ) : undefined
                  }
                  disableRipple
                  onClick={(e) => e.stopPropagation()}
                  iconPosition="end"
                  key={groupId}
                  label={
                    <Grid container flexDirection="row" gap={2}>
                      <Typography fontWeight="bold">
                        {groupsById[groupId].name}
                      </Typography>
                    </Grid>
                  }
                  value={`${index}`}
                />
              ))}
            {groupsIds.length < 3 ? (
              <Tab
                icon={
                  <IconButton onClick={onCreateGroup}>
                    <Icon icon="add" />
                  </IconButton>
                }
                disableRipple
                onClick={(e) => e.stopPropagation()}
                iconPosition="end"
                value={ADD_TAB}
              />
            ) : null}
          </TabList>
        </Box>
        {groupsIds.length > 0 &&
          groupsIds.map((groupId, index) => (
            <TabPanel key={groupId} value={`${index}`}>
              <Group group={groupsById[groupId]} />
            </TabPanel>
          ))}
      </TabContext>
    </Grid>
  )
}

Groups.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Groups
