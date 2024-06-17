import { ReactElement } from 'react'
import Layout from '../Layout'
import TournamentHandler from 'modules/TournamentHandler'

const Home = (): JSX.Element => {
  return <TournamentHandler />
}
Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home
