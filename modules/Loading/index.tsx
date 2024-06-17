import { CircularProgress, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
interface LoadingProps {
  text?: string
}

const Loading = ({ text = `` }: LoadingProps): JSX.Element => {
  const { palette } = useTheme()
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: `100vh`, width: `100%` }}
    >
      <Grid item>
        <CircularProgress />
      </Grid>
      {text ? (
        <Grid item>
          <Typography
            sx={{
              color: palette.secondary.dark,
              fontWeight: `bold`,
              fontSize: `24px !important`,
            }}
          >
            {text}
          </Typography>
        </Grid>
      ) : null}
    </Grid>
  )
}

export default Loading
