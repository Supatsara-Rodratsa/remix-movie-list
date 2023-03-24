import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import MovieSearchResult from '~/components/MovieSearchResult'
import SkeletonLoader from '~/components/SkeletonLoader'
import { sdk } from '~/libs/client'

export const meta: MetaFunction = () => {
  return {
    title: 'Search Movie',
  }
}

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url)
  const search = new URLSearchParams(url.search)
  const { searchMovieByTitle } = await sdk.searchMovieByTitle({
    title: search.get('q') || '',
  })
  return searchMovieByTitle
}

export default function Search() {
  console.log('rendering')
  const searchResult = useLoaderData<typeof loader>()
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
        <MovieSearchResult movieList={searchResult} />
      </main>
    )

  if (isLoading && !searchResult) {
    return <SkeletonLoader size={15} />
  }

  return <p>Data Not Found</p>
}
