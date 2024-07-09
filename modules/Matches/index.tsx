import { ReactElement } from 'react'
import { Grid } from '@mui/material'
import Layout from '../Layout'

import useCategoryStore from 'common/stores/useCategoryStore'
import CategoryCard from './CategoryCard'
import useCategoriesQuery from 'common/queries/useCategoriesQuery'

const Matches = (): JSX.Element => {
  useCategoriesQuery()
  const { categories } = useCategoryStore((state) => state)
  return (
    <Grid container flexDirection="column">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </Grid>
  )
}
Matches.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Matches
