import { Grid } from '@mui/material'
import { ReactElement } from 'react'
import Layout from '../Layout'
import { useRouter } from 'next/router'
const Groups = () => {
  const router = useRouter()
  const year = router?.query?.year
  console.log(`year:`, year)
  return <Grid container></Grid>
}

Groups.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Groups
