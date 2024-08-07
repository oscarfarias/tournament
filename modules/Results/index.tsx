import { ReactElement, useMemo } from 'react'
import Layout from '../Layout'
import { Grid, Typography } from '@mui/material'
import CategoryCard from './CategoryCard'
import useCategoryStore from 'common/stores/useCategoryStore'
import useCategoriesQuery from 'common/queries/useCategoriesQuery'

const Results = () => {
  useCategoriesQuery()
  const { categoriesIds, categoriesById } = useCategoryStore((state) => state)

  const categories = useMemo(() => {
    return categoriesIds.map((id) => categoriesById[id])
  }, [categoriesIds, categoriesById])

  return (
    <Grid container flexDirection="column">
      <Typography variant="h4">Resultados</Typography>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </Grid>
  )
}

Results.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Results
