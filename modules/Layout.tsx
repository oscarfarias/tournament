import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Header from './Header'
import Sidebar from './Sidebar'
interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <Box sx={{ display: `flex` }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: `background.default`, p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default Layout
