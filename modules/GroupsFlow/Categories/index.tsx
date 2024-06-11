import { Grid, Typography } from '@mui/material'
import { Accordion, Table, TextField } from 'common/components'
import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

const CategoriesList = () => {
  const [categories, setCategories] = useState(0)
  const [athletes, setAthletes] = useState(0)

  const array = Array.from({ length: categories }, (_, i) => i + 1)

  const data = useMemo(() => {
    const data = Array.from({ length: athletes }, (_, i) => {
      return {
        id: `${i + 1}`,
      }
    })
    return data
  }, [athletes])

  const columns = [
    {
      title: `#`,
      key: `id`,
    },
    {
      title: `Nombre`,
      key: `name`,
      render: () => (
        <Grid container>
          <TextField />
        </Grid>
      ),
    },
    {
      title: `Apellido`,
      key: `lastName`,
      render: () => (
        <Grid container>
          <TextField />
        </Grid>
      ),
    },
    {
      title: `Cedula`,
      key: `ci`,
      render: () => (
        <Grid container>
          <TextField />
        </Grid>
      ),
    },
  ]

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === ``) {
      setCategories(0)
    } else {
      setCategories(Number(value))
    }
  }

  const onAthleteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === ``) {
      setAthletes(0)
    } else {
      setAthletes(Number(value))
    }
  }

  return (
    <Grid container flexDirection="column">
      <Grid
        container
        sx={{
          display: `flex`,
        }}
        flexDirection="row"
        gap={2}
        mb={2}
      >
        <Typography mt={1}>Nombre Grupo :</Typography>
        <Grid item xs={5}>
          <TextField />
        </Grid>
      </Grid>
      <Grid container flexDirection="row" gap={2}>
        <Typography mt={1}>Numero de categorias:</Typography>
        <Grid item xs={5}>
          <TextField onChange={onTextChange} value={categories} />
        </Grid>
      </Grid>

      <Grid container mt={2} flexDirection="column" ml={1} gap={1}>
        {array.length > 0 &&
          array.map((item) => (
            <Accordion key={item} title={`Categoria ${item}`}>
              <Grid container flexDirection="column">
                <Grid container mt={1} key={item} flexDirection="row" gap={2}>
                  <Typography mt={1}>Nombre categoria #{item}:</Typography>
                  <Grid item xs={5}>
                    <TextField />
                  </Grid>
                </Grid>
                <Grid container mt={1} key={item} flexDirection="row" gap={2}>
                  <Typography mt={1}>Cantidad de atletas:</Typography>
                  <Grid item xs={5}>
                    <TextField onChange={onAthleteChange} value={athletes} />
                  </Grid>
                </Grid>
                <Grid container sx={{ width: `100%` }}>
                  <Table columns={columns} rows={data} />
                </Grid>
              </Grid>
            </Accordion>
          ))}
      </Grid>
    </Grid>
  )
}

const Categories = () => {
  const [value, setValue] = useState(`1`)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Grid container flexDirection="column">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: `divider` }}>
          <TabList onChange={handleChange}>
            <Tab label="Grupo 1" value="1" />
            <Tab label="Grupo 2" value="2" />
            <Tab label="Grupo 3" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <CategoriesList />
        </TabPanel>
        <TabPanel value="2">
          <CategoriesList />
        </TabPanel>
        <TabPanel value="3">
          <CategoriesList />
        </TabPanel>
      </TabContext>
    </Grid>
  )
}

export default Categories
