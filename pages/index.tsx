import { getSession, signOut } from "next-auth/react"
import { NextPageContext } from "next"
import useCurrentUser from "@/hooks/userCurrentUser"
import Navbar from "@/components/NavBar"
import Billboard from "@/components/Billboard"
import MovieList from "@/components/MovieList"
import useMovieList from "@/hooks/useMovieList"

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

  // const { data: user } = useCurrentUser()
  const { data: movies = [] } = useMovieList()

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending now" data={movies} />
      </div>
    </>
  )
}