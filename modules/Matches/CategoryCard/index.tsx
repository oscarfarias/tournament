import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material'
import { CategoryCardProps, GroupListProps } from './types'
import { HeadCell } from 'common/components/TableMui'
import { Table } from 'common/components'
import { useMemo } from 'react'
import { MIN_PLAYERS, ROUTES } from 'common/config/constants'
import { useStartMatchMutation } from 'common/queries/useStartMatchMutation'
import { useRouter } from 'next/router'

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const startMatch = useStartMatchMutation()
  const router = useRouter()

  const onHandleStartMatch = ({ id, matchesCount }: GroupListProps) => {
    if (matchesCount === 0) {
      startMatch.mutate(id)
      return
    }
    router.push(`${ROUTES.MATCHES}/${id}`)
  }

  const data = useMemo(() => {
    return category.groups.map((group) => {
      let isMatchable = false

      if (group.teams?.length) {
        const teams = group.teams?.map((team) => team)

        isMatchable = teams.every((team) => {
          const athletes = team.athletes?.filter((athlete) => {
            const firstName = athlete.firstName || ``
            const lastName = athlete.lastName || ``
            const document = athlete.document || ``
            const shirtNumber = athlete.shirtNumber || ``
            return (
              firstName.length > 0 &&
              lastName.length > 0 &&
              document.length > 0 &&
              shirtNumber.length > 0
            )
          })
          return athletes?.length >= MIN_PLAYERS
        })
      }

      return {
        id: group.id,
        groupName: group.name,
        matchesCount: group?.matches?.length || 0,
        teamsCount: group.teams?.length || 0,
        isMatchable,
      }
    })
  }, [category.groups])

  const columns: HeadCell<GroupListProps>[] = [
    {
      title: `Grupo`,
      key: `groupName`,
    },
    {
      title: `Equipos`,
      key: `teamsCount`,
    },
    {
      title: `Emparejamientos`,
      key: `matchesCount`,
    },
    {
      title: `Acciones`,
      key: `actions`,

      render: (data) => {
        const { matchesCount, isMatchable } = data
        return !isMatchable ? (
          <Typography sx={{ maxWidth: `200px`, fontSize: `12px !important` }}>
            Gestione equipos y atletas para gestionar emparejamiento. La
            información de todos los equipos y atletas debe estar completa.
          </Typography>
        ) : (
          <Button
            variant="contained"
            sx={{
              width: `auto`,
              '&:hover': {
                width: `auto`,
              },
            }}
            color="primary"
            onClick={() => onHandleStartMatch(data)}
          >
            {matchesCount > 0 ? `Gestionar` : `Iniciar emparejamiento`}
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
