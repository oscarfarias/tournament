import { ReactElement, useEffect } from 'react'
import Layout from '../Layout'
import { Grid, Typography } from '@mui/material'
import {
  Button,
  TextField,
  Autocomplete,
  FormikController,
} from 'common/components'
import { CategoriesProps } from 'common/types'
import useCategory from 'common/hooks/useCategory'
import schema from 'common/schemas/category'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { ROUTES, groupTypes } from 'common/config/constants'
import useCategoryStore from 'common/stores/useCategoryStore'
import { isNumber } from 'lodash'

const Category = () => {
  const router = useRouter()

  const { useCategoryMutation } = useCategory()
  const { categories } = useCategoryStore((state) => state)

  useEffect(() => {
    if (categories.length > 0) {
      const lastCategory = categories[0]
      const year = Number(lastCategory.year) + 1
      if (isNumber(year)) {
        formik.setFieldValue(`year`, year.toString())
      }
    }
  }, [categories])

  const categoryMutation = useCategoryMutation({
    onSuccessCallback: (category) =>
      router.push(`${ROUTES.CATEGORY}/${category?.year}${ROUTES.GROUPS}`),
  })
  const formik = useFormik<CategoriesProps>({
    initialValues: {
      year: ``,
      groups: ``,
    },
    validationSchema: schema,
    onSubmit: async (fields, helper) => {
      const groupValue = groupTypes.find(
        (group) => group.label === fields.groups,
      )
      const nextGroup = groupValue?.value ?? 1
      categoryMutation
        .mutateAsync({
          ...fields,
          groups: `${nextGroup}`,
        })
        .then(() => helper.resetForm())
    },
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
            <Grid item sx={{ display: `flex`, width: `300px` }}>
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
            <Grid item sx={{ display: `flex`, width: `300px` }}>
              <FormikController formik={formik} name="groups">
                <Autocomplete
                  sx={{ width: `100%` }}
                  options={groupTypes}
                  defaultValue=""
                />
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
