import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { Outlet, useLoaderData, useNavigate, useParams } from '@remix-run/react'
import EmptyMovieListItem from '~/components/EmptyMovieListItem'
import ErrorState from '~/components/ErrorState'
import MovieCard from '~/components/MovieCard'
import type { Movie, SearchMovie } from '~/generated/graphql'
import { sdk } from '~/libs/client'

export const meta: MetaFunction = () => {
  return {
    title: 'Movie List Items',
  }
}

export const loader = async ({ params }: LoaderArgs) => {
  const { myListId } = params
  if (myListId) {
    const { getMovieListItems } = await sdk.getMovieListItems({
      listId: parseInt(myListId),
    })
    return getMovieListItems
  }

  return []
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return <ErrorState error={error} />
}

export default function MovieList() {
  const params = useParams()
  const movieListItems = useLoaderData<typeof loader>()
  const navigate = useNavigate()

  if (movieListItems.length == 0) {
    return <EmptyMovieListItem />
  }

  const renderMovieItem = (
    { Poster, Title, Year, imdbID, Type }: Movie,
    id: number
  ) => {
    const movieDTO: SearchMovie = {
      Poster,
      Title,
      Year,
      imdbID,
      Type,
    }

    return (
      <div key={imdbID} onClick={() => navigate(`details/${id}`)}>
        <MovieCard movie={movieDTO} isMovieListItem />
      </div>
    )
  }

  return (
    <div className="flex w-full gap-6 tablet:flex-wrap ">
      <div className="mx-auto flex w-full flex-wrap justify-center gap-x-6 gap-y-6">
        {movieListItems.map((list) => renderMovieItem(list.movie, list.id))}
      </div>
      <div className={params.itemId && 'w-full'}>
        <Outlet />
      </div>
    </div>
  )
}
