import { ReactElement } from 'react'
import Layout from '../Layout'
import { Grid, Typography } from '@mui/material'
import {
  Button,
  TextField,
  Autocomplete,
  FormikController,
} from 'common/components'
import { CategoriesProps, Option } from 'common/types'
import useCategory from 'common/hooks/useCategory'
import schema from 'common/schemas/category'
import { useFormik } from 'formik'
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

const Category = () => {
  const { useCategoryMutation } = useCategory()
  const categoryMutation = useCategoryMutation()
  const formik = useFormik<CategoriesProps>({
    initialValues: {
      year: ``,
      groups: ``,
    },
    validationSchema: schema,
    onSubmit: async (fields, helper) =>
      categoryMutation.mutateAsync(fields).then(() => helper.resetForm()),
  })
  return (
    <Grid container flexDirection="column">
      <Grid container justifyContent="center">
        <Typography
          variant="h5"
          sx={{ color: `primary.main`, fontWeight: `bold` }}
        >
          Nueva Categoría
        </Typography>
      </Grid>
      <Grid container mt={6} justifyContent="center">
        <Grid xs={6} flexDirection="column">
          <Grid
            container
            sx={{
              marginY: `5`,
              display: `grid`,
              gridTemplateColumns: `200px 1fr`,
              gridRowGap: `20px`,
            }}
          >
            <Grid container justifyContent="flex-end">
              <Typography
                sx={{
                  fontWeight: `bold`,
                  fontSize: `18px !important`,
                  color: `primary.main`,
                  mt: `6px`,
                  mr: 3,
                }}
              >
                Año de la categoría
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <FormikController formik={formik} name="year">
                <TextField />
              </FormikController>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Typography
                sx={{
                  fontWeight: `bold`,
                  fontSize: `18px !important`,
                  color: `primary.main`,
                  mt: `6px`,
                  mr: 3,
                }}
              >
                Grupo
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <FormikController formik={formik} name="groups">
                <Autocomplete options={groupTypes} defaultValue="" />
              </FormikController>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container mt={3} justifyContent="center">
        <Grid
          item
          sx={{
            display: `flex`,
            width: `320px`,
          }}
        >
          <Button
            isLoading={categoryMutation.isLoading}
            onClick={() => formik.handleSubmit()}
          >
            Siguiente
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

Category.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Category
