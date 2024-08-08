import { Button, Card, CardContent, CardHeader } from '@mui/material'
import { CategoryCardProps, GroupListProps } from './types'
import { HeadCell } from 'common/components/TableMui'
import { Table } from 'common/components'
import { useMemo } from 'react'
import { ROUTES } from 'common/config/constants'

import { useRouter } from 'next/router'

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const router = useRouter()

  const showResults = (groupId: string) => {
    router.push(`${ROUTES.RESULTS}/group/${groupId}`)
  }

  const data = useMemo(() => {
    return category.groups.map((group) => {
      return {
        id: group.id,
        groupName: group.name,
      }
    })
  }, [category.groups])

  const columns: HeadCell<GroupListProps>[] = [
    {
      title: `Grupo`,
      key: `groupName`,
    },

    {
      title: `Acciones`,
      key: `actions`,
      render: (data) => {
        return (
          <Button
            variant="contained"
            sx={{
              width: `auto`,
              '&:hover': {
                width: `auto`,
              },
            }}
            color="primary"
            onClick={() => showResults(data.id)}
          >
            Ver
          </Button>
        )
      },
    },
  ]

  return (
    <Card
      sx={{
        width: `100%`,
        borderRadius: 3,
      }}
      elevation={3}
    >
      <CardHeader title={`Categoría: ${category.year}`} />
      <CardContent
        sx={{
          padding: {
            xs: 1,
            sm: 2,
          },
        }}
      >
        <Table columns={columns} rows={data} />
      </CardContent>
    </Card>
  )
}
export default CategoryCard
