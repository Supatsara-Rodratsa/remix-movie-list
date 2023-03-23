import type { MetaFunction } from '@remix-run/node'
// import { Outlet } from '@remix-run/react'
import MovieListWrapper from '~/components/MovieListWrapper'
import { sdk } from '~/libs/client'
import { MY_EMAIL_KEY } from '~/constants/constants'
import { useLoaderData } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return {
    title: 'Movie List',
  }
}

export const loader = async () => {
  const { getMovieLists } = await sdk.getMovieLists({
    email: MY_EMAIL_KEY,
  })
  return getMovieLists
}

export default function Index() {
  const movieLists = useLoaderData<typeof loader>()
  return (
    <main className="mx-auto">
      <MovieListWrapper movieList={movieLists} />
    </main>
  )
}
