import type { MetaFunction } from '@remix-run/node'
import { useParams, useRouteLoaderData } from '@remix-run/react'
import EmptyState from '~/components/EmptyState'
import MovieDetails from '~/components/MovieDetails'
import type { MovieListItem } from '~/generated/graphql'

export const meta: MetaFunction = () => {
  return {
    title: 'Movie Detail',
  }
}

export default function MovieDetail() {
  const { itemId } = useParams()
  const data = useRouteLoaderData(
    'routes/my-lists/$myListId'
  ) as MovieListItem[]

  const selectedMovie = data.find(
    (movie) => movie.id === parseInt(itemId || '')
  )

  if (selectedMovie)
    return (
      <div>
        <MovieDetails movieDetail={selectedMovie.movie} />
      </div>
    )
  return <EmptyState />
}
