import type { NextPage } from 'next'
import Head from 'next/head';
import Login from './login';

const Home: NextPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Head>
        <title>Spotipie</title>
      </Head>
      
      <Login></Login>
    </div>
  )
}

export default Home
