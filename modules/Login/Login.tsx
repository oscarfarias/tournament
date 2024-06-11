import { Switch, TextField, Typography, Grid, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import { FACEBOOK_ICON, GITHUB_ICON, GOOGLE_ICON } from 'common/assets'
import { useRouter } from 'next/router'
const Login = (): JSX.Element => {
  const theme = useTheme()
  const router = useRouter()

  return (
    <Grid
      container
      sx={{
        backgroundImage: `url(/assets/images/background-login.webp)`,
        backgroundSize: `cover`,
        backgroundPosition: `center`,
        height: `100vh`,
        alignItems: `center`,
        display: `flex`,
        justifyContent: `center`,
      }}
    >
      <Grid
        item
        sx={{
          display: `flex`,
          justifyContent: `center`,
          position: `relative`,
        }}
      >
        <Grid
          item
          flexDirection="column"
          sx={{
            background: theme.gradients[0],
            width: `377px`,
            height: `147px`,
            borderRadius: `8px`,
            display: `flex`,
            top: `-8%`,
            position: `absolute`,
            justifyContent: `center`,
            alignItems: `center`,
          }}
        >
          <Typography fontSize="22px" fontWeight="bold">
            Iniciar Sesión
          </Typography>

          <Grid
            item
            width="50%"
            flexDirection="row"
            display="flex"
            justifyContent="space-between"
            mt="20px"
          >
            <Image src={FACEBOOK_ICON} alt="facebook" width={18} height={18} />
            <Image src={GITHUB_ICON} alt="github" width={18} height={18} />
            <Image src={GOOGLE_ICON} alt="google" width={18} height={18} />
          </Grid>
        </Grid>
        <Grid
          item
          sx={{
            backgroundColor: `white`,
            width: `408px`,
            height: `471px`,
            borderRadius: `12px`,
          }}
        >
          <Grid item mt={18} p={3} flexDirection="column">
            <TextField placeholder="Usuario" />
            <TextField sx={{ marginTop: `12px` }} placeholder="Contraseña" />
            <Grid
              item
              sx={{
                width: `100%`,
                flexDirection: `row`,
                display: `flex`,
              }}
            >
              <Switch sx={{ marginLeft: `-10px` }} />
              <Typography
                fontSize="14px"
                sx={{
                  marginLeft: `4px`,
                  color: `grey`,
                  marginTop: `8px`,
                }}
              >
                Recuerdame
              </Typography>
            </Grid>

            <Button
              onClick={() => router.push(`/`)}
              sx={{ marginTop: `30px`, color: `white` }}
            >
              INICIAR SESION
            </Button>
            <Grid
              item
              sx={{
                marginTop: `8px`,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,

                height: `80px`,
              }}
            >
              <Typography
                fontSize="14px"
                sx={{
                  color: `grey`,
                }}
              >
                ¿No tienes cuenta?
              </Typography>
              <Typography
                fontSize="14px"
                fontWeight="bold"
                sx={{
                  color: theme.palette.primary.main,
                  marginLeft: `4px`,
                }}
              >
                Regístrate
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Login
