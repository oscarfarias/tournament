import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'

import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { PersonAddAlt, AddRounded } from '@mui/icons-material'
import { drawerWidth } from 'common/config/constants'

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
        {[`Agregar Categorías`, `Agregar Atletas`, `Agregar Equipos`].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <AddRounded /> : <PersonAddAlt />}
                </ListItemIcon>
                <ListItemText sx={{ color: `black` }} primary={text} />
              </ListItemButton>
            </ListItem>
          ),
        )}
      </List>
      <Divider />
    </Drawer>
  )
}
export default Sidebar
