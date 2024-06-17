import { Switch, TextField, Typography, Grid, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import { FACEBOOK_ICON, GITHUB_ICON, GOOGLE_ICON } from 'common/assets'
import { useRouter } from 'next/router'
import useAuth from 'common/hooks/useAuth'
import { LoginProps } from 'common/types/login'
import { useFormik } from 'formik'
import schema from 'common/schemas/login'
import { FormikController, InputPassword } from 'common/components'
const Login = (): JSX.Element => {
  const theme = useTheme()
  const router = useRouter()

  const { useLogIn } = useAuth()
  const loginMutation = useLogIn({
    onSuccessCallback: () => {
      router.push(`/`)
    },
  })

  const formik = useFormik<LoginProps>({
    initialValues: {
      username: ``,
      password: ``,
    },
    validationSchema: schema,
    onSubmit: async (fields, helper) =>
      loginMutation.mutateAsync(fields).then(() => helper.resetForm()),
  })

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
            height: `130px`,
            borderRadius: `8px`,
            display: `flex`,
            top: `-8%`,
            position: `absolute`,
            justifyContent: `center`,
            alignItems: `center`,
          }}
        >
          <Typography fontSize="22px" sx={{ color: `white` }} fontWeight="bold">
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
            <FormikController formik={formik} name="username">
              <TextField placeholder="Usuario" />
            </FormikController>
            <FormikController formik={formik} name="password">
              <InputPassword
                sx={{ marginTop: `12px` }}
                placeholder="Contraseña"
                fullWidth
              />
            </FormikController>
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
              onClick={() => formik.handleSubmit()}
              sx={{ marginTop: `30px`, color: `white` }}
            >
              INICIAR SESION
            </Button>
            <Grid
              container
              sx={{
                marginTop: `5px`,
                justifyContent: `center`,
                alignItems: `center`,
                height: `80px`,
              }}
              mb={3}
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
