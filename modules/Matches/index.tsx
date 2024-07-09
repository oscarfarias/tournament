import { ReactElement } from 'react'
import Layout from '../Layout'

const Matches = (): JSX.Element => {
  return <></>
}
Matches.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Matches
