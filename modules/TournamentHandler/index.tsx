import { Button, Grid, Typography } from '@mui/material'
import { Table } from 'common/components'
import { HeadCell } from 'common/components/TableMui'
import { ROUTES } from 'common/config/constants'
import useCategoriesQuery from 'common/queries/useCategoriesQuery'
import useCategoryStore from 'common/stores/useCategoryStore'
import GroupsFlow from 'modules/GroupsFlow'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

interface CategoryProps {
  id: string
  name: string
  groups: string
  teams: string
  athletes: string
  actions?: string
}

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
    render: () => (
      <Grid container sx={{ width: `100px` }}>
        <Button>Gestionar</Button>
      </Grid>
    ),
  },
]

const TournamentHandler = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  useCategoriesQuery()

  const { categories } = useCategoryStore((state) => state)

  const data: CategoryProps[] = useMemo(() => {
    if (categories.length === 0) {
      return []
    }
    return categories.map((category) => ({
      id: category.id,
      name: category.year,
      groups: `0`,
      teams: `0`,
      athletes: `0`,
    }))
  }, [categories])

  return (
    <Grid container flexDirection="column">
      {isOpen && (
        <GroupsFlow onClose={() => setIsOpen(false)} isOpen={isOpen} />
      )}
      <Grid
        container
        mt={2}
        sx={{
          flexDirection: `row`,

          width: `80%`,
          alignSelf: `center`,
        }}
      >
        <Grid ml={2} item xs={2}>
          <Button onClick={() => setIsOpen(true)}> Crear grupo</Button>
        </Grid>
      </Grid>

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
