import { ReactElement, useMemo } from 'react'
import { Grid } from '@mui/material'
import Layout from '../Layout'

import useCategoryStore from 'common/stores/useCategoryStore'
import CategoryCard from './CategoryCard'
import useCategoriesQuery from 'common/queries/useCategoriesQuery'

const Matches = (): JSX.Element => {
  useCategoriesQuery()
  const { categoriesIds, categoriesById } = useCategoryStore((state) => state)

  const categories = useMemo(() => {
    return categoriesIds.map((id) => categoriesById[id])
  }, [categoriesIds, categoriesById])

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
