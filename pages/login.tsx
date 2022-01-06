import Head from "next/head";

const Login: any = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-screen bg-black'>
      <Head>
        <title>Spotipie</title>
      </Head>

      <main className='flex flex-col items-center justify-center w-full flex-1'>
        <h1 className='text-8xl md:font-sans text-white'>
          Spotipie
        </h1>

        <button className ='py-4 px-6 mt-12 font-bold uppercase text-x bg-green-500 text-white rounded-full'>Login with spotipie</button>
      </main>
    </div>
  )
}

export default Login;