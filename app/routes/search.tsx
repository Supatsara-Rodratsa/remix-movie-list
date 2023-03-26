import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import EmptyState from '~/components/EmptyState'
import ErrorState from '~/components/ErrorState'
import MovieSearchResult from '~/components/MovieSearchResult'
import SkeletonLoader from '~/components/SkeletonLoader'
import { MY_EMAIL_KEY } from '~/constants/constants'
import { sdk } from '~/libs/client'

export const meta: MetaFunction = () => {
  return {
    title: 'Search',
  }
}

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url)
  const search = new URLSearchParams(url.search)
  const { searchMovieByTitle } = await sdk.searchMovieByTitle({
    title: search.get('q') || '',
  })

  const { getMovieLists } = await sdk.getMovieLists({
    email: MY_EMAIL_KEY,
  })
  return json({
    searchResult: searchMovieByTitle,
    currentMovieList: getMovieLists,
  })
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return <ErrorState error={error} />
}

export default function Search() {
  const { searchResult, currentMovieList } = useLoaderData<typeof loader>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [searchResult])

  if (searchResult)
    return (
      <main className="mx-auto">
        <MovieSearchResult
          movieList={searchResult}
          currentMovieList={currentMovieList}
        />
        <Outlet />
      </main>
    )

  if (isLoading && !searchResult) {
    return <SkeletonLoader size={15} />
  }

  return <EmptyState />
}
