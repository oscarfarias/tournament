import { Grid } from '@mui/material'
import { ReactElement, useEffect } from 'react'
import Layout from '../Layout'
import { useRouter } from 'next/router'
import { useGroups } from 'common/hooks/useGroups'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Group from './Group'
const Groups = () => {
  const router = useRouter()
  const year = router?.query?.year
  const { groups, setGroup, groupsById, groupsIds } = useGroups(year as string)
  const [groupId, setGroupId] = useState(``)

  useEffect(() => {
    if (groups.length > 0 && groupId === ``) {
      const group = groups[0]
      setGroupId(group.id)
    }
  }, [groupId, groups])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setGroupId(newValue)
    const group = groupsById[newValue]
    setGroup(group)
  }

  return (
    <Grid container flexDirection="column">
      <TabContext value={groupId}>
        <Box sx={{ borderBottom: 1, borderColor: `divider` }}>
          <TabList onChange={handleChange}>
            {groupsIds.length > 0 &&
              groupsIds.map((groupId) => (
                <Tab
                  key={groupId}
                  label={groupsById[groupId].name}
                  value={groupId}
                />
              ))}
          </TabList>
        </Box>
        {groupsIds.length > 0 &&
          groupsIds.map((groupId) => (
            <TabPanel key={groupId} value={groupId}>
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
