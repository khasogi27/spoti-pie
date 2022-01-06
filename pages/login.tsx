import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen w-screen bg-black'>
        <Head>
          <title>Spotipie</title>
        </Head>
  
        <main className='flex flex-col items-center justify-center w-full flex-1'>
          <h1 className='text-8xl md:font-sans text-white'>
            Spotipie
          </h1>
  
          <h1 className='text-8xl md:font-sans text-white'>
            {console.log(session?.token?.email)}
          </h1>
  
          <button onClick={() => signOut()} className='py-4 px-12 mt-12 font-bold uppercase text-x bg-green-500 text-white rounded-full hover:scale-105 hover:bg-green-500'>
            Logout
          </button>
        </main>
      </div>
    )
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-screen bg-black'>
      <Head>
        <title>Spotipie</title>
      </Head>

      <main className='flex flex-col items-center justify-center w-full flex-1'>
        <h1 className='text-8xl md:font-sans text-white'>
          Spotipie
        </h1>

        <button onClick={() => signIn()} className='py-4 px-12 mt-12 font-bold uppercase text-x bg-green-500 text-white rounded-full hover:scale-105 hover:bg-green-500'>
          Login
        </button>
      </main>
    </div>
  )
  
}

export default Login;