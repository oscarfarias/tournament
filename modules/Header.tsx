import { AppBar, IconButton, Toolbar, Typography, Grid } from '@mui/material'
import { Icon } from 'common/components'
import { drawerWidth } from 'common/config/constants'
import Logout from './Logout'
import useLogoutStore from './Logout/store'
const Header = (): JSX.Element => {
  const { openModal } = useLogoutStore((state) => state)
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
        <Grid container flexDirection="row" justifyContent="space-between">
          <Typography
            sx={{ color: `white` }}
            variant="h6"
            noWrap
            component="div"
          >
            Panel de Administración
          </Typography>
          <IconButton onClick={openModal}>
            <Icon icon="logout" sx={{ color: `white` }} />
          </IconButton>
        </Grid>
      </Toolbar>
      <Logout />
    </AppBar>
  )
}
export default Header
