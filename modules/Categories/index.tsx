import { Button, Grid, Typography } from '@mui/material'
import Autocomplete from 'common/components/Autocomplete'
import { Option } from 'common/types'
import GroupsFlow from 'modules/GroupsFlow'
import { useState } from 'react'
const groups: Option[] = [
  {
    label: `2018`,
    value: `2018`,
  },
  {
    label: `2019`,
    value: `2019`,
  },
  {
    label: `2020`,
    value: `2020`,
  },
]

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Grid container flexDirection="column">
      {isOpen && (
        <GroupsFlow onClose={() => setIsOpen(false)} isOpen={isOpen} />
      )}

      <Grid container justifyContent="center">
        <Typography
          sx={{
            fontSize: `20px !important`,
            fontWeight: `bold`,
            color: `primary.main`,
          }}
        >
          Manejo de competencia
        </Typography>
      </Grid>

      <Grid
        container
        mt={2}
        sx={{
          flexDirection: `row`,

          width: `80%`,
          alignSelf: `center`,
        }}
      >
        <Grid item sx={{ display: `flex`, flexDirection: `row` }} xs={8}>
          <Typography
            sx={{
              fontWeight: `bold`,
              mt: 1,
              mr: 2,
            }}
          >
            Seleccione categoría:
          </Typography>
          <Autocomplete
            options={groups}
            sx={{
              width: `300px`,
            }}
            defaultValue=""
          />
        </Grid>
        <Grid ml={2} item xs={2}>
          <Button onClick={() => setIsOpen(true)}> Crear grupo</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Categories
