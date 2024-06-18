import { Button, Grid, Typography } from '@mui/material'
import { Table } from 'common/components'
import { HeadCell } from 'common/components/TableMui'
import { ROUTES } from 'common/config/constants'
import useCategoriesQuery from 'common/queries/useCategoriesQuery'
import useCategoryStore from 'common/stores/useCategoryStore'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

interface CategoryProps {
  id: string
  name: string
  groups: string
  teams: string
  athletes: string
  actions?: string
}

const TournamentHandler = () => {
  const router = useRouter()

  useCategoriesQuery()

  const { categories } = useCategoryStore((state) => state)

  const columns: HeadCell<Partial<CategoryProps>>[] = [
    {
      title: `Año`,
      key: `name`,
    },
    {
      title: `# Grupos`,
      key: `groups`,
    },
    {
      title: `# Equipos`,
      key: `teams`,
    },
    {
      title: `Total Atletas`,
      key: `athletes`,
    },
    {
      title: `Acciones`,
      key: `actions`,
      render: (category) => (
        <Grid container sx={{ width: `100px` }}>
          <Button
            onClick={() =>
              router.push(`${ROUTES.CATEGORY}/${category.name}${ROUTES.GROUPS}`)
            }
          >
            Gestionar
          </Button>
        </Grid>
      ),
    },
  ]

  const data: CategoryProps[] = useMemo(() => {
    if (categories.length === 0) {
      return []
    }
    return categories.map((category) => ({
      id: category.id,
      name: category.year,
      groups: `${category?.groups?.length}`,
      teams: `0`,
      athletes: `0`,
    }))
  }, [categories])

  return (
    <Grid container flexDirection="column">
      <Grid container flexDirection="row" justifyContent="space-between">
        <Typography
          variant="h5"
          sx={{ color: `primary.main`, fontWeight: `bold` }}
        >
          Lista de categorías
        </Typography>
        <Grid ml={2} item xs={2}>
          <Button onClick={() => router.push(ROUTES.CATEGORY)}>
            Crear categoría
          </Button>
        </Grid>
      </Grid>
      <Grid container mt={2} sx={{ width: `100%` }}>
        <Table columns={columns} rows={data} />
      </Grid>
    </Grid>
  )
}

export default TournamentHandler
