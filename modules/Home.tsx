import { ReactElement } from 'react'
import Layout from './Layout'

const Home = (): JSX.Element => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}
Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home
