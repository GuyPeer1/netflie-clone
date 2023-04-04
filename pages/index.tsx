import { getSession, signOut } from "next-auth/react"
import { NextPageContext } from "next"
import useCurrentUser from "@/hooks/userCurrentUser"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}

export default function Home() {
  const { data: user } = useCurrentUser()

  return (
    <>
      <h1 className="text-3xl text-green-500">Netflix clone</h1>
      <p className="text-white">Logged in as : {user?.email}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>Logout!</button>
    </>
  )
}
