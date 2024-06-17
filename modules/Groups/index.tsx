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
  const { groups, setGroup, groupsById } = useGroups(year as string)
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
            {groups.length > 0 &&
              groups.map((group) => (
                <Tab key={group.id} label={group.name} value={group.id} />
              ))}
          </TabList>
        </Box>
        {groups.length > 0 &&
          groups.map((group) => (
            <TabPanel key={group.id} value={group.id}>
              <Group group={group} />
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
