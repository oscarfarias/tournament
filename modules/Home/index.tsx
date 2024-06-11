import { ReactElement } from 'react'
import Layout from '../Layout'
import Groups from 'modules/Groups'

const Home = (): JSX.Element => {
  return <Groups />
}
Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home
