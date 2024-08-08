'use client'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { drawerWidth } from 'common/config/constants'
import { menuByRole } from './menu'
import { Icon } from 'common/components'
import { useRouter } from 'next/router'
import useAuth from 'common/hooks/useAuth'

const Sidebar = (): JSX.Element => {
  const router = useRouter()
  const { user } = useAuth()

  const menu = menuByRole(user?.role?.name ?? ``)

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: `border-box`,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {menu.map(({ text, icon, path }, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => router.push(path)}>
              <ListItemIcon>
                <Icon icon={icon} />
              </ListItemIcon>
              <ListItemText sx={{ color: `black` }} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  )
}
export default Sidebar
