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
import { menu } from './menu'
import { Icon } from 'common/components'

const Sidebar = (): JSX.Element => {
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
        {menu.map(({ text, icon }, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
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
