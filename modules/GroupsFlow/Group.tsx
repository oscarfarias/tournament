import { Grid, Typography } from '@mui/material'
import { Autocomplete } from 'common/components'
import { Option } from 'common/types'
const groupTypes: Option[] = [
  {
    label: `Grupo único`,
    value: 0,
  },
  {
    label: `Grupo 1`,
    value: 1,
  },
  {
    label: `Grupo 2`,
    value: 2,
  },
  {
    label: `Grupo 3`,
    value: 3,
  },
]

const Group = () => {
  return (
    <Grid container flexDirection="column" gap={1}>
      <Grid container>
        <Grid item sx={{ display: `flex`, flexDirection: `row` }}>
          <Typography
            sx={{
              mt: 1,
              mr: 2,
            }}
          >
            Grupo:
          </Typography>
          <Autocomplete
            options={groupTypes}
            sx={{
              width: `300px`,
            }}
            defaultValue=""
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Group
