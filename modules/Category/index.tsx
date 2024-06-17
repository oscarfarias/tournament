import { ReactElement } from 'react'
import Layout from '../Layout'
import { Grid, Typography } from '@mui/material'
const Category = () => {
  return (
    <Grid container flexDirection="column">
      <Grid container justifyContent="center">
        <Typography
          variant="h5"
          sx={{ color: `primary.main`, fontWeight: `bold` }}
        >
          Nueva Categoría
        </Typography>
      </Grid>
    </Grid>
  )
}

Category.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Category
