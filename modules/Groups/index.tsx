import { Grid } from '@mui/material'
import { ReactElement } from 'react'
import Layout from '../Layout'
const Groups = () => {
  return <Grid container></Grid>
}

Groups.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Groups
