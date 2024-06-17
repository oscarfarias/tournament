import { ReactElement } from 'react'
import Layout from '../Layout'
import Categories from 'modules/Categories'

const Home = (): JSX.Element => {
  return <Categories />
}
Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home
