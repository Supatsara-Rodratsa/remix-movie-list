import type { MetaFunction } from '@remix-run/node'
// import { Outlet } from '@remix-run/react'
import MovieListWrapper from '~/components/MovieListWrapper'

export const meta: MetaFunction = () => {
  return {
    title: 'Movie List',
  }
}

export default function Index() {
  return (
    <main>
      <MovieListWrapper />
    </main>
  )
}
