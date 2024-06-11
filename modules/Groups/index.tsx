import { Button, Grid, Typography } from '@mui/material'
import Autocomplete from 'common/components/Autocomplete'
import { Option } from 'common/types'
const groups: Option[] = []

const Groups = () => {
  return (
    <Grid container flexDirection="column">
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
            Seleccione grupo:
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
          <Button> Crear grupo</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Groups
