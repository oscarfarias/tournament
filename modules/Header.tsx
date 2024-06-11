import { AppBar, Toolbar, Typography } from '@mui/material'
import { drawerWidth } from 'common/config/constants'
const Header = (): JSX.Element => {
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Panel de Administración
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
export default Header
