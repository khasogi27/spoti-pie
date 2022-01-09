import { signOut, useSession } from "next-auth/react";
import Head from "next/head";

const Logout = () => {
  const { data: session } = useSession();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-screen bg-black'>
      <Head>
        <title>Spotipie - Logout</title>
      </Head>

      <main className='flex flex-col items-center justify-center w-full flex-1'>
        <h1 className='text-8xl md:font-sans text-white'>
          Spotipie
        </h1>
        <h6 className='text-3xl mt-12 md:font-sans text-white'>
          {session?.token?.email}
        </h6>

        <button onClick={() => signOut()} className='py-4 px-12 mt-12 font-bold uppercase text-x bg-green-500 text-white rounded-full hover:scale-105 hover:bg-green-500'>
          Logout
        </button>
      </main>
    </div>
  )
}

export default Logout;